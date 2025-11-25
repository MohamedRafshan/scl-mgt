"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type NewsInsert = {
  title: string;
  summary?: string;
  content?: string;
  image_url?: string | null;
  published?: boolean;
  [key: string]: unknown;
};

export async function createNews(data: NewsInsert) {
  console.log("=== Creating News ===");
  console.log("Data received:", data);
  
  try {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    console.log("=== Authentication Check ===");
    console.log("Auth error:", authError);
    console.log("User authenticated:", !!user);
    console.log("User ID:", user?.id);
    console.log("User email:", user?.email);
    console.log("===========================");
    
    if (authError || !user) {
      console.error("Authentication failed:", authError);
      return { error: "User not authenticated. Please log in again." };
    }

    const insertData = {
      ...data,
      created_by: user.id,
    };
    
    console.log("Inserting data:", insertData);

    const { data: news, error } = await supabase
      .from("news")
      .insert(insertData)
      .select()
      .single();

    console.log("Insert result:", { news, error });

    if (error) {
      console.error("Insert error:", error);
      throw error;
    }

    console.log("=== News Created Successfully ===");
    revalidatePath("/admin/website/news");
    return { success: true, data: news };
  } catch (error: any) {
    console.error("=== Create News Failed ===");
    console.error("Error:", error);
    return { error: error?.message || String(error) };
  }
}

export async function updateNews(id: string, data: NewsInsert) {
    try {
        console.log("=== Update News Started ===");
        console.log("News ID:", id);
        console.log("Update data:", data);
        
        const supabase = await createClient();

        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        console.log("=== Authentication Check ===");
        console.log("Auth error:", authError);
        console.log("User authenticated:", !!user);
        console.log("User ID:", user?.id);
        console.log("User email:", user?.email);
        console.log("User role:", user?.user_metadata?.role);
        console.log("===========================");
        
        if (authError || !user) {
            console.error("Authentication failed:", authError);
            return { error: "User not authenticated. Please log in again." };
        }

        const updatePayload = {
            ...data,
            updated_at: new Date().toISOString(),
        };
        
        console.log("Update payload:", updatePayload);

        const { data: news, error } = await supabase
            .from("news")
            .update(updatePayload)
            .eq("id", id)
            .select()
            .single();

        console.log("Update result:", { news, error });

        if (error) throw error;

        console.log("=== Update Successful ===");
        revalidatePath("/admin/website/news");
        return { success: true, data: news };
    } catch (error: any) {
        console.error("=== Update Failed ===");
        console.error("Error:", error);
        return { error: error instanceof Error ? error.message : String(error) };
    }
}

export async function deleteNews(id: string) {
  try {
    const supabase = await createClient();

    // Get the news item to delete its image
    const { data: news } = await supabase
      .from("news")
      .select("image_url")
      .eq("id", id)
      .single();

    // Delete image from storage if exists
    if (news?.image_url) {
      const imagePath = news.image_url.split("/").pop();
      if (imagePath) {
        await supabase.storage.from("news-images").remove([imagePath]);
      }
    }

    const { error } = await supabase.from("news").delete().eq("id", id);

    if (error) throw error;

    revalidatePath("/admin/website/news");
    return { success: true };
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : String(error) };
  }
}

export async function uploadNewsImage(formData: FormData) {
  try {
    // Log all cookies to debug session issues
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    console.log("=== Cookies Check ===");
    console.log("Total cookies:", allCookies.length);
    console.log("Cookie names:", allCookies.map(c => c.name));
    console.log("Has auth cookies:", allCookies.some(c => c.name.includes('auth')));
    console.log("====================");

    const supabase = await createClient();
    
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    
    console.log("=== Authentication Check ===");
    console.log("Auth error:", authError);
    console.log("User authenticated:", !!user);
    console.log("User ID:", user?.id);
    console.log("User email:", user?.email);
    console.log("User role:", user?.user_metadata?.role);
    console.log("===========================");
    
    if (authError || !user) {
      console.error("Authentication failed:", authError);
      return { error: "User not authenticated. Please log in again." };
    }
    
    const file = formData.get("file") as File;
    if (!file) {
      return { error: "No file provided" };
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `news/${fileName}`;

    console.log("Uploading file:", { fileName, fileSize: file.size, fileType: file.type });

    const { error: uploadError } = await supabase.storage
      .from("news-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return { error: `Upload failed: ${uploadError.message}` };
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("news-images").getPublicUrl(filePath);

    console.log("Upload successful:", publicUrl);

    return { success: true, url: publicUrl };
  } catch (error: any) {
    console.error("Upload exception:", error);
    return { error: error.message || "Failed to upload image" };
  }
}
