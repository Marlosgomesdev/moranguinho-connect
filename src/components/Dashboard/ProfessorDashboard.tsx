import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Users, BookOpen, Plus } from "lucide-react";

export default function ProfessorDashboard() {
  const { profile, signOut } = useAuth();
  const { toast } = useToast();
  const [turmas, setTurmas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [atividades, setAtividades] = useState([]);
  const [selectedTurma, setSelectedTurma] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [novaAtividade, setNovaAtividade] = useState({
    titulo: "",
    descricao: "",
    data_atividade: "",
    aluno_id: "",
    nota: "",
    observacao: ""
  });

  useEffect(() => {
    if (profile?.id) {
      fetchTurmas();
    }
  }, [profile]);

  useEffect(() => {
    if (selectedTurma) {
      fetchAlunos();
      fetchAtividades();
    }
  }, [selectedTurma]);

  const fetchTurmas = async () => {
    try {
      const { data, error } = await supabase
        .from("turmas")
        .select("*")
        .eq("professor_id", profile.id);

      if (error) throw error;

      setTurmas(data || []);
      if (data && data.length > 0) {
        setSelectedTurma(data[0]);
      }
    } catch (error) {
      console.error("Error fetching turmas:", error);
      toast({
        title: "Erro",
        description: "Erro ao carregar turmas",
        variant: "destructive"
      });
    }
  };

  const fetchAlunos = async () => {
    if (!selectedTurma) return;

    try {
      const { data, error } = await supabase
        .from("alunos")
        .select("*")
        .eq("turma_id", selectedTurma.id)
        .eq("status", "ativo");

      if (error) throw error;
      setAlunos(data || []);
    } catch (error) {
      console.error("Error fetching alunos:", error);
    }
  };

  const fetchAtividades = async () => {
    if (!selectedTurma) return;

    try {
      const { data, error } = await supabase
        .from("atividades")
        .select("*, alunos(nome)")
        .eq("professor_id", profile.id)
        .in("aluno_id", alunos.map(a => a.id))
        .order("data_atividade", { ascending: false });

      if (error) throw error;
      setAtividades(data || []);
    } catch (error) {
      console.error("Error fetching atividades:", error);
    }
  };

  const handleSalvarAtividade = async () => {
    try {
      const { error } = await supabase
        .from("atividades")
        .insert({
          ...novaAtividade,
          professor_id: profile.id,
          nota: novaAtividade.nota ? parseFloat(novaAtividade.nota) : null
        });

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Atividade registrada com sucesso"
      });

      setIsDialogOpen(false);
      setNovaAtividade({
        titulo: "",
        descricao: "",
        data_atividade: "",
        aluno_id: "",
        nota: "",
        observacao: ""
      });
      fetchAtividades();
    } catch (error) {
      console.error("Error saving atividade:", error);
      toast({
        title: "Erro",
        description: "Erro ao salvar atividade",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-light/30 to-sunshine-light/30">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-strawberry-dark">Painel do Professor</h1>
            <p className="text-gray-600">Bem-vindo, {profile?.nome}</p>
          </div>
          <Button onClick={signOut} variant="outline">
            Sair
          </Button>
        </div>

        {/* Turma Selection */}
        {turmas.length > 0 && (
          <div className="mb-6">
            <Label>Turma Atual:</Label>
            <div className="flex gap-2 mt-2">
              {turmas.map((turma: any) => (
                <Button
                  key={turma.id}
                  variant={selectedTurma?.id === turma.id ? "default" : "outline"}
                  onClick={() => setSelectedTurma(turma)}
                >
                  {turma.nome}
                </Button>
              ))}
            </div>
          </div>
        )}

        {selectedTurma ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Alunos da Turma */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Alunos da Turma {selectedTurma.nome}
                </CardTitle>
                <CardDescription>
                  {alunos.length} alunos matriculados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {alunos.map((aluno: any) => (
                    <div key={aluno.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{aluno.nome}</p>
                        <p className="text-sm text-gray-500">
                          {new Date().getFullYear() - new Date(aluno.data_nascimento).getFullYear()} anos
                        </p>
                      </div>
                      <Badge variant="outline">Ativo</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Atividades Recentes */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Atividades Registradas
                  </CardTitle>
                  <CardDescription>
                    Últimas atividades da turma
                  </CardDescription>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Nova Atividade
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Registrar Nova Atividade</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="titulo">Título da Atividade</Label>
                        <Input
                          id="titulo"
                          value={novaAtividade.titulo}
                          onChange={(e) => setNovaAtividade({...novaAtividade, titulo: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="aluno">Aluno</Label>
                        <select
                          className="w-full p-2 border rounded-md"
                          value={novaAtividade.aluno_id}
                          onChange={(e) => setNovaAtividade({...novaAtividade, aluno_id: e.target.value})}
                        >
                          <option value="">Selecione um aluno</option>
                          {alunos.map((aluno: any) => (
                            <option key={aluno.id} value={aluno.id}>
                              {aluno.nome}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="data">Data da Atividade</Label>
                        <Input
                          id="data"
                          type="date"
                          value={novaAtividade.data_atividade}
                          onChange={(e) => setNovaAtividade({...novaAtividade, data_atividade: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="nota">Nota (0-10)</Label>
                        <Input
                          id="nota"
                          type="number"
                          step="0.1"
                          min="0"
                          max="10"
                          value={novaAtividade.nota}
                          onChange={(e) => setNovaAtividade({...novaAtividade, nota: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="observacao">Observações</Label>
                        <Textarea
                          id="observacao"
                          value={novaAtividade.observacao}
                          onChange={(e) => setNovaAtividade({...novaAtividade, observacao: e.target.value})}
                        />
                      </div>
                      <Button onClick={handleSalvarAtividade} className="w-full">
                        Salvar Atividade
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {atividades.slice(0, 5).map((atividade: any) => (
                    <div key={atividade.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{atividade.titulo}</p>
                          <p className="text-sm text-gray-500">{atividade.alunos?.nome}</p>
                          <p className="text-xs text-gray-400">
                            {new Date(atividade.data_atividade).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        {atividade.nota && (
                          <Badge variant="outline">
                            Nota: {atividade.nota}
                          </Badge>
                        )}
                      </div>
                      {atividade.observacao && (
                        <p className="text-sm mt-2 text-gray-600">{atividade.observacao}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">Você não está atribuído a nenhuma turma ainda.</p>
              <p className="text-sm text-gray-400 mt-2">
                Entre em contato com a administração para ser atribuído a uma turma.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}