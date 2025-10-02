import { Link, Outlet, useLocation } from "react-router";
import { Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem, 
  SidebarProvider
} from "../components/ui/sidebar";

export default function MainLayout() {
  const location = useLocation()

  const navLinks = [
    { name: "Inicio", href:"/" },
    { name: "Envios", href:"/shipments" },
  ]

  return (
    <div className="w-screen h-screen flex">
      <aside>
        <SidebarProvider>
          <Sidebar>
            <SidebarContent>
              <SidebarHeader>
                <h1>CargoTransPanel</h1>
              </SidebarHeader>
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
          </Sidebar>
        </SidebarProvider>
      </aside>
      <main className="flex flex-col w-full p-4">
        <Outlet />
      </main>
    </div>
  );
}