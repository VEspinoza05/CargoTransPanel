import { Link, Outlet } from "react-router";
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
import { Button } from "../components/ui/button";
import cargotransLogo from "../assets/cargotransLogo.jpg"
import { Toaster } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { jwtDecode } from 'jwt-decode';

export const decodeToken = (token: string | null) => {
  const decodedToken = jwtDecode(token ?? "");
  const tokenString = JSON.stringify(decodedToken)
  const parsedToken = JSON.parse(tokenString)
  return parsedToken;
}

export default function MainLayout() {
  const { token, loading, logout } = useAuth();

  const tokenClaims = decodeToken(token)
  
  const handleLogout = () => {
    logout();
  }

  const humanResourcesDirectorLinks = [
    { name: "Inicio", href:"/" },
    { name: "Gestion de empleados", href:"/HumanResources/EmployeesManagement"},
  ]

  const purchasesDirectorLinks = [
    { name: "Inicio", href:"/" },
    { name: "Compras", href:"/Acquisitions/PurchaseRequests"},
    { name: "Gestión Proveedores", href:"/Acquisitions/SuppliersManagement"},
  ]

  const financialDirectorLinks = [
    { name: "Inicio", href:"/" },
    { name: "Revision de solicitudes", href:"/Financial/PurchaseReview" },
  ]

  const oparetiveDirectorLinks = [
    { name: "Inicio", href:"/" },
    { name: "Gestión de flota", href:"/Operations/FleetManagement" },
  ]

  const CEOLinks = [
    { name: "Inicio", href:"/" },
    { name: "Dashboard", href:"/CEO/Dashboard" },
  ]

  const shiftSupervisorLinks = [
    { name: "Inicio", href:"/" },
    { name: "Facturación", href:"/ShiftSupervisor/Billing" },
    { name: "Paquetes", href:"/ShiftSupervisor/PackageManagement" },
  ]

  const driverLinks = [
    { name: "Inicio", href:"/" },
    { name: "Mapa paquetes", href:"/Driving/Map" },
    { name: "Entrega de paquetes", href:"/Driving/PackageDelivery" },
  ]

  const getLinks = (role: string | null) => {
    switch (role) {
      case "Director De RR.HH":
        return humanResourcesDirectorLinks;
        break;
      case "Director De Compras":
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
      case "Encargado De Turno ":
        return shiftSupervisorLinks;
        break;
      case "Conductor":
        return driverLinks;
        break;
      default:
        return [];
    }
  }

  const navLinks = getLinks(tokenClaims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);

  if (loading) return <p>Cargando...</p>;

  if (!token) return <p>No estás autenticado</p>;

  return (
    <div className="w-screen h-screen flex">
      <Toaster />
      <aside>
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader>
              <img src={cargotransLogo} />
              
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
              <p>{tokenClaims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]}</p>
              <p>{tokenClaims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]}</p>
              <Button onClick={handleLogout}>
                Cerrar sesion
              </Button>
            </SidebarFooter>
          </Sidebar>
        </SidebarProvider>
      </aside>
      <main className="flex flex-col w-full p-4 overflow-auto">
        <Outlet /> 
      </main>
    </div>
  );
}