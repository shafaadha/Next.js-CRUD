import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/comments", {
    cache: "no-store",
  });
  const apiData = await res.json();

  return <DashboardClient apiData={apiData} />;
}
