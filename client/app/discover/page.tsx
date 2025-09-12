import { CreatorCarousel } from "@/components/discover/carousel-creators";
import TopCreators from "@/components/discover/creators";
import { Suspense } from "react";
import LoadList from "@/components/discover/load_list";
import ListManager from "@/components/discover/list-manager";
import { DialogDemo } from "@/components/discover/add-component";
export default async function DiscoverPage() {
  console.log("rendering home");
  return (
    <div
      className={
        "flex flex-col container mx-auto mt-12 border-2 min-h-[90vh] p-2 space-y-2"
      }
    >
      <header className={"hidden border-2 rounded-md md:flex flex-col p-1"}>
        <TopCreators />
        <div className="flex justify-center items-center">
          <CreatorCarousel />
        </div>
      </header>
      <main
        className={
          "w-full border-2 rounded-md flex-grow p-4 overflow-y-scroll max-h-[100vh]"
        }
      >
        <DialogDemo />
        <Suspense fallback={<LoadList />}>
          <ListManager />
        </Suspense>
      </main>
    </div>
  );
}
