import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Users, GraduationCap, DollarSign, Mail, Plus, School } from "lucide-react";

export default function AdminDashboard() {
  const { profile, signOut } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState({
    totalAlunos: 0,
    totalTurmas: 0,
    mensagensNaoLidas: 0,
    matriculasPendentes: 0
  });
  const [matriculas, setMatriculas] = useState([]);
  const [mensagens, setMensagens] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch stats
      const [alunosResult, turmasResult, mensagensResult, matriculasResult] = await Promise.all([
        supabase.from("alunos").select("*", { count: "exact" }),
        supabase.from("turmas").select("*", { count: "exact" }),
        supabase.from("mensagens").select("*", { count: "exact" }).eq("status", "nao_lida"),
        supabase.from("matriculas").select("*", { count: "exact" }).eq("status", "pendente")
      ]);

      setStats({
        totalAlunos: alunosResult.count || 0,
        totalTurmas: turmasResult.count || 0,
        mensagensNaoLidas: mensagensResult.count || 0,
        matriculasPendentes: matriculasResult.count || 0
      });

      // Fetch detailed data
      const { data: matriculasData } = await supabase
        .from("matriculas")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      const { data: mensagensData } = await supabase
        .from("mensagens")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      const { data: turmasData } = await supabase
        .from("turmas")
        .select("*, profiles!turmas_professor_id_fkey(nome)")
        .order("nome");

      const { data: alunosData } = await supabase
        .from("alunos")
        .select("*, turmas(nome), profiles!alunos_responsavel_id_fkey(nome)")
        .order("nome");

      setMatriculas(matriculasData || []);
      setMensagens(mensagensData || []);
      setTurmas(turmasData || []);
      setAlunos(alunosData || []);

    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Erro",
        description: "Erro ao carregar dados",
        variant: "destructive"
      });
    }
  };

  const handleProcessMatricula = async (matriculaId: string, status: string) => {
    try {
      const { error } = await supabase
        .from("matriculas")
        .update({ 
          status, 
          processado_por: profile.id,
          processado_em: new Date().toISOString()
        })
        .eq("id", matriculaId);

      if (error) throw error;

      toast({
        title: "Matrícula processada",
        description: `Matrícula ${status === "aprovada" ? "aprovada" : "rejeitada"} com sucesso`
      });

      fetchData();
    } catch (error) {
      console.error("Error processing matricula:", error);
      toast({
        title: "Erro",
        description: "Erro ao processar matrícula",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-strawberry-light/30 to-mint-light/30">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-strawberry-dark">Painel Administrativo</h1>
            <p className="text-gray-600">Bem-vindo, {profile?.nome}</p>
          </div>
          <Button onClick={signOut} variant="outline">
            Sair
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Alunos</CardTitle>
              <Users className="h-4 w-4 text-strawberry" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAlunos}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Turmas</CardTitle>
              <School className="h-4 w-4 text-mint" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTurmas}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mensagens Não Lidas</CardTitle>
              <Mail className="h-4 w-4 text-sunshine" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.mensagensNaoLidas}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Matrículas Pendentes</CardTitle>
              <GraduationCap className="h-4 w-4 text-strawberry-dark" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.matriculasPendentes}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="matriculas" className="space-y-4">
          <TabsList>
            <TabsTrigger value="matriculas">Matrículas</TabsTrigger>
            <TabsTrigger value="mensagens">Mensagens</TabsTrigger>
            <TabsTrigger value="turmas">Turmas</TabsTrigger>
            <TabsTrigger value="alunos">Alunos</TabsTrigger>
            <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
          </TabsList>

          <TabsContent value="matriculas">
            <Card>
              <CardHeader>
                <CardTitle>Matrículas Recentes</CardTitle>
                <CardDescription>Gerencie as solicitações de matrícula</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Criança</TableHead>
                      <TableHead>Responsável</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {matriculas.map((matricula: any) => (
                      <TableRow key={matricula.id}>
                        <TableCell>{matricula.nome_crianca}</TableCell>
                        <TableCell>{matricula.nome_responsavel}</TableCell>
                        <TableCell>{matricula.email}</TableCell>
                        <TableCell>
                          <Badge variant={matricula.status === "pendente" ? "secondary" : "default"}>
                            {matricula.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {matricula.status === "pendente" && (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleProcessMatricula(matricula.id, "aprovada")}
                              >
                                Aprovar
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleProcessMatricula(matricula.id, "rejeitada")}
                              >
                                Rejeitar
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mensagens">
            <Card>
              <CardHeader>
                <CardTitle>Mensagens dos Pais</CardTitle>
                <CardDescription>Visualize e responda mensagens</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Assunto</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Data</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mensagens.map((mensagem: any) => (
                      <TableRow key={mensagem.id}>
                        <TableCell>{mensagem.nome}</TableCell>
                        <TableCell>{mensagem.email}</TableCell>
                        <TableCell>{mensagem.assunto}</TableCell>
                        <TableCell>
                          <Badge variant={mensagem.status === "nao_lida" ? "destructive" : "default"}>
                            {mensagem.status === "nao_lida" ? "Não lida" : "Lida"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(mensagem.created_at).toLocaleDateString('pt-BR')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="turmas">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Gerenciar Turmas</CardTitle>
                  <CardDescription>Crie e gerencie turmas da escola</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Turma
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Ano Letivo</TableHead>
                      <TableHead>Professor</TableHead>
                      <TableHead>Capacidade</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {turmas.map((turma: any) => (
                      <TableRow key={turma.id}>
                        <TableCell>{turma.nome}</TableCell>
                        <TableCell>{turma.ano_letivo}</TableCell>
                        <TableCell>{turma.profiles?.nome || "Sem professor"}</TableCell>
                        <TableCell>{turma.capacidade_maxima}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            Editar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alunos">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Gerenciar Alunos</CardTitle>
                  <CardDescription>Visualize e gerencie alunos matriculados</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Aluno
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Turma</TableHead>
                      <TableHead>Responsável</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {alunos.map((aluno: any) => (
                      <TableRow key={aluno.id}>
                        <TableCell>{aluno.nome}</TableCell>
                        <TableCell>{aluno.turmas?.nome || "Sem turma"}</TableCell>
                        <TableCell>{aluno.profiles?.nome || "Sem responsável"}</TableCell>
                        <TableCell>
                          <Badge variant={aluno.status === "ativo" ? "default" : "secondary"}>
                            {aluno.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            Editar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financeiro">
            <Card>
              <CardHeader>
                <CardTitle>Controle Financeiro</CardTitle>
                <CardDescription>Gerencie mensalidades e pagamentos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-500">Módulo financeiro em desenvolvimento</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}