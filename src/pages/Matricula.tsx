import Layout from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function Matricula() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome_crianca: '',
    data_nascimento: '',
    nome_responsavel: '',
    email: '',
    telefone: '',
    endereco: '',
    turma_interesse: '',
    observacoes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('matriculas')
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "Matrícula enviada!",
        description: "Recebemos sua solicitação de matrícula. Entraremos em contato em breve."
      });

      // Reset form
      setFormData({
        nome_crianca: '',
        data_nascimento: '',
        nome_responsavel: '',
        email: '',
        telefone: '',
        endereco: '',
        turma_interesse: '',
        observacoes: ''
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Erro",
        description: "Erro ao enviar matrícula. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-strawberry mb-6">
              Matrícula Online
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simplifique o processo de matrícula do seu filho.
              Preencha o formulário e entraremos em contato para finalizar!
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-strawberry">Dados para Matrícula</CardTitle>
              <CardDescription>
                Preencha as informações básicas para iniciarmos o processo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Dados da Criança */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-strawberry-dark">
                    Dados da Criança
                  </h3>
                  
                  <div>
                    <Label htmlFor="nome_crianca">Nome completo da criança *</Label>
                    <Input
                      id="nome_crianca"
                      value={formData.nome_crianca}
                      onChange={(e) => setFormData({...formData, nome_crianca: e.target.value})}
                      placeholder="Digite o nome completo"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="data_nascimento">Data de nascimento *</Label>
                    <Input
                      id="data_nascimento"
                      type="date"
                      value={formData.data_nascimento}
                      onChange={(e) => setFormData({...formData, data_nascimento: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="turma_interesse">Turma de interesse *</Label>
                    <Select onValueChange={(value) => setFormData({...formData, turma_interesse: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a turma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bercario">Berçário Moranguinho (4m - 1 ano)</SelectItem>
                        <SelectItem value="maternal1">Maternal I (1 - 2 anos)</SelectItem>
                        <SelectItem value="maternal2">Maternal II (2 - 3 anos)</SelectItem>
                        <SelectItem value="pre1">Pré I (3 - 4 anos)</SelectItem>
                        <SelectItem value="pre2">Pré II (4 - 5 anos)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Dados do Responsável */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-strawberry-dark">
                    Dados do Responsável
                  </h3>
                  
                  <div>
                    <Label htmlFor="nome_responsavel">Nome completo do responsável *</Label>
                    <Input
                      id="nome_responsavel"
                      value={formData.nome_responsavel}
                      onChange={(e) => setFormData({...formData, nome_responsavel: e.target.value})}
                      placeholder="Nome do responsável"
                      required
                    />
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="email@exemplo.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="telefone">Telefone *</Label>
                      <Input
                        id="telefone"
                        value={formData.telefone}
                        onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                        placeholder="(00) 00000-0000"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="endereco">Endereço completo</Label>
                    <Input
                      id="endereco"
                      value={formData.endereco}
                      onChange={(e) => setFormData({...formData, endereco: e.target.value})}
                      placeholder="Rua, número, bairro, cidade"
                    />
                  </div>
                </div>

                {/* Observações */}
                <div>
                  <Label htmlFor="observacoes">Observações adicionais</Label>
                  <Textarea
                    id="observacoes"
                    value={formData.observacoes}
                    onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
                    placeholder="Conte-nos sobre necessidades especiais, restrições alimentares, ou qualquer informação importante..."
                    rows={4}
                  />
                </div>

                <Button type="submit" variant="strawberry" className="w-full" size="lg">
                  Enviar Solicitação de Matrícula
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Informações Adicionais */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg">Próximos Passos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-strawberry text-white rounded-full flex items-center justify-center text-xs font-semibold">1</span>
                  <p>Recebemos sua solicitação e analisaremos os dados</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-strawberry text-white rounded-full flex items-center justify-center text-xs font-semibold">2</span>
                  <p>Entraremos em contato em até 24 horas para agendar uma visita</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-strawberry text-white rounded-full flex items-center justify-center text-xs font-semibold">3</span>
                  <p>Durante a visita, conhecerão nossa estrutura e metodologia</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-strawberry text-white rounded-full flex items-center justify-center text-xs font-semibold">4</span>
                  <p>Finalizamos a documentação e confirmamos a vaga</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}