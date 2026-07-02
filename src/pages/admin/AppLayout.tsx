import { Outlet } from "react-router-dom"
import { Toaster } from "sonner"
import { AppSidebar } from "../../components/sample/dashboard/Sidebar"
import { SidebarProvider } from "../../components/sample/ui/sidebar"

export default function AppLayout() {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content */}
        <main className="flex-1 w-0 bg-background">
          <div className="w-full min-h-screen">
            <Outlet />
          </div>
        </main>

        <Toaster />
      </div>
    </SidebarProvider>
  )
}