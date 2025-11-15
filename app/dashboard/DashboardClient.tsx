"use client";

import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useRouter } from "next/navigation";

type Comment = {
  id: number;
  name: string;
  email: string;
  body: string;
};

export default function DashboardClient({ apiData }: { apiData: Comment[] }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [filter, setFilter] = useState("");
  const router = useRouter();

  useEffect(() => {
    const saved: Comment[] = JSON.parse(
      localStorage.getItem("newComments") || "[]"
    );
    setComments([...saved, ...apiData]);
  }, [apiData]);

  const filteredData = comments.filter((c) =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = (id: number) => {
    if (!confirm("Yakin ingin menghapus?")) return;

    const updated = comments.filter((c) => c.id !== id);
    setComments(updated);

    const saved: Comment[] = JSON.parse(
      localStorage.getItem("newComments") || "[]"
    );
    const newSaved = saved.filter((c) => c.id !== id);
    localStorage.setItem("newComments", JSON.stringify(newSaved));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between w-full mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-3 flex-wrap justify-end">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
            onClick={() => router.push("/dashboard/create")}
          >
            Create Comment
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto"
            onClick={() =>
              fetch("/api/logout").then(() => router.push("/login"))
            }
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search by name..."
          className="w-80 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <DataTable
        value={filteredData}
        totalRecords={filteredData.length}
        paginator
        rows={10}
        rowsPerPageOptions={[10, 25, 50, 100, 200]}
        showGridlines
        columnResizeMode="fit"
        tableStyle={{ minWidth: "50rem" }}
        className="shadow rounded-lg"
      >
        <Column field="id" header="ID" style={{ width: "50px" }} />
        <Column field="name" header="Name" />
        <Column field="email" header="Email" />
        <Column field="body" header="Comment" />
        <Column
          header="Action"
          body={(row: Comment) => (
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => handleDelete(row.id)}
            >
              Delete
            </button>
          )}
          style={{ width: "150px" }}
        />
      </DataTable>
    </div>
  );
}
