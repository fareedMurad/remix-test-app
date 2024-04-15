import { render, screen } from "@testing-library/react";
import Button, { type Properties } from ".";

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;

  test.each`
    roundedType                      | className
    ${"md" as Properties["rounded"]} | ${"rounded-xl"}
    ${"lg" as Properties["rounded"]} | ${"rounded-2xl"}
    ${"sm" as Properties["rounded"]} | ${"rounded"}
  `(
    "Button rounded $roundedType to have $className class",
    ({ roundedType, className }) => {
      render(<Button rounded={roundedType} />);

      const button = screen.getByRole("button");

      expect(button).toHaveClass(className);
    }
  );

  test('Button rounded "none" to have no rounded class', () => {
    render(<Button rounded="none" />);

    const button = screen.getByRole("button");

    expect(button.getAttribute("class")).not.toMatch(/rounded/);
  });
}
