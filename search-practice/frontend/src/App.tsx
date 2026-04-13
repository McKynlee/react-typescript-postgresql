// src/App.tsx
import { useEffect, useState } from 'react';
import { fetchUsers } from './api/users';
import { useDebounce } from './hooks/useDebounce';
import { SearchInput } from './components/SearchInput';
import { UsersTable } from './components/UsersTable';
import { Pagination } from './components/Pagination';
import type { User } from './types/User';

export default function App() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPage(1); // reset page on new search
  }, [debouncedSearch]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetchUsers(debouncedSearch, page);
        setUsers(res.data);
        setTotalPages(res.pagination.totalPages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [debouncedSearch, page]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">User Search</h1>

      <SearchInput value={search} onChange={setSearch} />

      {loading ? (
        <div className="mt-4">Loading...</div>
      ) : (
        <>
          <UsersTable users={users} />
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}