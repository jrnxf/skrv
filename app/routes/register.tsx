import { zodResolver } from "@hookform/resolvers/zod";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form, Link, useSubmit } from "@remix-run/react";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { register } from "~/auth.server";
import { Button } from "~/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { validateActionFormData } from "~/lib/utils";

const registerFormSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
  bio: z.string().optional(),
});

export type RegisterFormData = z.infer<typeof registerFormSchema>;

const resolver = zodResolver(registerFormSchema);

export async function action({ request }: ActionFunctionArgs) {
  try {
    await validateActionFormData<RegisterFormData>(request, registerFormSchema);
  } catch (error) {
    return json({ error }, { status: 400 });
  }

  const data = Object.fromEntries(await request.formData()) as RegisterFormData;

  const user = await register(data);

  console.log({
    user,
  });

  return json({ user });
}

export default function Join() {
  const form = useForm<RegisterFormData>({
    resolver,
    defaultValues: {
      name: "",
      email: "",
      password: "",
      bio: "",
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Colby Thomas" autoFocus {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="colby@jrnxf.co" {...field} />
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
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row-reverse justify-between">
            <Button type="submit">Submit</Button>
            <Button asChild variant="secondary" type="button">
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </Form>
      </FormProvider>
    </div>
  );
}
