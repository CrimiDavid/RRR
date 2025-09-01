export default async function Post({params}) {
    await new Promise((res) => setTimeout(res, 5000));
    const {creator, id} = await params
    return (
        <>
            <h1> Welcome {creator} and this is your post for id = {id}</h1>
            <a className={"border b-2"} href={`/${creator}`}> d dffsf</a>
        </>

    )
}