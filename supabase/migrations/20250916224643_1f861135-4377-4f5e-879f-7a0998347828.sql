-- Create enum for user roles
CREATE TYPE public.user_role AS ENUM ('admin', 'professor', 'pai');

-- Create enum for payment status
CREATE TYPE public.payment_status AS ENUM ('pago', 'nao_pago', 'pendente');

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    telefone TEXT,
    role user_role NOT NULL DEFAULT 'pai',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create turmas table
CREATE TABLE public.turmas (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    nome TEXT NOT NULL,
    ano_letivo TEXT NOT NULL,
    idade_minima INTEGER,
    idade_maxima INTEGER,
    capacidade_maxima INTEGER DEFAULT 20,
    professor_id UUID REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create alunos table
CREATE TABLE public.alunos (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    nome TEXT NOT NULL,
    data_nascimento DATE NOT NULL,
    genero TEXT,
    foto_url TEXT,
    restricoes_alimentares TEXT,
    necessidades_especiais TEXT,
    observacoes TEXT,
    status TEXT DEFAULT 'ativo',
    turma_id UUID REFERENCES public.turmas(id),
    responsavel_id UUID REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create atividades table
CREATE TABLE public.atividades (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    titulo TEXT NOT NULL,
    descricao TEXT,
    nota DECIMAL(3,1),
    observacao TEXT,
    data_atividade DATE NOT NULL,
    aluno_id UUID NOT NULL REFERENCES public.alunos(id) ON DELETE CASCADE,
    professor_id UUID NOT NULL REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create financeiro table
CREATE TABLE public.financeiro (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    responsavel_id UUID NOT NULL REFERENCES public.profiles(id),
    aluno_id UUID NOT NULL REFERENCES public.alunos(id),
    valor DECIMAL(10,2) NOT NULL,
    mes_referencia TEXT NOT NULL,
    ano_referencia INTEGER NOT NULL,
    status payment_status DEFAULT 'pendente',
    data_vencimento DATE NOT NULL,
    data_pagamento DATE,
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create mensagens table
CREATE TABLE public.mensagens (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    telefone TEXT,
    assunto TEXT NOT NULL,
    mensagem TEXT NOT NULL,
    status TEXT DEFAULT 'nao_lida',
    resposta TEXT,
    respondido_por UUID REFERENCES public.profiles(id),
    respondido_em TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create matriculas table  
CREATE TABLE public.matriculas (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    nome_crianca TEXT NOT NULL,
    data_nascimento DATE NOT NULL,
    nome_responsavel TEXT NOT NULL,
    email TEXT NOT NULL,
    telefone TEXT NOT NULL,
    endereco TEXT,
    turma_interesse TEXT,
    observacoes TEXT,
    status TEXT DEFAULT 'pendente',
    processado_por UUID REFERENCES public.profiles(id),
    processado_em TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.turmas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alunos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.atividades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financeiro ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mensagens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matriculas ENABLE ROW LEVEL SECURITY;

-- Create function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid UUID DEFAULT auth.uid())
RETURNS user_role
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
    SELECT role FROM public.profiles WHERE user_id = user_uuid;
$$;

-- Create RLS policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Admins can view all profiles" ON public.profiles
    FOR ALL USING (public.get_user_role() = 'admin');

-- Create RLS policies for turmas
CREATE POLICY "Admins can manage turmas" ON public.turmas
    FOR ALL USING (public.get_user_role() = 'admin');

CREATE POLICY "Professors can view their turmas" ON public.turmas
    FOR SELECT USING (professor_id = (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Parents can view turmas of their children" ON public.turmas
    FOR SELECT USING (
        id IN (
            SELECT turma_id FROM public.alunos 
            WHERE responsavel_id = (SELECT id FROM public.profiles WHERE user_id = auth.uid())
        )
    );

-- Create RLS policies for alunos
CREATE POLICY "Admins can manage alunos" ON public.alunos
    FOR ALL USING (public.get_user_role() = 'admin');

CREATE POLICY "Professors can view their students" ON public.alunos
    FOR SELECT USING (
        turma_id IN (
            SELECT id FROM public.turmas WHERE professor_id = (SELECT id FROM public.profiles WHERE user_id = auth.uid())
        )
    );

CREATE POLICY "Parents can view their children" ON public.alunos
    FOR SELECT USING (responsavel_id = (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

-- Create RLS policies for atividades
CREATE POLICY "Admins can view all atividades" ON public.atividades
    FOR SELECT USING (public.get_user_role() = 'admin');

CREATE POLICY "Professors can manage their students' atividades" ON public.atividades
    FOR ALL USING (professor_id = (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Parents can view their children's atividades" ON public.atividades
    FOR SELECT USING (
        aluno_id IN (
            SELECT id FROM public.alunos 
            WHERE responsavel_id = (SELECT id FROM public.profiles WHERE user_id = auth.uid())
        )
    );

-- Create RLS policies for financeiro
CREATE POLICY "Admins can manage financeiro" ON public.financeiro
    FOR ALL USING (public.get_user_role() = 'admin');

CREATE POLICY "Parents can view their financial records" ON public.financeiro
    FOR SELECT USING (responsavel_id = (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

-- Create RLS policies for mensagens
CREATE POLICY "Admins can manage mensagens" ON public.mensagens
    FOR ALL USING (public.get_user_role() = 'admin');

-- Create RLS policies for matriculas
CREATE POLICY "Admins can manage matriculas" ON public.matriculas
    FOR ALL USING (public.get_user_role() = 'admin');

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (user_id, nome, email, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'nome', NEW.email),
        NEW.email,
        COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'pai')
    );
    RETURN NEW;
END;
$$;

-- Create trigger for new user
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_turmas_updated_at
    BEFORE UPDATE ON public.turmas
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_alunos_updated_at
    BEFORE UPDATE ON public.alunos
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_atividades_updated_at
    BEFORE UPDATE ON public.atividades
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_financeiro_updated_at
    BEFORE UPDATE ON public.financeiro
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();