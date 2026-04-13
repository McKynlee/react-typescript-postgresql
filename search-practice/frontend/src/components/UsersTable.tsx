// src/components/UsersTable.tsx

import type { User } from "../types/User";

export function UsersTable({ users }: { users: User[] }) {
  if (!users.length) {
    return <div className="text-gray-500 mt-4">No results found</div>;
  }

  return (
    <table className="w-full mt-4 border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 text-left">Name</th>
          <th className="p-2 text-left">Phone</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id} className="border-t">
            <td className="p-2">{u.name}</td>
            <td className="p-2">{u.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}