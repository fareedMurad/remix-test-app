import { json } from "@remix-run/node";
import { unstable_createRemixStub as CreateRemixStub } from "@remix-run/testing";
import React from "react";

export const CustomRemixStub = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const RemixStub = CreateRemixStub([
    {
      path: "/",
      Component: () => <>{children}</>,
      loader() {
        return json({ some: "data" });
      },
    },
  ]);

  return (
    <RemixStub
      initialEntries={["/"]}
      initialIndex={0}
      hydrationData={{
        actionData: { some: "data" },
      }}
    />
  );
};
