export default function SchoolNews() {
  const newsItems = [
    {
      id: 1,
      title: "Annual Sports Day 2024",
      date: "March 15, 2024",
      category: "Events",
      excerpt:
        "Join us for our annual sports day celebration with various athletic competitions and fun activities for all students.",
      image: "🏃",
    },
    {
      id: 2,
      title: "Science Fair Winners Announced",
      date: "March 10, 2024",
      category: "Academics",
      excerpt:
        "Congratulations to our talented students who showcased innovative projects at this year's science fair.",
      image: "🔬",
    },
    {
      id: 3,
      title: "New Computer Lab Inauguration",
      date: "March 5, 2024",
      category: "Infrastructure",
      excerpt:
        "State-of-the-art computer lab with latest technology opens for students, enhancing digital learning experience.",
      image: "💻",
    },
  ];

  return (
    <section id="news" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Latest News & Updates
          </h2>
          <p className="text-xl text-gray-600">
            Stay updated with the latest happenings at our school
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {newsItems.map((news) => (
            <div
              key={news.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-6xl">
                {news.image}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-blue-600 uppercase">
                    {news.category}
                  </span>
                  <span className="text-xs text-gray-500">{news.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {news.title}
                </h3>
                <p className="text-gray-600 mb-4">{news.excerpt}</p>
                <button className="text-blue-600 font-semibold hover:text-blue-800 transition">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
