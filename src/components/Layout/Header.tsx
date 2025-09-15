import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import strawberryIcon from "@/assets/strawberry-icon.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: "/", label: "Início" },
    { href: "/sobre", label: "Sobre Nós" },
    { href: "/turmas", label: "Turmas" },
    { href: "/equipe", label: "Equipe" },
    { href: "/depoimentos", label: "Depoimentos" },
    { href: "/contato", label: "Contato" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover-lift">
            <img 
              src={strawberryIcon} 
              alt="C.R.I Moranguinho" 
              className="w-10 h-10 animate-gentle-bounce"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gradient-strawberry font-round">
                C.R.I Moranguinho
              </span>
              <span className="text-xs text-muted-foreground">
                Educação com carinho
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 hover-lift ${
                  isActive(link.href)
                    ? "bg-primary text-primary-foreground shadow-button"
                    : "text-foreground hover:bg-muted hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="hover-lift"
              onClick={() => window.location.href = '/contato'}
            >
              Agendar Visita
            </Button>
            <Button 
              size="sm" 
              className="gradient-strawberry text-white shadow-button hover-lift"
              onClick={() => window.location.href = '/matricula'}
            >
              <Heart className="w-4 h-4 mr-2" />
              Matrícula
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 mt-4 px-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    window.location.href = '/contato';
                    setIsMenuOpen(false);
                  }}
                >
                  Agendar Visita
                </Button>
                <Button 
                  size="sm" 
                  className="gradient-strawberry text-white"
                  onClick={() => {
                    window.location.href = '/matricula';
                    setIsMenuOpen(false);
                  }}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Matrícula
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;