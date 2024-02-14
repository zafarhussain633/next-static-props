export const revalidate = 20;

async function getData(id: any) {
  const res = await fetch(
    `https://65cc978fdd519126b83f01ba.mockapi.io/blogs/${id}`,
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
      <div>My user: {userRecord?.id}</div>
      <div>My name: {userRecord?.name}</div>
    </div>
  );
}

export async function generateStaticParams() {
  const users = await fetch(
    `https://65cc978fdd519126b83f01ba.mockapi.io/blogs`,
  ).then((res) => res.json());

  return users?.map((user: any) => ({
    id: user?.id,
  }));
}
