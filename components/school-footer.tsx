import Link from "next/link";

export default function SchoolFooter() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Excellence School</h3>
            <p className="text-gray-400 text-sm">
              Dedicated to providing quality education and nurturing future
              leaders since 1990.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#home"
                  className="text-gray-400 hover:text-white transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#news"
                  className="text-gray-400 hover:text-white transition"
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  href="#academics"
                  className="text-gray-400 hover:text-white transition"
                >
                  Academics
                </Link>
              </li>
              <li>
                <Link
                  href="#teachers"
                  className="text-gray-400 hover:text-white transition"
                >
                  Teachers
                </Link>
              </li>
            </ul>
          </div>

          {/* Admissions */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Admissions</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Apply Now
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Requirements
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Scholarships
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-gray-400 hover:text-white transition"
                >
                  Student Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>123 Education Street</li>
              <li>Learning City, LC 12345</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Email: info@excellenceschool.edu</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Excellence School. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
