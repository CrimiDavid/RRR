export const PAGE_SIZE = 4

export const getPosts = async (page) => {
    try {
        await new Promise(resolve => setTimeout(resolve, 3000));
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/all?page=${page}`)

        if (!response.ok) throw new Error(response.statusText)

        return await response.json()
    }catch (e) {
        console.error(e)
    }
}