import ResizablePanels from "@/components/posts/post-page";
import ResizablePanelsSmall from "@/components/posts/post-page-small";

export default async function Post() {
  await new Promise((res) => setTimeout(res, 2000));
  return (
    <div>
      <div className="block lg:hidden">
        <ResizablePanelsSmall />
      </div>

      <div className="hidden lg:block">
        <ResizablePanels />
      </div>
    </div>
  );
}
