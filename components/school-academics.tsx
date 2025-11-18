export default function SchoolAcademics() {
  const programs = [
    {
      title: "Primary Education",
      grade: "Grades 1-5",
      icon: "📚",
      description:
        "Building strong foundations in core subjects with interactive learning methods.",
      subjects: ["English", "Mathematics", "Science", "Social Studies"],
    },
    {
      title: "Middle School",
      grade: "Grades 6-8",
      icon: "🎓",
      description:
        "Comprehensive curriculum designed to prepare students for high school challenges.",
      subjects: ["Advanced Math", "Biology", "Chemistry", "Languages"],
    },
    {
      title: "High School",
      grade: "Grades 9-12",
      icon: "🏆",
      description:
        "College preparatory programs with focus on academic excellence and career guidance.",
      subjects: ["Physics", "Computer Science", "Literature", "Economics"],
    },
  ];

  return (
    <section id="academics" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Academic Programs
          </h2>
          <p className="text-xl text-gray-600">
            Comprehensive education tailored to every learning stage
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-lg p-8 hover:shadow-lg transition"
            >
              <div className="text-5xl mb-4">{program.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {program.title}
              </h3>
              <p className="text-blue-600 font-semibold mb-4">
                {program.grade}
              </p>
              <p className="text-gray-600 mb-6">{program.description}</p>
              <div className="space-y-2">
                <p className="font-semibold text-gray-700">Key Subjects:</p>
                <div className="flex flex-wrap gap-2">
                  {program.subjects.map((subject, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
