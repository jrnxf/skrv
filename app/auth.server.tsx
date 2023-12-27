import { supabase } from "~/lib/supabase";
import { LoginFormData } from "~/routes/login";
import { RegisterFormData } from "~/routes/register";

export const register = async (formData: RegisterFormData) => {
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  });

  console.log({
    data,
    error,
  });

  return formData;
};

export const login = async (formData: LoginFormData) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    throw error;
  }
  return data;
};
