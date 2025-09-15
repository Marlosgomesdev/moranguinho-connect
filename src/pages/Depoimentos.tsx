import Layout from "@/components/Layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, Heart } from "lucide-react";

const depoimentos = [
  {
    id: 1,
    nome: "Maria Silva",
    filho: "João, 3 anos - Maternal II",
    nota: 5,
    texto: "A C.R.I Moranguinho superou todas as nossas expectativas! O João chegava em casa feliz todos os dias, contando sobre as atividades. A atenção individualizada e o carinho da equipe fazem toda a diferença. Recomendo de olhos fechados!",
    tempo: "Há 2 anos na escola"
  },
  {
    id: 2,
    nome: "Carlos e Ana Santos",
    filho: "Sofia, 4 anos - Pré I",
    nota: 5,
    texto: "Nossa filha evoluiu muito desde que começou na escola. A metodologia pedagógica é excelente e a comunicação com os pais é constante. Recebemos relatórios detalhados e fotos das atividades. A Sofia adora ir para a escola!",
    tempo: "Há 1 ano na escola"
  },
  {
    id: 3,
    nome: "Fernanda Costa",
    filho: "Miguel, 2 anos - Maternal I",
    nota: 5,
    texto: "Como mãe de primeira viagem, estava muito nervosa em deixar o Miguel. Mas a equipe me tranquilizou desde o primeiro dia. O cuidado com a alimentação e a higiene é impecável. O Miguel se adaptou rapidamente e hoje já não quer mais vir embora!",
    tempo: "Há 8 meses na escola"
  },
  {
    id: 4,
    nome: "Roberto Lima",
    filho: "Beatriz, 5 anos - Pré II",
    nota: 5,
    texto: "A Beatriz está se preparando para o ensino fundamental e estamos impressionados com seu desenvolvimento. Ela já está lendo pequenas palavras e demonstra muito interesse pelos estudos. A escola realmente prepara as crianças para o futuro.",
    tempo: "Há 3 anos na escola"
  },
  {
    id: 5,
    nome: "Juliana Oliveira",
    filho: "Gabriel, 1 ano - Berçário",
    nota: 5,
    texto: "Confiar meu bebê aos cuidados da escola foi uma decisão difícil, mas acertada. O berçário é maravilhoso, com profissionais especializadas. Recebo fotos e relatórios durante o dia, o que me deixa tranquila no trabalho.",
    tempo: "Há 6 meses na escola"
  },
  {
    id: 6,
    nome: "Patrícia Ferreira",
    filho: "Lucas, 4 anos - Pré I",
    nota: 5,
    texto: "O Lucas tem necessidades especiais e a escola o acolheu com muito carinho. A equipe se capacitou para atendê-lo melhor e hoje ele está integrado com as outras crianças. Gratidão eterna por esse cuidado especial!",
    tempo: "Há 1 ano e meio na escola"
  }
];

const estatisticas = [
  { numero: "98%", descricao: "Taxa de satisfação dos pais" },
  { numero: "95%", descricao: "Recomendariam para amigos" },
  { numero: "4.9/5", descricao: "Nota média geral" },
  { numero: "92%", descricao: "Permanência por mais de 1 ano" }
];

export default function Depoimentos() {
  const renderStars = (nota: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < nota ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-strawberry mb-6">
              O Que Dizem Nossos Pais
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A confiança e satisfação das famílias são nosso maior orgulho.
              Veja o que os pais falam sobre nossa escola.
            </p>
          </div>
        </section>

        {/* Estatísticas */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {estatisticas.map((stat, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-strawberry mb-2">
                      {stat.numero}
                    </div>
                    <p className="text-muted-foreground">{stat.descricao}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Depoimentos */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-strawberry mb-12">
              Histórias Reais de Famílias Felizes
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {depoimentos.map((depoimento) => (
                <Card key={depoimento.id} className="overflow-hidden hover:shadow-lg transition-shadow relative">
                  <Quote className="absolute top-4 right-4 w-6 h-6 text-primary/20" />
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      {renderStars(depoimento.nota)}
                    </div>
                    <CardTitle className="text-lg text-foreground">{depoimento.nome}</CardTitle>
                    <CardDescription className="flex flex-col gap-1">
                      <span className="font-medium">{depoimento.filho}</span>
                      <Badge variant="outline" className="w-fit">
                        {depoimento.tempo}
                      </Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic">
                      "{depoimento.texto}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Convite para Depoimento */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <Heart className="w-16 h-16 text-strawberry mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-strawberry mb-4">
                Sua Opinião É Importante
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Se você é pai ou responsável de um aluno da C.R.I Moranguinho,
                adoraríamos ouvir sua experiência! Seu depoimento nos ajuda a
                melhorar continuamente.
              </p>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Entre em contato conosco para compartilhar sua história:
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Badge variant="outline" className="px-4 py-2">
                    📧 contato@crimoranguinho.com.br
                  </Badge>
                  <Badge variant="outline" className="px-4 py-2">
                    📱 (11) 9999-9999
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Qualidade Certificada */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-strawberry mb-8">
                Qualidade Reconhecida
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-2xl font-bold text-strawberry mb-2">15+</div>
                    <p className="text-muted-foreground">Anos de experiência</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-2xl font-bold text-strawberry mb-2">200+</div>
                    <p className="text-muted-foreground">Famílias atendidas</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-2xl font-bold text-strawberry mb-2">Zero</div>
                    <p className="text-muted-foreground">Reclamações graves</p>
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