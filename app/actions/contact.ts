"use server";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

interface ContactInput {
  name: string;
  email: string;
  message: string;
}

export async function submitContact({ name, email, message }: ContactInput) {
  const trimmedName = name?.trim();
  const trimmedEmail = email?.trim();
  const trimmedMessage = message?.trim();

  if (!trimmedName || !trimmedEmail || !trimmedEmail.includes("@") || !trimmedMessage) {
    return { error: "Please fill in your name, a valid email, and a message." };
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase credentials not found. Simulating success.");
    // Simulation mode for environments without Supabase set up
    await new Promise((resolve) => setTimeout(resolve, 1200));
    return { success: true };
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  try {
    const { error } = await supabase.from("contacts").insert([
      {
        name: trimmedName,
        email: trimmedEmail,
        message: trimmedMessage,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Contact Error:", error);
      return { error: "Failed to send. Please try again later." };
    }

    return { success: true };
  } catch (err) {
    console.error("Contact Exception:", err);
    return { error: "An unexpected error occurred." };
  }
}
