import { Heart, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import strawberryIcon from "@/assets/strawberry-icon.png";

const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Missão */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src={strawberryIcon} 
                alt="C.R.I Moranguinho" 
                className="w-8 h-8"
              />
              <span className="text-lg font-bold text-gradient-strawberry font-round">
                C.R.I Moranguinho
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Educação infantil com carinho, proporcionando um ambiente seguro e 
              acolhedor para o desenvolvimento integral das crianças.
            </p>
            <div className="flex items-center text-sm text-primary">
              <Heart className="w-4 h-4 mr-2" />
              <span className="font-medium">Feito com amor desde 2020</span>
            </div>
          </div>

          {/* Links Rápidos */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/sobre" className="text-muted-foreground hover:text-primary transition-colors">Sobre Nós</a></li>
              <li><a href="/turmas" className="text-muted-foreground hover:text-primary transition-colors">Turmas</a></li>
              <li><a href="/equipe" className="text-muted-foreground hover:text-primary transition-colors">Nossa Equipe</a></li>
              <li><a href="/depoimentos" className="text-muted-foreground hover:text-primary transition-colors">Depoimentos</a></li>
              <li><a href="/matricula" className="text-muted-foreground hover:text-primary transition-colors">Matrícula Online</a></li>
            </ul>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2 text-primary" />
                Rua das Flores, 123 - Centro
              </li>
              <li className="flex items-center text-muted-foreground">
                <Phone className="w-4 h-4 mr-2 text-primary" />
                (11) 99999-9999
              </li>
              <li className="flex items-center text-muted-foreground">
                <Mail className="w-4 h-4 mr-2 text-primary" />
                contato@crimoranguinho.com.br
              </li>
            </ul>
          </div>

          {/* Horário e CTA */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Horário de Funcionamento</h3>
            <div className="flex items-start text-sm text-muted-foreground">
              <Clock className="w-4 h-4 mr-2 text-primary mt-0.5" />
              <div>
                <p>Segunda a Sexta</p>
                <p className="font-medium">7h às 18h</p>
              </div>
            </div>
            <Button className="w-full gradient-strawberry text-white shadow-button hover-lift">
              Agendar Visita
            </Button>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2024 C.R.I Moranguinho. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="/privacidade" className="text-muted-foreground hover:text-primary transition-colors">
                Política de Privacidade
              </a>
              <a href="/termos" className="text-muted-foreground hover:text-primary transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;