import CreateForm from "./CreateForm";

export default function Page() {
  return (
    <div className="max-w-lg mx-auto mt-20 p-6 rounded-lg border shadow">
      <h2 className="text-2xl font-bold mb-4">Create Comment</h2>
      <CreateForm />
    </div>
  );
}
