
import Link from "next/link";

async function getData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const data = await getData();

  return (
    <main className="text-center">
      {
        <ul>
          {data?.map((item: any) => (
            <Link href={`/posts/${item.id}`} key={item.id}>

            <li>{item?.title}</li>
            </Link>
          ))}
        </ul>
      }
    </main>
  );
}
