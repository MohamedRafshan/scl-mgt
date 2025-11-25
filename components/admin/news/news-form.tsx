"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { createNews, updateNews, uploadNewsImage } from "@/lib/actions/news";
import Image from "next/image";

interface NewsFormProps {
  news?: any;
}

const categories = [
  { value: "general", label: "General" },
  { value: "academic", label: "Academic" },
  { value: "event", label: "Event" },
  { value: "holiday", label: "Holiday" },
  { value: "urgent", label: "Urgent" },
];

const audiences = [
  { value: "all", label: "All" },
  { value: "students", label: "Students" },
  { value: "teachers", label: "Teachers" },
  { value: "parents", label: "Parents" },
];

export default function NewsForm({ news }: NewsFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(
    news?.image_url || ""
  );
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>(
    news?.target_audience || ["all"]
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleAudience = (value: string) => {
    setSelectedAudiences((prev) =>
      prev.includes(value) ? prev.filter((a) => a !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    try {
      let imageUrl = news?.image_url || "";

      // Upload image if new file selected
      if (imageFile) {
        console.log("=== Image Upload Start ===");
        console.log("File name:", imageFile.name);
        console.log("File size:", imageFile.size, "bytes");
        console.log("File type:", imageFile.type);

        const fileFormData = new FormData();
        fileFormData.append("file", imageFile);

        const uploadResult = await uploadNewsImage(fileFormData);

        console.log("=== Upload Result ===");
        console.log("Success:", uploadResult.success);
        console.log("Error:", uploadResult.error);
        console.log("URL:", uploadResult.url);
        console.log("====================");

        if (uploadResult.error) {
          throw new Error(uploadResult.error);
        }

        if (!uploadResult.url) {
          throw new Error("No URL returned from upload");
        }

        imageUrl = uploadResult.url;
        console.log("Image uploaded successfully:", imageUrl);
      }

      const newsData = {
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        category: formData.get("category") as string,
        image_url: imageUrl,
        published: formData.get("published") === "on",
        expires_at: (formData.get("expires_at") as string) || null,
        target_audience: selectedAudiences,
      };

      console.log("Submitting news data:", newsData);

      let result;
      if (news?.id) {
        result = await updateNews(news.id, newsData);
      } else {
        result = await createNews(newsData);
      }

      if (result.error) {
        throw new Error(result.error);
      }

      router.push("/admin/website/news");
      router.refresh();
    } catch (err: unknown) {
      console.error("Form submission error:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err) || "Failed to save news");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow space-y-6"
    >
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
      )}

      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          name="title"
          defaultValue={news?.title}
          required
          placeholder="Enter news title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content *</Label>
        <Textarea
          id="content"
          name="content"
          defaultValue={news?.content}
          required
          rows={8}
          placeholder="Enter news content"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select name="category" defaultValue={news?.category || "general"}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="expires_at">Expires At</Label>
          <Input
            id="expires_at"
            name="expires_at"
            type="datetime-local"
            defaultValue={
              news?.expires_at
                ? new Date(news.expires_at).toISOString().slice(0, 16)
                : ""
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Target Audience *</Label>
        <div className="flex flex-wrap gap-4">
          {audiences.map((audience) => (
            <div key={audience.value} className="flex items-center space-x-2">
              <Checkbox
                id={audience.value}
                checked={selectedAudiences.includes(audience.value)}
                onCheckedChange={() => toggleAudience(audience.value)}
              />
              <label
                htmlFor={audience.value}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {audience.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {imagePreview && (
          <div className="mt-2 relative w-full h-64">
            <Image
              src={imagePreview}
              alt="Preview"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="published"
          name="published"
          defaultChecked={news?.published}
        />
        <label
          htmlFor="published"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Publish immediately
        </label>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : news?.id ? "Update News" : "Create News"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
