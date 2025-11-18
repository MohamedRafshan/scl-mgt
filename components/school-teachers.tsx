export default function SchoolTeachers() {
  const teachers = [
    {
      name: "Dr. Sarah Johnson",
      position: "Principal",
      subject: "Educational Leadership",
      quote:
        "Education is not the filling of a pail, but the lighting of a fire.",
      experience: "20+ years",
    },
    {
      name: "Mr. David Chen",
      position: "Head of Mathematics",
      subject: "Mathematics & Physics",
      quote:
        "Mathematics is not about numbers, it's about understanding patterns in our world.",
      experience: "15+ years",
    },
    {
      name: "Ms. Emily Rodriguez",
      position: "Head of Sciences",
      subject: "Biology & Chemistry",
      quote:
        "Science is a way of thinking much more than it is a body of knowledge.",
      experience: "12+ years",
    },
  ];

  return (
    <section id="teachers" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Distinguished Faculty
          </h2>
          <p className="text-xl text-gray-600">
            Meet our dedicated and experienced educators
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {teachers.map((teacher, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-6"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                {teacher.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {teacher.name}
                </h3>
                <p className="text-blue-600 font-semibold">
                  {teacher.position}
                </p>
                <p className="text-sm text-gray-500">{teacher.subject}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {teacher.experience} experience
                </p>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-gray-600 italic text-sm text-center">
                  "{teacher.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
