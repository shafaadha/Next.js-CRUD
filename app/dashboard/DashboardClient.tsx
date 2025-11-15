"use client";

import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useRouter } from "next/navigation";

export default function DashboardClient({ apiData }) {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("");
  const router = useRouter();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("newComments") || "[]");
    setComments([...saved, ...apiData]);
  }, [apiData]);

  // Filter data
  const filteredData = comments.filter((c) =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  );

  // Delete comment
  const handleDelete = (id) => {
    if (!confirm("Yakin ingin menghapus?")) return;

    const updated = comments.filter((c) => c.id !== id);
    setComments(updated);

    // Hapus dari localStorage
    const saved = JSON.parse(localStorage.getItem("newComments") || "[]");
    const newSaved = saved.filter((c) => c.id !== id);
    localStorage.setItem("newComments", JSON.stringify(newSaved));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between w-full mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-3 flex-wrap justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto"
            onClick={() =>
              fetch("/api/logout").then(() => router.push("/login"))
            }
          >
            Logout
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
            onClick={() => router.push("/dashboard/create")}
          >
            Create Comment
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
        <Column
          field="id"
          header="ID"
          style={{ width: "50px" }}
          headerStyle={{ padding: "0.5rem" }}
          bodyStyle={{ padding: "0.5rem" }}
        />
        <Column field="name" header="Name" bodyStyle={{ padding: "0.5rem" }} />
        <Column field="email" header="Email" />
        <Column
          field="body"
          header="Comment"
          bodyStyle={{ padding: "0.5rem" }}
        />
        <Column
          header="Action"
          body={(row) => (
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
