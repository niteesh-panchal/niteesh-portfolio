// app/layout.jsx
// ChatGPT-style: sidebar pushes main content, trigger stays fixed on the right.

import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "sonner";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-dvh overflow-hidden">
        <TooltipProvider>
          <SidebarProvider>
            <div className="flex h-dvh w-full overflow-hidden [--sidebar-width:200px]">
              <AppSidebar />

              <main
                className="
              flex-1
              overflow-hidden
              transition-[margin-left] duration-200 ease-out
              ml-0
              group-data-[state=expanded]:ml-[--sidebar-width]
            "
              >
                <SidebarTrigger />
                <Toaster />

                {/* This wrapper should NOT hide overflow */}
                <div className="mx-auto w-full max-w-5xl h-full overflow-hidden">
                  {children}
                </div>
              </main>
            </div>
          </SidebarProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
