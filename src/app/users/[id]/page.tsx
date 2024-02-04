// // pages/[id].js

// import React from 'react';

// const DynamicPage = ({ data }:any) => {
//   return (
//     <div>
//       <h1>{data.name}</h1>
//       <p>{data.username}</p>
//     </div>
//   );
// };

// export async function getStaticPaths() {
//   // Fetch a list of possible values for id
//   const paths = [
//     { params: { id: '1' } },
//     { params: { id: '2' } },
//     // Add more paths as needed
//   ];

//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }:any) {
//   // Fetch data for the specific id
//   const res = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`);
//   const data = await res.json();

//   return {
//     props: {
//       data,
//     },
//   };
// }

// export default DynamicPage;

async function getData(id: any) {
  const res = await fetch(
    `https://645b6fe3a8f9e4d6e7686eb1.mockapi.io/api/v1/users/${id}`,
    { next: { revalidate: 10 } }
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page({ params }: { params: { id: number } }) {
  //   console.log("paramsxxxx", params);

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

  //   console.log('users....',users)

  return users?.map((user: any) => ({
    id: user?.id,
  }));

  // return [{slug:'sdadsadasdad'}]
}
