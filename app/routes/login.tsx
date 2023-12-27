import { zodResolver } from "@hookform/resolvers/zod";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form, Link, useSubmit } from "@remix-run/react";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { login } from "~/auth.server";
import { Button } from "~/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { validateActionFormData } from "~/lib/utils";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

const resolver = zodResolver(loginFormSchema);

export async function action({ request }: ActionFunctionArgs) {
  try {
    await validateActionFormData<LoginFormData>(request, loginFormSchema);
  } catch (error) {
    return json({ error }, { status: 400 });
  }

  const data = Object.fromEntries(await request.formData()) as LoginFormData;

  const user = await login(data);

  console.log({
    user,
  });

  return json({ user });
}

export default function Login() {
  const form = useForm<LoginFormData>({
    resolver,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit } = form;

  const submit = useSubmit();

  return (
    <div className="mx-auto max-w-sm">
      <FormProvider {...form}>
        <Form
          onSubmit={(event) => {
            handleSubmit((data, event) => {
              const formData = new FormData();
              Object.entries(data).forEach(([k, v]) => formData.append(k, v));

              if (event) {
                submit(formData, { method: "POST" });
              }
            })(event);
          }}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="colby@jrnxf.co" autoFocus {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="••••••••" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row-reverse justify-between">
            <Button type="submit">Submit</Button>
            <Button asChild variant="secondary" type="button">
              <Link to="/register">Register</Link>
            </Button>
          </div>
          {/* <p className="text-destructive text-sm font-medium">{error}</p> */}
        </Form>
      </FormProvider>
    </div>
  );
}
