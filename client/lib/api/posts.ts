export const getPosts = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/all`)

        if (!response.ok) throw new Error(response.statusText)

        return await response.json()
    }catch (e) {
        console.error(e)
    }
}