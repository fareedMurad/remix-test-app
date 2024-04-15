import {
  LiveReload,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import { type LoaderArgs, json } from "@remix-run/node";
import { isAuthenticated } from "../../session.server";

export const loader = async ({ request }: LoaderArgs) => {
  return json({ isAuthenticated: await isAuthenticated(request) });
};

export function makeApp({
  Document,
}: {
  Document: React.ComponentType<{ title?: string; children: React.ReactNode }>;
}) {
  function App() {
    return (
      <Document>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </Document>
    );
  }
  return App;
}

export function makeErrorBoundary({
  Document,
  PublicLayout,
}: {
  Document: React.ComponentType<{ title?: string; children: React.ReactNode }>;
  PublicLayout: React.ComponentType<{ children: React.ReactNode }>;
}) {
  function ErrorBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
      return (
        <Document title={error.statusText}>
          <PublicLayout>
            <h1>
              {error.status} {error.statusText}
            </h1>
            <p>{error.data}</p>
          </PublicLayout>
        </Document>
      );
    } else if (error instanceof Error) {
      return (
        <Document title="Error">
          <PublicLayout>
            <h1>Error</h1>
            <p>{error.message}</p>
            <p>The stack trace is:</p>
            <pre>{error.stack}</pre>
          </PublicLayout>
        </Document>
      );
    } else {
      return (
        <Document title="Error">
          <PublicLayout>
            <h1>Unknown Error</h1>
          </PublicLayout>
        </Document>
      );
    }
  }

  return ErrorBoundary;
}
