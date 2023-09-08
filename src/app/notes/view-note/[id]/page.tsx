"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import useSWR from "swr";

async function fetcher(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to load data");
  }
  return res.json();
}

export default function ViewNotePage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    console.log(`Current pathname: ${pathname}`);
    if (id) {
      console.log(`Note ID is: ${id}`);
    }
  }, [pathname, id]);

  const { data, error } = useSWR(id ? `/api/${id}` : null, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </div>
  );
}
