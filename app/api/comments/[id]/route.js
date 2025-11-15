export async function DELETE(req, { params }) {
  const { id } = params;

  return Response.json({ success: true, message: "Deleted successfully" });
}
