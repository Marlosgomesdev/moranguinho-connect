import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Baby, BookOpen, DollarSign, Calendar } from "lucide-react";

export default function PaiDashboard() {
  const { profile, signOut } = useAuth();
  const { toast } = useToast();
  const [filhos, setFilhos] = useState([]);
  const [atividades, setAtividades] = useState([]);
  const [financeiro, setFinanceiro] = useState([]);
  const [selectedFilho, setSelectedFilho] = useState<any>(null);

  useEffect(() => {
    if (profile?.id) {
      fetchFilhos();
    }
  }, [profile]);

  useEffect(() => {
    if (selectedFilho) {
      fetchAtividades();
      fetchFinanceiro();
    }
  }, [selectedFilho]);

  const fetchFilhos = async () => {
    try {
      const { data, error } = await supabase
        .from("alunos")
        .select("*, turmas(nome, professor_id, profiles!turmas_professor_id_fkey(nome))")
        .eq("responsavel_id", profile.id)
        .eq("status", "ativo");

      if (error) throw error;

      setFilhos(data || []);
      if (data && data.length > 0) {
        setSelectedFilho(data[0]);
      }
    } catch (error) {
      console.error("Error fetching filhos:", error);
      toast({
        title: "Erro",
        description: "Erro ao carregar dados dos filhos",
        variant: "destructive"
      });
    }
  };

  const fetchAtividades = async () => {
    if (!selectedFilho) return;

    try {
      const { data, error } = await supabase
        .from("atividades")
        .select("*, profiles!atividades_professor_id_fkey(nome)")
        .eq("aluno_id", selectedFilho.id)
        .order("data_atividade", { ascending: false });

      if (error) throw error;
      setAtividades(data || []);
    } catch (error) {
      console.error("Error fetching atividades:", error);
    }
  };

  const fetchFinanceiro = async () => {
    if (!selectedFilho) return;

    try {
      const { data, error } = await supabase
        .from("financeiro")
        .select("*")
        .eq("aluno_id", selectedFilho.id)
        .order("ano_referencia", { ascending: false })
        .order("mes_referencia", { ascending: false });

      if (error) throw error;
      setFinanceiro(data || []);
    } catch (error) {
      console.error("Error fetching financeiro:", error);
    }
  };

  const calcularIdade = (dataNascimento: string) => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = nascimento.getMonth();
    
    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    
    return idade;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sunshine-light/30 to-strawberry-light/30">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-strawberry-dark">Portal dos Pais</h1>
            <p className="text-gray-600">Bem-vindo, {profile?.nome}</p>
          </div>
          <Button onClick={signOut} variant="outline">
            Sair
          </Button>
        </div>

        {filhos.length > 0 ? (
          <>
            {/* Seleção de Filho */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Seus Filhos:</h3>
              <div className="flex gap-2 flex-wrap">
                {filhos.map((filho: any) => (
                  <Button
                    key={filho.id}
                    variant={selectedFilho?.id === filho.id ? "default" : "outline"}
                    onClick={() => setSelectedFilho(filho)}
                    className="flex items-center gap-2"
                  >
                    <Baby className="h-4 w-4" />
                    {filho.nome}
                  </Button>
                ))}
              </div>
            </div>

            {selectedFilho && (
              <>
                {/* Info do Filho Selecionado */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Baby className="h-5 w-5" />
                      {selectedFilho.nome}
                    </CardTitle>
                    <CardDescription>
                      {calcularIdade(selectedFilho.data_nascimento)} anos • 
                      Turma: {selectedFilho.turmas?.nome || "Não atribuída"} • 
                      Professor(a): {selectedFilho.turmas?.profiles?.nome || "Não atribuído"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Data de Nascimento</p>
                        <p>{new Date(selectedFilho.data_nascimento).toLocaleDateString('pt-BR')}</p>
                      </div>
                      {selectedFilho.restricoes_alimentares && (
                        <div>
                          <p className="text-sm font-medium text-gray-500">Restrições Alimentares</p>
                          <p>{selectedFilho.restricoes_alimentares}</p>
                        </div>
                      )}
                      {selectedFilho.necessidades_especiais && (
                        <div>
                          <p className="text-sm font-medium text-gray-500">Necessidades Especiais</p>
                          <p>{selectedFilho.necessidades_especiais}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Tabs de Conteúdo */}
                <Tabs defaultValue="atividades" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="atividades">Atividades e Notas</TabsTrigger>
                    <TabsTrigger value="financeiro">Situação Financeira</TabsTrigger>
                  </TabsList>

                  <TabsContent value="atividades">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5" />
                          Boletim de {selectedFilho.nome}
                        </CardTitle>
                        <CardDescription>
                          Acompanhe o desenvolvimento escolar
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {atividades.length > 0 ? (
                          <div className="space-y-4">
                            {atividades.map((atividade: any) => (
                              <div key={atividade.id} className="border rounded-lg p-4">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <h4 className="font-medium">{atividade.titulo}</h4>
                                    <p className="text-sm text-gray-500">
                                      Prof. {atividade.profiles?.nome} • {new Date(atividade.data_atividade).toLocaleDateString('pt-BR')}
                                    </p>
                                  </div>
                                  {atividade.nota && (
                                    <Badge variant={atividade.nota >= 7 ? "default" : atividade.nota >= 5 ? "secondary" : "destructive"}>
                                      Nota: {atividade.nota}
                                    </Badge>
                                  )}
                                </div>
                                {atividade.descricao && (
                                  <p className="text-sm text-gray-600 mb-2">{atividade.descricao}</p>
                                )}
                                {atividade.observacao && (
                                  <div className="bg-gray-50 p-3 rounded">
                                    <p className="text-sm font-medium text-gray-700">Observações do Professor:</p>
                                    <p className="text-sm text-gray-600">{atividade.observacao}</p>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-center text-gray-500 py-8">
                            Nenhuma atividade registrada ainda.
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="financeiro">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <DollarSign className="h-5 w-5" />
                          Situação Financeira - {selectedFilho.nome}
                        </CardTitle>
                        <CardDescription>
                          Acompanhe suas mensalidades
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {financeiro.length > 0 ? (
                          <div className="space-y-3">
                            {financeiro.map((pagamento: any) => (
                              <div key={pagamento.id} className="flex justify-between items-center p-4 border rounded-lg">
                                <div>
                                  <p className="font-medium">
                                    {pagamento.mes_referencia}/{pagamento.ano_referencia}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    Vencimento: {new Date(pagamento.data_vencimento).toLocaleDateString('pt-BR')}
                                  </p>
                                  <p className="text-lg font-bold text-strawberry-dark">
                                    R$ {pagamento.valor}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <Badge 
                                    variant={
                                      pagamento.status === "pago" ? "default" : 
                                      pagamento.status === "pendente" ? "secondary" : "destructive"
                                    }
                                  >
                                    {pagamento.status === "pago" ? "Pago" : 
                                     pagamento.status === "pendente" ? "Pendente" : "Em Atraso"}
                                  </Badge>
                                  {pagamento.data_pagamento && (
                                    <p className="text-xs text-gray-500 mt-1">
                                      Pago em: {new Date(pagamento.data_pagamento).toLocaleDateString('pt-BR')}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-center text-gray-500 py-8">
                            Nenhum registro financeiro encontrado.
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </>
            )}
          </>
        ) : (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">Você não possui filhos matriculados na escola.</p>
              <p className="text-sm text-gray-400 mt-2">
                Entre em contato com a secretaria para mais informações.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}