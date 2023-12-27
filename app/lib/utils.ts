import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function validateActionFormData<T>(
  request: Request,
  schema: z.ZodObject<any>,
) {
  // you can only read the body of a request once, and since
  // unstable_parseMultipartFormData also reads the body, we must first clone
  // this request if we want to also be able to validate the body
  // @see https://github.com/remix-run/remix/discussions/7660#discussioncomment-7277927
  const data = Object.fromEntries(await request.clone().formData()) as T;

  const result = schema.safeParse(data);

  if (!result.success) {
    throw { errors: result.error.issues };
  }
}
