import { fireEvent, render, waitFor } from "@testing-library/react";
import Popover from ".";
import Button from "../Button";

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe("Popover", async () => {
    it("should render popover correctly", async () => {
      const triggerButton = <Button>Click me!</Button>;

      const content = <div>Popover panel content</div>;

      const { getByText } = render(
        <Popover triggerButton={triggerButton} content={content} />
      );

      const button = getByText("Click me!");
      expect(button).toBeVisible();

      fireEvent.click(button);

      const panelContent = getByText("Popover panel content");
      expect(panelContent).toBeVisible();
    });

    it("should render popover with className", () => {
      const triggerButton = <Button>Click me!</Button>;

      const content = <div>Popover panel content</div>;

      const { container } = render(
        <Popover
          triggerButton={triggerButton}
          content={content}
          className="custom-class"
        />
      );

      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("should render popover with triggerClassName", () => {
      const triggerButton = <>Click me!</>;

      const content = <div>Popover panel content</div>;

      const { getByText } = render(
        <Popover
          triggerButton={triggerButton}
          content={content}
          triggerClassName="custom-tigger-class"
        />
      );

      const triggerContent = getByText("Click me!");
      expect(triggerContent).toBeVisible();
      expect(triggerContent).toHaveClass("custom-tigger-class");
    });

    it("should render popover with panelClassName", () => {
      const triggerButton = <>Click me!</>;

      const content = <>Popover panel content</>;

      const { getByText } = render(
        <Popover
          triggerButton={triggerButton}
          content={content}
          panelClassName="custom-panel-class"
          customPlacement="left"
        />
      );

      const button = getByText("Click me!");
      expect(button).toBeVisible();

      fireEvent.click(button);

      const contentLabel = getByText("Popover panel content");
      expect(contentLabel).toBeVisible();
      expect(contentLabel).toHaveClass("custom-panel-class");
    });

    it("should render popover with customPlacement", async () => {
      const triggerButton = <>Click me!</>;

      const content = <>Popover panel content</>;

      const { getByText } = render(
        <Popover
          triggerButton={triggerButton}
          content={content}
          panelClassName="custom-panel-class"
          customPlacement="left"
        />
      );

      const button = getByText("Click me!");
      expect(button).toBeVisible();

      fireEvent.click(button);

      const contentLabel = getByText("Popover panel content");
      expect(contentLabel).toBeVisible();
      expect(contentLabel).toHaveClass("custom-panel-class");

      await waitFor(() =>
        expect(contentLabel).toHaveAttribute("data-popper-placement", "left")
      );
    });
  });
}
