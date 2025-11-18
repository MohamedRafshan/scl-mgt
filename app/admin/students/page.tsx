import Link from "next/link";

export default function StudentsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Students</h1>
        <Link
          href="/admin/students/add"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Student
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <p className="text-gray-500">No students found.</p>
        </div>
      </div>
    </div>
  );
}
