import ResizablePanels from "@/components/posts/post-page";
import ResizablePanelsSmall from "@/components/posts/post-page-small";
import { getPostFiles } from "@/lib/api/posts";
interface PostParams {
  creator: string;
  id: string;
}

export default async function Post({
  params,
}: {
  params: Promise<PostParams>;
}) {
  const { creator, id } = await params;
  const files: Promise<string[]> = getPostFiles(creator, id);
  return (
    <div>
      <div className="block lg:hidden">
        <ResizablePanelsSmall />
      </div>

      <div className="hidden lg:block">
        <ResizablePanels promise={files} />
      </div>
    </div>
  );
}
