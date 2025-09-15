import { ArrowRight, Calendar, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden gradient-soft">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Conteúdo */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Star className="w-4 h-4 mr-2" />
                Escola premiada na região
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold font-round leading-tight">
                Educação com{" "}
                <span className="text-gradient-strawberry">carinho</span>{" "}
                para seu pequeno
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Na C.R.I Moranguinho, cada criança é única e especial. 
                Oferecemos um ambiente seguro, acolhedor e estimulante 
                para o desenvolvimento integral dos pequenos.
              </p>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary font-round">5+</div>
                <div className="text-sm text-muted-foreground">Anos de experiência</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary font-round">150+</div>
                <div className="text-sm text-muted-foreground">Crianças felizes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary font-round">15+</div>
                <div className="text-sm text-muted-foreground">Profissionais</div>
              </div>
            </div>

            {/* Botões de ação */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="gradient-strawberry text-white shadow-button hover-lift group"
              >
                <Heart className="w-5 h-5 mr-2" />
                Matricular agora
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="hover-lift border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Agendar visita
              </Button>
            </div>

            {/* Indicadores de confiança */}
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <div className="flex -space-x-2 mr-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-secondary/20 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-accent/20 border-2 border-white"></div>
                </div>
                <span>100+ famílias satisfeitas</span>
              </div>
            </div>
          </div>

          {/* Imagem */}
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-soft">
              <img
                src={heroImage}
                alt="Crianças felizes na C.R.I Moranguinho"
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Elementos decorativos */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-full animate-float"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary/10 rounded-full animate-gentle-bounce"></div>
            <div className="absolute top-1/2 -right-12 w-16 h-16 bg-accent/10 rounded-full animate-float"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;