"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  published_date: string;
  image_url: string | null;
}

export default function SchoolNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const { data, error } = await supabase
      .from("website_news")
      .select("id, title, excerpt, category, published_date, image_url")
      .eq("published", true)
      .order("published_date", { ascending: false })
      .limit(3);

    if (!error && data) {
      setNews(data);
    }
    setLoading(false);
  };

  const getCategoryEmoji = (category: string) => {
    const emojis: Record<string, string> = {
      events: "🏃",
      academics: "🔬",
      sports: "⚽",
      infrastructure: "💻",
      general: "📢",
    };
    return emojis[category] || "📰";
  };

  if (loading) {
    return (
      <section id="news" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading news...</div>
        </div>
      </section>
    );
  }

  if (news.length === 0) {
    return (
      <section id="news" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Latest News & Updates
            </h2>
            <p className="text-xl text-gray-600">
              No news available at the moment
            </p>
          </div>
        </div>
      </section>
    );
  }

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
          {news.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-6xl">
                {getCategoryEmoji(item.category)}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-blue-600 uppercase">
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(item.published_date).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4">{item.excerpt}</p>
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
