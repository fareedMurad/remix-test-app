import { render } from "@testing-library/react";
import { TabItem } from "./TabItem";
import { Tab } from "@headlessui/react";

if (import.meta.vitest) {
  test("<TabItem />", () => {
    const wrapper = render(
      <Tab.Group>
        <TabItem label="Profile" />
      </Tab.Group>
    );

    expect(wrapper).toBeTruthy();

    const { getByText } = wrapper;
    const tabName = getByText("Profile");
    expect(tabName).toBeInTheDocument();
  });
}
