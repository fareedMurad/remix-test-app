import React from "react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "About page" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return <>About page!</>;
}
