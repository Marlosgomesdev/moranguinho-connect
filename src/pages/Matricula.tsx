import Layout from "@/components/Layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Matricula() {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    // Dados da criança
    nomeAluno: "",
    dataNavascimento: "",
    turma: "",
    
    // Dados dos responsáveis
    nomeResponsavel1: "",
    telefone1: "",
    email1: "",
    nomeResponsavel2: "",
    telefone2: "",
    email2: "",
    
    // Informações médicas
    restricoesAlimentares: "",
    necessidadesEspeciais: "",
    medicamentos: "",
    
    // Observações
    observacoes: "",
    
    // Termos
    termosAceitos: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termosAceitos) {
      toast({
        title: "Termos não aceitos",
        description: "Por favor, aceite os termos e condições para continuar.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Solicitação enviada!",
      description: "Entraremos em contato em até 24 horas para finalizar a matrícula.",
    });
    
    // Aqui integraria com Supabase para salvar os dados
    console.log("Dados da matrícula:", formData);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-strawberry mb-4">
              Matrícula Online
            </h1>
            <p className="text-muted-foreground">
              Etapa {step} de 4 - Preencha os dados com carinho
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    i <= step ? 'bg-strawberry text-white' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {i}
                </div>
              ))}
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-strawberry h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {step === 1 && "Dados da Criança"}
                {step === 2 && "Dados dos Responsáveis"}
                {step === 3 && "Informações Médicas"}
                {step === 4 && "Revisão e Confirmação"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "Informações básicas sobre seu filho(a)"}
                {step === 2 && "Contatos dos responsáveis"}
                {step === 3 && "Saúde e necessidades especiais"}
                {step === 4 && "Confirme os dados antes de enviar"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Etapa 1: Dados da Criança */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="nomeAluno">Nome completo da criança *</Label>
                      <Input
                        id="nomeAluno"
                        value={formData.nomeAluno}
                        onChange={(e) => setFormData({...formData, nomeAluno: e.target.value})}
                        placeholder="Digite o nome completo"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="dataNavascimento">Data de nascimento *</Label>
                      <Input
                        id="dataNavascimento"
                        type="date"
                        value={formData.dataNavascimento}
                        onChange={(e) => setFormData({...formData, dataNavascimento: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="turma">Turma desejada *</Label>
                      <Select onValueChange={(value) => setFormData({...formData, turma: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a turma" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bercario">Berçário Moranguinho (4m - 1 ano)</SelectItem>
                          <SelectItem value="maternal1">Maternal I (1 - 2 anos)</SelectItem>
                          <SelectItem value="maternal2">Maternal II (2 - 3 anos)</SelectItem>
                          <SelectItem value="pre1">Pré I (3 - 4 anos)</SelectItem>
                          <SelectItem value="pre2">Pré II (4 - 5 anos)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Etapa 2: Dados dos Responsáveis */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Responsável 1 *</h3>
                      <div>
                        <Label htmlFor="nomeResponsavel1">Nome completo</Label>
                        <Input
                          id="nomeResponsavel1"
                          value={formData.nomeResponsavel1}
                          onChange={(e) => setFormData({...formData, nomeResponsavel1: e.target.value})}
                          placeholder="Nome do responsável"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="telefone1">Telefone</Label>
                        <Input
                          id="telefone1"
                          value={formData.telefone1}
                          onChange={(e) => setFormData({...formData, telefone1: e.target.value})}
                          placeholder="(00) 00000-0000"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email1">E-mail</Label>
                        <Input
                          id="email1"
                          type="email"
                          value={formData.email1}
                          onChange={(e) => setFormData({...formData, email1: e.target.value})}
                          placeholder="email@exemplo.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Responsável 2 (opcional)</h3>
                      <div>
                        <Label htmlFor="nomeResponsavel2">Nome completo</Label>
                        <Input
                          id="nomeResponsavel2"
                          value={formData.nomeResponsavel2}
                          onChange={(e) => setFormData({...formData, nomeResponsavel2: e.target.value})}
                          placeholder="Nome do responsável"
                        />
                      </div>
                      <div>
                        <Label htmlFor="telefone2">Telefone</Label>
                        <Input
                          id="telefone2"
                          value={formData.telefone2}
                          onChange={(e) => setFormData({...formData, telefone2: e.target.value})}
                          placeholder="(00) 00000-0000"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email2">E-mail</Label>
                        <Input
                          id="email2"
                          type="email"
                          value={formData.email2}
                          onChange={(e) => setFormData({...formData, email2: e.target.value})}
                          placeholder="email@exemplo.com"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Etapa 3: Informações Médicas */}
                {step === 3 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="restricoesAlimentares">Restrições alimentares ou alergias</Label>
                      <Textarea
                        id="restricoesAlimentares"
                        value={formData.restricoesAlimentares}
                        onChange={(e) => setFormData({...formData, restricoesAlimentares: e.target.value})}
                        placeholder="Descreva qualquer alergia ou restrição alimentar"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="necessidadesEspeciais">Necessidades especiais</Label>
                      <Textarea
                        id="necessidadesEspeciais"
                        value={formData.necessidadesEspeciais}
                        onChange={(e) => setFormData({...formData, necessidadesEspeciais: e.target.value})}
                        placeholder="Descreva qualquer necessidade especial ou condição médica"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="medicamentos">Medicamentos em uso</Label>
                      <Textarea
                        id="medicamentos"
                        value={formData.medicamentos}
                        onChange={(e) => setFormData({...formData, medicamentos: e.target.value})}
                        placeholder="Liste medicamentos, dosagens e horários"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="observacoes">Observações adicionais</Label>
                      <Textarea
                        id="observacoes"
                        value={formData.observacoes}
                        onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
                        placeholder="Qualquer informação adicional importante"
                        rows={3}
                      />
                    </div>
                  </div>
                )}

                {/* Etapa 4: Revisão */}
                {step === 4 && (
                  <div className="space-y-6">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Dados da Criança</h3>
                      <p><strong>Nome:</strong> {formData.nomeAluno}</p>
                      <p><strong>Data de nascimento:</strong> {formData.dataNavascimento}</p>
                      <p><strong>Turma:</strong> {formData.turma}</p>
                    </div>
                    
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Responsável Principal</h3>
                      <p><strong>Nome:</strong> {formData.nomeResponsavel1}</p>
                      <p><strong>Telefone:</strong> {formData.telefone1}</p>
                      <p><strong>E-mail:</strong> {formData.email1}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="termos"
                        checked={formData.termosAceitos}
                        onCheckedChange={(checked) => 
                          setFormData({...formData, termosAceitos: checked as boolean})
                        }
                      />
                      <Label htmlFor="termos" className="text-sm">
                        Aceito os termos e condições e autorizo o uso dos dados fornecidos
                      </Label>
                    </div>
                  </div>
                )}

                {/* Botões de navegação */}
                <div className="flex justify-between pt-6">
                  {step > 1 && (
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Voltar
                    </Button>
                  )}
                  {step < 4 ? (
                    <Button 
                      type="button" 
                      variant="strawberry" 
                      onClick={nextStep}
                      className="ml-auto"
                    >
                      Próximo
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      variant="strawberry"
                      className="ml-auto"
                    >
                      Enviar Solicitação
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}