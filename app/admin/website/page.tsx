import Link from "next/link";

export default function WebsiteManagementPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Website Content Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* News Management */}
        <Link href="/admin/website/news" className="block">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="text-4xl mb-4">📰</div>
            <h3 className="text-xl font-bold mb-2">News & Updates</h3>
            <p className="text-gray-600">
              Manage news articles and announcements
            </p>
          </div>
        </Link>

        {/* Teachers Management */}
        <Link href="/admin/website/teachers" className="block">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="text-4xl mb-4">👨‍🏫</div>
            <h3 className="text-xl font-bold mb-2">Faculty Profiles</h3>
            <p className="text-gray-600">
              Manage teacher profiles and statements
            </p>
          </div>
        </Link>

        {/* Programs Management */}
        <Link href="/admin/website/programs" className="block">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-xl font-bold mb-2">Academic Programs</h3>
            <p className="text-gray-600">
              Manage academic programs and courses
            </p>
          </div>
        </Link>

        {/* School Settings */}
        <Link href="/admin/website/settings" className="block">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="text-4xl mb-4">⚙️</div>
            <h3 className="text-xl font-bold mb-2">School Settings</h3>
            <p className="text-gray-600">
              Update school info and contact details
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
