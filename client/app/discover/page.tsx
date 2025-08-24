"use client"
import {CreatorCarousel} from "@/components/discover/carousel-creators";
import TopCreators from "@/components/discover/creators";

export default function DiscoverPage() {
    return (
        <div className={"flex flex-col container mx-auto mt-12 border-2 min-h-[90vh] p-2 space-y-2"}>
            <header className={"border-2 rounded-md flex flex-col p-1"}>
                <TopCreators/>
                <div className="flex justify-center items-center">
                    <CreatorCarousel/>
                </div>
            </header>
            <main className={"w-full border-2 rounded-md p-1 flex-grow"}>
                <h1> Hello </h1>
            </main>
        </div>
    )
}
