import {Navbar} from "@/components/navbar";
import {SidebarProvider} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/sidebar";

export default function DiscoverLayout({children}: {children: React.ReactNode}) {
    return (
        <SidebarProvider>
            <div className="flex w-full">
                <AppSidebar />
                <div className="flex-1 flex flex-col">
                    <header className="p-2 border-b">
                        <Navbar/>
                    </header>
                    <main>
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    )
}