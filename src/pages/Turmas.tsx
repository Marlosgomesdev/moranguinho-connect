import Layout from "@/components/Layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, Heart } from "lucide-react";

const turmas = [
  {
    id: 1,
    nome: "Berçário Moranguinho",
    idade: "4 meses a 1 ano",
    capacidade: 8,
    matriculados: 6,
    horario: "7h às 17h",
    atividades: ["Estimulação sensorial", "Música", "Massagem", "Alimentação"],
    cor: "bg-pink-100 text-pink-800"
  },
  {
    id: 2,
    nome: "Maternal I",
    idade: "1 a 2 anos",
    capacidade: 12,
    matriculados: 10,
    horario: "7h às 17h",
    atividades: ["Coordenação motora", "Artes", "Contação de histórias", "Brincadeiras"],
    cor: "bg-green-100 text-green-800"
  },
  {
    id: 3,
    nome: "Maternal II",
    idade: "2 a 3 anos",
    capacidade: 15,
    matriculados: 12,
    horario: "7h às 17h",
    atividades: ["Pré-alfabetização", "Jogos educativos", "Socialização", "Educação física"],
    cor: "bg-yellow-100 text-yellow-800"
  },
  {
    id: 4,
    nome: "Pré I",
    idade: "3 a 4 anos",
    capacidade: 18,
    matriculados: 15,
    horario: "7h às 17h",
    atividades: ["Alfabetização", "Matemática básica", "Ciências", "Inglês básico"],
    cor: "bg-purple-100 text-purple-800"
  },
  {
    id: 5,
    nome: "Pré II",
    idade: "4 a 5 anos",
    capacidade: 20,
    matriculados: 18,
    horario: "7h às 17h",
    atividades: ["Preparação escolar", "Projetos", "Responsabilidade", "Autonomia"],
    cor: "bg-blue-100 text-blue-800"
  }
];

export default function Turmas() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-strawberry mb-6">
              Nossas Turmas
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cada turma é cuidadosamente planejada para o desenvolvimento integral das crianças,
              respeitando suas fases e necessidades específicas.
            </p>
          </div>
        </section>

        {/* Turmas Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {turmas.map((turma) => (
                <Card key={turma.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <Heart className="w-8 h-8 text-strawberry" />
                    </div>
                    <CardTitle className="text-xl text-strawberry">{turma.nome}</CardTitle>
                    <CardDescription>
                      <Badge className={turma.cor}>{turma.idade}</Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{turma.matriculados}/{turma.capacidade} alunos</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{turma.horario}</span>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Atividades principais:</h4>
                      <div className="flex flex-wrap gap-1">
                        {turma.atividades.map((atividade, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {atividade}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button 
                        variant="strawberry" 
                        className="w-full"
                        onClick={() => window.location.href = '/matricula'}
                      >
                        Solicitar Matrícula
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-strawberry mb-4">
              Encontrou a turma ideal?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Agende uma visita para conhecer nossa estrutura e metodologia de perto.
              Será um prazer receber sua família!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button variant="strawberry" size="lg" onClick={() => window.location.href = '/contato'}>
                Agendar Visita
              </Button>
              <Button variant="soft" size="lg" onClick={() => window.location.href = '/matricula'}>
                Matrícula Online
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}