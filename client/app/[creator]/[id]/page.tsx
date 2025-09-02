import ResizablePanels from "@/components/posts/post-page";

export default async function Post({params}) {
    await new Promise((res) => setTimeout(res, 2000));
    const {creator, id} = await params
    return (
        <>
            <ResizablePanels/>
        </>

    )
}