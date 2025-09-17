export const PAGE_SIZE = 4;

export const getPosts = async (page, selection, filter) => {
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
  }
};

// TODO refactor (this temp returns just the md)
export const testSanity = async (creator: string) => {
  try {
    const response = await fetch(`http://localhost:8000/posts/${creator}`);
    if (!response.ok) throw new Error("oppa");
    const text = await response.json();
    const fetchText = await fetch(text[1]);
    const mmd = await fetchText.text();
    return mmd;
  } catch (e) {
    console.error(e);
  }
};
