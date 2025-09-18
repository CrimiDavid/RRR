import ResizablePanels from "@/components/posts/post-page";
import ResizablePanelsSmall from "@/components/posts/post-page-small";
import { getPostFiles } from "@/lib/api/posts";
export default async function Post({ params }) {
  const { creator, id } = await params;
  const sanity = getPostFiles(creator, id);
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
