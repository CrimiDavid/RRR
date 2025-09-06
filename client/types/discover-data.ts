export type Data = {
    pages: number,
    posts: Posts[]
}

type Posts = {
    _id: string,
    creator: {name: string},
    description: string,
    likes: number,
    name: string,
    type: string,
}