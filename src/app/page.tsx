export const revalidate = 20;


import Link from "next/link";

async function getData() {
  const res = await fetch(
    "https://65cc978fdd519126b83f01ba.mockapi.io/blogs",
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