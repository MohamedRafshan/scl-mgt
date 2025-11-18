import Link from "next/link";

export default function SchoolHero() {
  return (
    <section
      id="home"
      className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Welcome to Excellence School
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Empowering students to reach their full potential through quality
              education, innovative teaching methods, and a nurturing
              environment.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#academics"
                className="bg-white text-blue-900 px-6 py-3 rounded-md font-semibold hover:bg-blue-50 transition"
              >
                Explore Programs
              </Link>
              <Link
                href="#contact"
                className="border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-900 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Quick Facts</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/20 pb-2">
                  <span>Students Enrolled</span>
                  <span className="font-bold text-2xl">1,200+</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/20 pb-2">
                  <span>Qualified Teachers</span>
                  <span className="font-bold text-2xl">80+</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/20 pb-2">
                  <span>Academic Programs</span>
                  <span className="font-bold text-2xl">15+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Success Rate</span>
                  <span className="font-bold text-2xl">98%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
