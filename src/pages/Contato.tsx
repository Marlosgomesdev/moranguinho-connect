import Layout from "@/components/Layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contato() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensagem enviada!",
      description: "Retornaremos seu contato em breve.",
    });
  };

  const handleWhatsApp = () => {
    const message = "Olá! Gostaria de saber mais sobre a C.R.I Moranguinho e agendar uma visita.";
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-strawberry mb-6">
              Entre em Contato
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Estamos prontos para receber sua família com muito carinho.
              Agende uma visita ou tire suas dúvidas conosco!
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Informações de Contato */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-strawberry">Nossa Localização</CardTitle>
                  <CardDescription>
                    Venha nos conhecer pessoalmente
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-strawberry mt-0.5" />
                    <div>
                      <p className="font-medium">Endereço</p>
                      <p className="text-muted-foreground">
                        Rua das Flores, 123<br />
                        Jardim Moranguinho<br />
                        São Paulo - SP, 01234-567
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-strawberry mt-0.5" />
                    <div>
                      <p className="font-medium">Telefone</p>
                      <p className="text-muted-foreground">(11) 9999-9999</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-strawberry mt-0.5" />
                    <div>
                      <p className="font-medium">E-mail</p>
                      <p className="text-muted-foreground">contato@crimoranguinho.com.br</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-strawberry mt-0.5" />
                    <div>
                      <p className="font-medium">Horário de Funcionamento</p>
                      <p className="text-muted-foreground">
                        Segunda a Sexta: 7h às 17h<br />
                        Atendimento administrativo: 8h às 17h
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* WhatsApp CTA */}
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-green-800">
                        Fale conosco no WhatsApp
                      </h3>
                      <p className="text-green-600 text-sm">
                        Resposta rápida e atendimento personalizado
                      </p>
                    </div>
                    <Button 
                      onClick={handleWhatsApp}
                      className="bg-green-500 hover:bg-green-600 text-white"
                    >
                      Chamar
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Mapa */}
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0974!2d-46.6534!3d-23.5489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMyJzU2LjAiUyA0NsKwMzknMTIuMiJX!5e0!3m2!1spt!2sbr!4v1234567890123"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Formulário de Contato */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-strawberry">Envie sua Mensagem</CardTitle>
                  <CardDescription>
                    Preencha o formulário e entraremos em contato
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="nome">Nome *</Label>
                        <Input
                          id="nome"
                          placeholder="Seu nome completo"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="telefone">Telefone *</Label>
                        <Input
                          id="telefone"
                          placeholder="(00) 00000-0000"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="assunto">Assunto</Label>
                      <Input
                        id="assunto"
                        placeholder="Ex: Agendar visita, Informações sobre matrícula"
                      />
                    </div>

                    <div>
                      <Label htmlFor="mensagem">Mensagem *</Label>
                      <Textarea
                        id="mensagem"
                        placeholder="Conte-nos como podemos ajudar..."
                        rows={5}
                        required
                      />
                    </div>

                    <Button type="submit" variant="strawberry" className="w-full">
                      Enviar Mensagem
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Horários especiais */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Horários Especiais para Visitas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p><strong>Manhã:</strong> 9h às 11h - Observar atividades pedagógicas</p>
                    <p><strong>Tarde:</strong> 14h às 16h - Conhecer a rotina e estrutura</p>
                    <p className="text-muted-foreground mt-4">
                      * Visitas mediante agendamento prévio para melhor atendimento
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}