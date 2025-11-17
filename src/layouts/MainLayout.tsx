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
import { Button } from "../components/ui/button";
import cargotransLogo from "../assets/cargotransLogo.jpg"
import { Toaster } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { jwtDecode } from 'jwt-decode';

const decodeToken = (token: string | null) => {
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

  const branchManagerLinks = [
    { name: "Inicio", href:"/" },
    { name: "Clientes", href:"/BranchManaging/ClientsManagement" },
    { name: "Asistencia", href:"/BranchManaging/BranchAttendance" },
    { name: "Envíos", href:"/BranchManaging/ShipmentSending" },
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
    { name: "Solicitudes de compra", href:"/Financial/PurchaseRequests" },
  ]

  const oparetiveDirectorLinks = [
    { name: "Inicio", href:"/" },
    { name: "Gestión de flota", href:"/Operations/FleetManagement" },
    { name: "Gestión de envíos", href:"/Operations/ShipmentsManagement" },
    { name: "Mapa de flota", href:"/Operations/FleetMap" },
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
      case "Encargado de Turno":
        return shiftSupervisorLinks;
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
              {/* TODO: Add surname  */}
              <p>{tokenClaims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]}</p>
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