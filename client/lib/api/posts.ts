interface Creator {
  _id: string;
  name: string;
}

interface Post {
  name: string;
  description: string;
  likes: number;
  type: string;
  creator: Creator;
}

interface PostsResponse {
  posts: Post[];
  pages: number;
}

export const getPosts = async (
  page: number,
  selection: string[],
  filter: string | null
): Promise<PostsResponse> => {
  const [sort, order] = selection;
  try {
    console.log(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/all?page=${page}&sort=${sort}&order=${order}&filter=${filter}`
    );
    // await new Promise(resolve => setTimeout(resolve, 3000));
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/all?page=${page}&sort=${sort}&order=${order}&filter=${filter}`
    );
    if (!response.ok) throw new Error(response.statusText);

    return await response.json();
  } catch (e) {
    console.error(e);
    throw new Error("Failed to fetch posts");
  }
};

export const getPostFiles = async (
  creator: string,
  id: string
): Promise<string[]> => {
  try {
    const response = await fetch(
      `http://localhost:8000/posts/${creator}/${id}`
    );
    if (!response.ok) throw new Error("Failed to fetch post files");

    const files: string[] = await response.json(); // backend should return array of URLs

    const res = await Promise.all(
      files.map(async (fileUrl) => {
        const fetchFile = await fetch(fileUrl);
        if (!fetchFile.ok) {
          throw new Error(`Failed to fetch file: ${fileUrl}`);
        }
        return await fetchFile.text();
      })
    );

    return res;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to fetch post files");
  }
};
