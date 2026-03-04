"use server";

import { createClient } from "@supabase/supabase-js";

// Make sure these are defined in .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export async function joinWaitlist(email: string) {
    if (!email || !email.includes("@")) {
        return { error: "Invalid email address" };
    }

    if (!supabaseUrl || !supabaseAnonKey) {
        console.warn("Supabase credentials not found. Simulating success.");
        // For local dev without env vars
        return { success: true };
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    try {
        const { error } = await supabase
            .from("waitlist")
            .insert([{ email, created_at: new Date().toISOString() }]);

        if (error) {
            // Handle unique constraint error specifically if needed
            if (error.code === "23505") {
                return { error: "You are already on the waitlist!" };
            }
            console.error("Waitlist Error:", error);
            return { error: "Failed to join. Please try again later." };
        }

        return { success: true };
    } catch (err) {
        console.error("Waitlist Exception:", err);
        return { error: "An unexpected error occurred." };
    }
}
