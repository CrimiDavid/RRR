export default async function CreatorPage({params}) {
    const {creator} = params;
    return (
        <h1>Hello {creator}</h1>
    )
}