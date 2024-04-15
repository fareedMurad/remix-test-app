import { render } from "@testing-library/react";
import { CustomRemixStub } from ".";

if (import.meta.vitest) {
  test("CustomRemixStub renders correctly", async () => {
    // Render CustomRemixStub with the RemixStub
    const wrapper = render(
      <CustomRemixStub>
        <div>test-content</div>
      </CustomRemixStub>
    );

    // Assert that the content from the Component in RemixStub is rendered
    const testContent = wrapper.getByText("test-content");
    expect(testContent).toBeInTheDocument();
  });
}
