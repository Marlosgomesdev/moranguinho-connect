import { Shield, Heart, Users, BookOpen, Palette, Music } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const FeaturesSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Ambiente Seguro",
      description: "Instalações adequadas com monitoramento 24h e protocolos de segurança rigorosos.",
      color: "text-primary"
    },
    {
      icon: Heart,
      title: "Cuidado Afetuoso",
      description: "Profissionais dedicados que tratam cada criança com carinho e atenção individual.",
      color: "text-secondary"
    },
    {
      icon: Users,
      title: "Socialização",
      description: "Atividades em grupo que desenvolvem habilidades sociais e trabalho em equipe.",
      color: "text-accent-bright"
    },
    {
      icon: BookOpen,
      title: "Aprendizado Lúdico",
      description: "Metodologia baseada em brincadeiras que estimulam o desenvolvimento cognitivo.",
      color: "text-primary"
    },
    {
      icon: Palette,
      title: "Arte e Criatividade",
      description: "Oficinas de artes, pintura e artesanato para desenvolver a criatividade.",
      color: "text-secondary"
    },
    {
      icon: Music,
      title: "Música e Movimento",
      description: "Aulas de música e dança que estimulam coordenação motora e expressão.",
      color: "text-accent-bright"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold font-round">
            Por que escolher a{" "}
            <span className="text-gradient-strawberry">C.R.I Moranguinho</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Oferecemos muito mais que educação infantil. Criamos um segundo lar 
            onde seu filho pode crescer feliz, seguro e estimulado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="hover-lift border-0 shadow-card hover:shadow-soft transition-all duration-300"
              >
                <CardContent className="p-8 text-center space-y-4">
                  <div className={`w-16 h-16 mx-auto bg-muted rounded-2xl flex items-center justify-center ${feature.color}`}>
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-semibold font-round">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center bg-primary/5 border border-primary/20 rounded-2xl p-8 space-x-6">
            <div className="text-left">
              <h3 className="text-xl font-semibold font-round mb-2">
                Vem conhecer nosso espaço!
              </h3>
              <p className="text-muted-foreground">
                Agende uma visita e veja como cuidamos do seu pequeno.
              </p>
            </div>
            <div className="shrink-0">
              <button className="px-6 py-3 gradient-strawberry text-white rounded-xl font-medium hover-lift shadow-button">
                Agendar Visita
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;