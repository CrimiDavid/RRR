import {Navbar} from "@/components/navbar";

export default function DiscoverLayout({children}: {children: React.ReactNode}) {
    return (
        <div>
            <header className={"p-2"}>
                <Navbar/>
            </header>
            <main>
                {children}

            </main>
        </div>
    )
}