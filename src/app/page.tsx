import Link from "next/link";

async function getData() {
  const res = await fetch(
    "https://645b6fe3a8f9e4d6e7686eb1.mockapi.io/api/v1/users",
    { next: { revalidate: 1 } }
  );

  if (!res.ok) {
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
            <Link href={`/users/${item.id}`} key={item.id}>
              <li>{item?.name}</li>
            </Link>
          ))}
        </ul>
      }
    </main>
  );
}