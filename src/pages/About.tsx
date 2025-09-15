import Layout from "@/components/Layout/Layout";
import { Heart, Target, Users, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Amor e Cuidado",
      description: "Cada criança é tratada com carinho e atenção individual, criando um ambiente acolhedor e seguro."
    },
    {
      icon: Target,
      title: "Desenvolvimento Integral",
      description: "Focamos no crescimento cognitivo, emocional, social e físico de cada pequeno."
    },
    {
      icon: Users,
      title: "Parceria com Famílias",
      description: "Trabalhamos em conjunto com os pais para garantir o melhor desenvolvimento da criança."
    },
    {
      icon: Award,
      title: "Excelência Educacional",
      description: "Metodologia moderna e comprovada, com profissionais altamente qualificados."
    }
  ];

  return (
    <Layout>
      <main>
        {/* Hero Section */}
        <section className="gradient-soft py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold font-round">
                Sobre a{" "}
                <span className="text-gradient-strawberry">C.R.I Moranguinho</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Há mais de 5 anos cuidando e educando crianças com amor, 
                proporcionando um ambiente seguro e estimulante para o seu desenvolvimento.
              </p>
            </div>
          </div>
        </section>

        {/* Nossa História */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl lg:text-4xl font-bold font-round">
                  Nossa História
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    A C.R.I Moranguinho nasceu em 2020 do sonho de criar um espaço onde 
                    as crianças pudessem crescer felizes, seguras e estimuladas. 
                    Fundada por educadoras apaixonadas pelo desenvolvimento infantil, 
                    nossa escola tem como missão oferecer muito mais que educação.
                  </p>
                  <p>
                    Acreditamos que cada criança é única e merece atenção individualizada. 
                    Por isso, desenvolvemos uma metodologia que combina aprendizado lúdico, 
                    cuidado afetuoso e valores sólidos, preparando nossos pequenos para 
                    os desafios do futuro.
                  </p>
                  <p>
                    Hoje, somos uma referência na região, com mais de 150 crianças 
                    atendidas e centenas de famílias que confiam em nosso trabalho.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-muted rounded-2xl p-8 text-center space-y-4">
                  <div className="text-4xl">🏫</div>
                  <h3 className="text-xl font-semibold font-round">Desde 2020</h3>
                  <p className="text-muted-foreground">
                    Transformando vidas através da educação com amor
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nossos Valores */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold font-round">
                Nossos Valores
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Os princípios que norteiam nosso trabalho e fazem da C.R.I Moranguinho 
                um lugar especial para seu filho.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="hover-lift border-0 shadow-card">
                    <CardContent className="p-8 flex items-start space-x-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                        <Icon size={24} />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold font-round">{value.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Metodologia */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold font-round">
                  Nossa Metodologia
                </h2>
                <p className="text-lg text-muted-foreground">
                  Baseada no aprendizado lúdico e no desenvolvimento integral da criança.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl">
                    🎨
                  </div>
                  <h3 className="text-lg font-semibold font-round">Criatividade</h3>
                  <p className="text-sm text-muted-foreground">
                    Estimulamos a expressão artística e criativa através de atividades lúdicas
                  </p>
                </div>
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-secondary/10 rounded-full flex items-center justify-center text-secondary text-2xl">
                    🤝
                  </div>
                  <h3 className="text-lg font-semibold font-round">Socialização</h3>
                  <p className="text-sm text-muted-foreground">
                    Desenvolvemos habilidades sociais através de brincadeiras e atividades em grupo
                  </p>
                </div>
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-accent/20 rounded-full flex items-center justify-center text-accent-bright text-2xl">
                    🧠
                  </div>
                  <h3 className="text-lg font-semibold font-round">Cognição</h3>
                  <p className="text-sm text-muted-foreground">
                    Estimulamos o desenvolvimento cognitivo de forma natural e divertida
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default About;