import Layout from "@/components/Layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Heart, Award, Users } from "lucide-react";

const equipe = [
  {
    id: 1,
    nome: "Ana Paula Silva",
    cargo: "Diretora Pedagógica",
    formacao: "Pedagogia - USP, Especialização em Educação Infantil",
    experiencia: "15 anos",
    especializacao: "Coordenação pedagógica e desenvolvimento infantil",
    foto: "/placeholder.svg",
    cor: "bg-pink-100 text-pink-800"
  },
  {
    id: 2,
    nome: "Mariana Santos",
    cargo: "Coordenadora Berçário",
    formacao: "Pedagogia, Especialização em Primeira Infância",
    experiencia: "8 anos",
    especializacao: "Cuidados com bebês e estimulação sensorial",
    foto: "/placeholder.svg",
    cor: "bg-green-100 text-green-800"
  },
  {
    id: 3,
    nome: "Juliana Costa",
    cargo: "Professora Maternal I e II",
    formacao: "Pedagogia, Curso de Psicomotricidade",
    experiencia: "10 anos",
    especializacao: "Desenvolvimento motor e socialização",
    foto: "/placeholder.svg",
    cor: "bg-yellow-100 text-yellow-800"
  },
  {
    id: 4,
    nome: "Carla Fernandes",
    cargo: "Professora Pré I e II",
    formacao: "Pedagogia, Especialização em Alfabetização",
    experiencia: "12 anos",
    especializacao: "Preparação escolar e letramento",
    foto: "/placeholder.svg",
    cor: "bg-purple-100 text-purple-800"
  },
  {
    id: 5,
    nome: "Roberto Lima",
    cargo: "Professor de Educação Física",
    formacao: "Educação Física, Especialização em Infantil",
    experiencia: "6 anos",
    especializacao: "Desenvolvimento motor e atividades lúdicas",
    foto: "/placeholder.svg",
    cor: "bg-blue-100 text-blue-800"
  },
  {
    id: 6,
    nome: "Fernanda Oliveira",
    cargo: "Nutricionista",
    formacao: "Nutrição - UNIFESP",
    experiencia: "5 anos",
    especializacao: "Alimentação infantil e cardápios especiais",
    foto: "/placeholder.svg",
    cor: "bg-orange-100 text-orange-800"
  }
];

const diferenciais = [
  {
    icon: GraduationCap,
    titulo: "Formação Continuada",
    descricao: "Todos os profissionais participam de cursos e capacitações regulares"
  },
  {
    icon: Heart,
    titulo: "Cuidado Humanizado",
    descricao: "Cada criança é tratada com carinho individual e atenção especial"
  },
  {
    icon: Award,
    titulo: "Experiência Comprovada",
    descricao: "Equipe com média de 10 anos de experiência em educação infantil"
  },
  {
    icon: Users,
    titulo: "Trabalho em Equipe",
    descricao: "Colaboração constante entre professores, coordenação e famílias"
  }
];

export default function Equipe() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-strawberry mb-6">
              Nossa Equipe
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Profissionais apaixonados por educação, qualificados e comprometidos 
              com o desenvolvimento integral de cada criança.
            </p>
          </div>
        </section>

        {/* Diferenciais da Equipe */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-strawberry mb-12">
              Nossos Diferenciais
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {diferenciais.map((item, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-8 h-8 text-strawberry" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{item.titulo}</h3>
                    <p className="text-sm text-muted-foreground">{item.descricao}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Membros da Equipe */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-strawberry mb-12">
              Conheça Nossos Profissionais
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {equipe.map((membro) => (
                <Card key={membro.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 overflow-hidden">
                      <img 
                        src={membro.foto} 
                        alt={membro.nome}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-xl text-strawberry">{membro.nome}</CardTitle>
                    <CardDescription>
                      <Badge className={membro.cor}>{membro.cargo}</Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-1">Formação:</h4>
                      <p className="text-sm text-muted-foreground">{membro.formacao}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-1">Experiência:</h4>
                      <p className="text-sm text-muted-foreground">{membro.experiencia}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-1">Especialização:</h4>
                      <p className="text-sm text-muted-foreground">{membro.especializacao}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Metodologia */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-strawberry mb-8">
                Nossa Metodologia
              </h2>
              <div className="grid gap-8 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-strawberry">Abordagem Construtivista</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Acreditamos que a criança constrói seu próprio conhecimento através 
                      da interação com o mundo. Nossos professores são facilitadores desse 
                      processo de descoberta.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-strawberry">Desenvolvimento Integral</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Focamos nos aspectos cognitivo, emocional, social e físico de cada 
                      criança, respeitando suas individualidades e ritmo de desenvolvimento.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-strawberry">Parceria com as Famílias</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Mantemos comunicação constante com os pais, compartilhando o 
                      desenvolvimento dos filhos e alinhando objetivos educacionais.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-strawberry">Ambiente Acolhedor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Criamos um ambiente seguro, estimulante e acolhedor onde cada 
                      criança se sente amada e confiante para explorar e aprender.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}