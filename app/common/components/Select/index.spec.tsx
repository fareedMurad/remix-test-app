import { fireEvent, render } from "@testing-library/react";
import Select from ".";

const options = [
  {
    label: "Option 1",
    value: "option_1",
  },
  {
    label: "Option 2",
    value: "option_2",
  },
  {
    label: "Option 3",
    value: "option_3",
  },
  {
    label: "Option 4",
    value: "option_4",
  },
  {
    label: "Option 5",
    value: "option_5",
  },
  {
    label: "Option 6",
    value: "option_6",
  },
];

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe("<Select />", () => {
    it("render correctly", async () => {
      const wrapper = render(
        <Select
          value={options[0]}
          options={options}
          isRemixField
          selectedLabelClassName="custom-class"
        />
      );
      expect(wrapper).toBeTruthy();

      const { getByTestId } = wrapper;

      const selectBtn = getByTestId("select-dropdown");
      expect(selectBtn).toBeInTheDocument();
    });

    it("render correctly with search input", async () => {
      const wrapper = render(
        <Select value={options[0]} options={options} hideSearch={false} />
      );
      expect(wrapper).toBeTruthy();

      const { getByPlaceholderText, getByTestId } = wrapper;

      const selectBtn = getByTestId("select-dropdown");
      expect(selectBtn).toBeInTheDocument();

      fireEvent.click(selectBtn);

      expect(getByTestId(`option-id-${options[0].label}`));
      expect(getByTestId(`option-id-${options[1].label}`));
      expect(getByTestId(`option-id-${options[2].label}`));

      const inputSearch = getByPlaceholderText("Search");
      expect(inputSearch).toBeInTheDocument();

      fireEvent.change(inputSearch, { target: { value: "option 7" } });
    });
  });
}
