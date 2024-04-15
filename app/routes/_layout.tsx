import { Outlet } from "@remix-run/react";

import PublicLayout from "~/components/PublicLayout";

export default function PublicRootLayout() {
  return (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  );
}
