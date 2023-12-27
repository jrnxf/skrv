import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useMatches,
} from "@remix-run/react";
import clsx from "clsx";
import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  useTheme,
} from "remix-themes";

import { themeSessionResolver } from "./sessions.server";

import { useMemo } from "react";
import { Navbar } from "~/components/navbar";
import stylesheet from "~/globals.css";
import { supabase } from "~/lib/supabase";

export const links: LinksFunction = () => [
  ...(cssBundleHref
    ? [
        { rel: "stylesheet", href: cssBundleHref },
        { rel: "stylesheet", href: stylesheet },
      ]
    : [{ rel: "stylesheet", href: stylesheet }]),
];

// Return the theme from the session storage using the loader
export async function loader({ request }: LoaderFunctionArgs) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { getTheme } = await themeSessionResolver(request);
  return {
    theme: getTheme(),
    user,
  };
}
// Wrap your app with ThemeProvider.
// `specifiedTheme` is the stored theme in the session storage.
// `themeAction` is the action name that's used to change the theme in the session storage.
export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>();
  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      <App />
    </ThemeProvider>
  );
}

export function App() {
  const data = useLoaderData<typeof loader>();
  const [theme] = useTheme();
  return (
    <html lang="en" className={clsx(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
      </head>
      <MainLayout />
      <LiveReload />
    </html>
  );
}

export const useMatchesData = ({
  id,
}: {
  id: string;
}): Record<string, unknown> | undefined => {
  const matches = useMatches();

  const match = useMemo(
    () => matches.find((route) => route.id === id),
    [matches, id],
  );

  return match?.data as Record<string, unknown>;
};

export const useOptionalUser = (): any | undefined => {
  const rootData = useMatchesData({ id: "root" });

  if (!rootData || !rootData.user) {
    return undefined;
  }

  return rootData.user;
};

const MainLayout = () => {
  const user = useOptionalUser();
  return (
    <body className="min-h-dvh bg-white px-12 pb-12 text-black dark:bg-black dark:text-white">
      <Navbar />
      <pre>{JSON.stringify({ user }, null, 2)}</pre>
      <div className="w-80vw mx-auto max-w-3xl">
        <Outlet />
      </div>
      <ScrollRestoration />
      <Scripts />
    </body>
  );
};
