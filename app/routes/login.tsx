import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Link } from "@remix-run/react";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

type FormData = z.infer<typeof formSchema>;

const resolver = zodResolver(formSchema);

export default function Login() {
  const form = useForm<FormData>({
    resolver,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit } = form;

  return (
    <div className="mx-auto max-w-sm">
      <FormProvider {...form}>
        <Form
          onSubmit={(event) => {
            handleSubmit((data, event) => {})(event);
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
