import { headers } from "next/headers";

export const fetchApi = async (path: string, init?: RequestInit) => {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") ?? "http";
  const result = await fetch(`${protocol}://${host}/${path}`, init).then((res) => res.json());
  return result;
};
