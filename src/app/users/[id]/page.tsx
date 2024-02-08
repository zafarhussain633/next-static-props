

async function getData(id: any) {
  const res = await fetch(
    `https://645b6fe3a8f9e4d6e7686eb1.mockapi.io/api/v1/users/${id}`,
    { next: { revalidate: 1 } }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Page({ params }: { params: { id: number } }) {

  const userRecord = await getData(params?.id);
  return (
    <div>
      <div>My user: {userRecord.id}</div>
      <div>My name: {userRecord.name}</div>
    </div>
  );
}

export async function generateStaticParams() {
  const users = await fetch(
    `https://645b6fe3a8f9e4d6e7686eb1.mockapi.io/api/v1/users`
  ).then((res) => res.json());

  return users?.map((user: any) => ({
    id: user?.id,
  }));
}
