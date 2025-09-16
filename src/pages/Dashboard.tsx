import { useAuth } from "@/hooks/useAuth";
import AdminDashboard from "@/components/Dashboard/AdminDashboard";
import ProfessorDashboard from "@/components/Dashboard/ProfessorDashboard";
import PaiDashboard from "@/components/Dashboard/PaiDashboard";

export default function Dashboard() {
  const { profile } = useAuth();

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-strawberry"></div>
      </div>
    );
  }

  switch (profile.role) {
    case "admin":
      return <AdminDashboard />;
    case "professor":
      return <ProfessorDashboard />;
    case "pai":
      return <PaiDashboard />;
    default:
      return <div>Erro: Tipo de usuário não reconhecido</div>;
  }
}