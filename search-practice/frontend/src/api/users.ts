import type { UsersResponse } from "../types/User";

export async function fetchUsers(
  search: string,
  page: number
): Promise<UsersResponse> {
  const params = new URLSearchParams({
    search,
    page: String(page),
    limit: '10',
  });

  const res = await fetch(`http://localhost:3000/users?${params}`);
  if (!res.ok) throw new Error('Failed to fetch');

  return res.json();
}