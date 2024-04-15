import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tooltip from "./Tooltip";

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;

  test("Tooltip", async () => {
    render(
      <Tooltip options={{ delayDuration: 0 }} content="I'm hidden content">
        Hover me
      </Tooltip>
    );

    expect(screen.queryByText("Hover me")).toBeInTheDocument();

    userEvent.hover(screen.getByText("Hover me"));

    expect(await screen.findByRole("tooltip")).toBeInTheDocument();
    expect(screen.queryByRole("tooltip")).toHaveTextContent(
      "I'm hidden content"
    );
  });
}
