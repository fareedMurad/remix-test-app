import { useLocation } from "@remix-run/react";
import { twMerge } from "tailwind-merge";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const isLargeContent = ["/public-challenge"].includes(location.pathname);

  return (
    <div className="flex flex-col">
      <main
        className={twMerge(
          "w-full grow",
          isLargeContent ? "bg-footerGradient" : ""
        )}
      >
        <div className="container mx-auto">{children}</div>
      </main>
    </div>
  );
}
