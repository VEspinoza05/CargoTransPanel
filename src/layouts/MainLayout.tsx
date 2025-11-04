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
import { getAuth, signOut  } from "firebase/auth";
import { Button } from "../components/ui/button";
import { useAuth } from "../contexts/AuthContext";
import cargotransLogo from "../assets/cargotransLogo.jpg"

export default function MainLayout() {
  const auth = getAuth();
  const { user, role, branchCity, loading } = useAuth();

  const handleLogout = () => {
    signOut(auth)
  }

  const adminLinks = [
    { name: "Inicio", href:"/" },
    { name: "Envios", href:"/shipments" },
    { name: "Inicios de sesion", href:"/LoginLog"},
    { name: "Dashboard Compras", href:"/Acquisitions"},
    { name: "Compras", href:"/Acquisitions/Purchases"},
  ]

  const branchManagerLinks = [
    { name: "Inicio", href:"/" },
    { name: "Salientes", href:"/Outgoing" },
    { name: "Entrantes", href:"/Incoming"}
  ]

  const navLinks = (role === "Administrador") ? adminLinks : 
    (role === "Encargado") ? branchManagerLinks : [];

  if (loading) return <p>Cargando...</p>;

  if (!user) return <p>No estás autenticado</p>;

  return (
    <div className="w-screen h-screen flex">
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
        <Outlet />
      </main>
    </div>
  );
}