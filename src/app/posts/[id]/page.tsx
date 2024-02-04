
// import { getItem } from '@/utils/get-item'

export const revalidate = 3600; // revalidate the data at most every hour
async function getData(id: any) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: { revalidate: 3600 },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const singleRecord = await getData(id);

  return <main>{singleRecord?.title ?? "-sad"}</main>;
}


export async function generateStaticParams() {
    const posts = await fetch(
      `https://jsonplaceholder.typicode.com/posts`
    ).then((res) => res.json());
  
    //   console.log('users....',users)
  
    return posts?.map((post: any) => ({
      id: JSON.stringify(post?.id),
    }));
  
    // return [{slug:'sdadsadasdad'}]
  }