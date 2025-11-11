import { Link, Outlet, useLocation } from "react-router";
import { Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem, 
  SidebarProvider
} from "../components/ui/sidebar";
import { getAuth, signOut  } from "firebase/auth";
import { Button } from "../components/ui/button";
import { useAuth } from "../contexts/AuthContext";
import cargotransLogo from "../assets/cargotransLogo.jpg"
import { Toaster } from "sonner";

export default function MainLayout() {
  const auth = getAuth();
  const { user, role, branchCity, loading } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = () => {
    signOut(auth)
  }

  const branchManagerLinks = [
    { name: "Inicio", href:"/" },
    { name: "Clientes", href:"/BranchManaging/ClientsManagement" },
    { name: "Asistencia", href:"/BranchManaging/BranchAttendance" },
  ]

  const humanResourcesDirectorLinks = [
    { name: "Inicio", href:"/" },
    { name: "Gestion de empleados", href:"/HumanResources/EmployeesManagement"},
    { name: "Solicitudes internas", href:"/HumanResources/InternalRequests"},
  ]

  const purchasesDirectorLinks = [
    { name: "Inicio", href:"/" },
    { name: "Dashboard Compras", href:"/Acquisitions"},
    { name: "Compras", href:"/Acquisitions/Purchases"},
    { name: "Gestión Proveedores", href:"/Acquisitions/SuppliersManagement"},
  ]

  const financialDirectorLinks = [
    { name: "Inicio", href:"/" },
    { name: "Cuentas pendientes / por pagar", href:"/Financial/Accounts" },
  ]

  const oparetiveDirectorLinks = [
    { name: "Inicio", href:"/" },
    { name: "Gestión de flota", href:"/Operations/FleetManagement" },
    { name: "Gestión de envíos", href:"/Operations/ShipmentsManagement" },
  ]

  const CEOLinks = [
    { name: "Inicio", href:"/" },
    { name: "Dashboard", href:"/CEO/Dashboard" },
  ]

  const shiftSupervisorLinks = [
    { name: "Inicio", href:"/" },
    { name: "Recepcion de paquetes", href:"/ShiftSupervisor/PackageReception" },
  ]

  const getLinks = (role: string | null) => {
    switch (role) {
      case "Gerente de Sucursal":
        return branchManagerLinks;
        break;
      case "Director de RR.HH":
        return humanResourcesDirectorLinks;
        break;
      case "Director de compras":
        return purchasesDirectorLinks;
        break;
      case "Director Financiero":
        return financialDirectorLinks;
        break;
      case "Director Operativo":
        return oparetiveDirectorLinks;
        break;
      case "CEO":
        return CEOLinks;
        break;
      case "Encargado de Turno":
        return shiftSupervisorLinks;
        break;
      default:
        return [];
    }
  }

  const navLinks = getLinks(role);

  if (loading) return <p>Cargando...</p>;

  if (!user) return <p>No estás autenticado</p>;

  return (
    <div className="w-screen h-screen flex">
      <Toaster />
      <aside>
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader>
              <img src={cargotransLogo} />
              <h2 className="font-bold text-lg">{role === "Administrador" ? "Casa matriz" : `Ciudad: ${branchCity}`}</h2>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Vistas</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {navLinks.map((link) => (
                      <SidebarMenuItem key={link.name}>
                        <SidebarMenuButton>
                          <Link to={link.href}>{link.name}</Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <h3 className="font-bold text-base">Datos de usuario</h3>
              <p>{user?.displayName}</p>
              <p>{user?.email}</p>
              <p>{role}</p>
              <Button onClick={handleLogout}>
                Cerrar sesion
              </Button>
            </SidebarFooter>
          </Sidebar>
        </SidebarProvider>
      </aside>
      <main className="flex flex-col w-full p-4 overflow-auto">
        {
          navLinks.find((route) => route.href === currentPath) ? <Outlet /> :
            <h1 className="font-bold text-4xl mb-6">Error: Acceso no autorizado</h1>
        }
      </main>
    </div>
  );
}