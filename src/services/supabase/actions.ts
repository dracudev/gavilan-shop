"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/services/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // TODO: validate inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error(error);
    return { error };
  }

  const redirectUrl = (formData.get("redirect") as string) || "/";
  redirect(redirectUrl);
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience, better validate inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        display_name: formData.get("username") as string,
      },
    },
  };

  // Pass the options object to signUp
  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: data.options,
  });

  if (error) {
    console.error(error);
    return { error };
  }

  const redirectUrl = (formData.get("redirect") as string) || "/";
  return { redirectUrl };
}

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error logging out:", error);
    return { error };
  }

  revalidatePath("/", "layout");
  redirect("/login");
}
