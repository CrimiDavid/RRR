import ResizablePanels from "@/components/posts/post-page";
import ResizablePanelsSmall from "@/components/posts/post-page-small";
import { testSanity } from "@/lib/api/posts";
export default async function Post({ params }) {
  const { creator } = await params;
  console.log(creator);
  const sanity = testSanity(creator);
  return (
    <div>
      <div className="block lg:hidden">
        <ResizablePanelsSmall />
      </div>

      <div className="hidden lg:block">
        <ResizablePanels promise={sanity} />
      </div>
    </div>
  );
}
