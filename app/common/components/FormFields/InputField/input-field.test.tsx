import { render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import InputField from "./index";

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe("InputField", () => {
    it("renders label and input", () => {
      const form = renderHook(() => useForm());
      const { control } = form.result.current;
      render(
        <InputField
          control={control}
          name="test"
          label="Test Label"
          placeholder="Test Placeholder"
        />
      );

      expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Test Placeholder")
      ).toBeInTheDocument();
    });

    it("disables input when disabled prop is true", async () => {
      const form = renderHook(() => useForm());
      const { control } = form.result.current;
      render(
        <InputField control={control} name="test" label="Test Label" disabled />
      );

      const input = screen.getByLabelText("Test Label");
      await userEvent.type(input, "test value");
      expect(input).toHaveValue("");
      expect(input).toBeDisabled();
    });
  });
}
