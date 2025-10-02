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

export default function MainLayout() {
  const location = useLocation()
  const auth = getAuth();
  const user = auth.currentUser;

  const handleLogout = () => {
    signOut(auth)
  }

  const navLinks = [
    { name: "Inicio", href:"/" },
    { name: "Envios", href:"/shipments" },
  ]

  return (
    <div className="w-screen h-screen flex">
      <aside>
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader>
              <h1>CargoTransPanel</h1>
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
              <p>{user?.displayName}</p>
              <p>{user?.email}</p>
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