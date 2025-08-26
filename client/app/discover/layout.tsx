import {Navbar} from "@/components/navbar";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/sidebar";
import QueryProviders from "@/components/query/query-provider";

export default function DiscoverLayout({children}: {children: React.ReactNode}) {
    return (
        <QueryProviders>
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
        </QueryProviders>

    )
}