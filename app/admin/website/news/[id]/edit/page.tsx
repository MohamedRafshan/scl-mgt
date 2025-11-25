import { createClient } from "@/lib/supabase/server";
import NewsForm from "@/components/admin/news/news-form";
import { notFound } from "next/navigation";

export default async function EditNewsPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  const { data: news, error } = await supabase
    .from("news")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !news) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit News</h1>
      <NewsForm news={news} />
    </div>
  );
}
