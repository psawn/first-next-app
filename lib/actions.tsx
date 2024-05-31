"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function inValidText(text: string) {
  return !text || text.trim() === "";
}

type FormState = {
  message: string | null;
};

export async function shareMeal(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const meal = {
    title: formData.get("title")?.toString() ?? "",
    summary: formData.get("summary")?.toString() ?? "",
    instructions: formData.get("instructions")?.toString() ?? "",
    fileImage: formData.get("image") as File,
    creator: formData.get("name")?.toString() ?? "",
    creator_email: formData.get("email")?.toString() ?? "",
    slug: "",
    image: "",
  };

  if (
    inValidText(meal.title) ||
    inValidText(meal.summary) ||
    inValidText(meal.instructions) ||
    inValidText(meal.creator) ||
    inValidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.fileImage.size === 0
  ) {
    return { message: "Invalid input" };
  }

  await saveMeal(meal);

  revalidatePath("/meals");

  redirect("/meals");
}
