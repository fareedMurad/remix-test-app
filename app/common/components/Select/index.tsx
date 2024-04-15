import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { Fragment, ReactNode, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import InputField from "../Input/Index";
import { InputSuffix } from "../InputSuffix/InputSuffix";

export type Option = {
  id?: string | number;
  label: string | number;
  value: string | number;
  dial_code?: string | number;
  iso_code?: string | number;
  states?: string[];
  icon?: string | ReactNode;
};

export type SelectProps = {
  options?: Array<Option>;
  error?: string;
  getValues?: Function;
  placeholder?: string;
  value?: Option;
  id?: string;
  onChange?: (e: Option) => void;
  hasArrow?: boolean;
  arrowIcon?: JSX.Element;
  label?: string | JSX.Element;
  labelClassName?: string;
  inputClassName?: string;
  optionsClassName?: string;
  optionClassName?: string;
  labelOptionClassName?: string;
  selectedLabelClassName?: string;
  className?: string;
  isRemixField?: boolean;
  name?: string;
  arrowClassName?: string;
  required?: boolean;
  disabled?: boolean;
  hideSearch?: boolean;
  searchBoxClasses?: string;
  optionsListClasses?: string;
  notFoundClasses?: string;
};

const Select = ({
  options = [],
  error,
  placeholder,
  value,
  id,
  onChange,
  hasArrow = true,
  arrowIcon,
  label,
  arrowClassName,
  labelClassName,
  inputClassName,
  optionsClassName,
  optionClassName,
  labelOptionClassName,
  className,
  isRemixField = false,
  name,
  selectedLabelClassName,
  required,
  disabled,
  hideSearch = true,
  searchBoxClasses,
  optionsListClasses,
  notFoundClasses,
}: SelectProps) => {
  const [selectArrow, setSelectArrow] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const filterOptions = useMemo(
    () =>
      hideSearch
        ? options
        : options.filter((option) =>
            option.label
              .toString()
              .trim()
              .toLowerCase()
              .includes(searchValue.trim().toLowerCase())
          ),
    [hideSearch, options, searchValue]
  );

  return (
    <div className={twMerge("", className)}>
      <label
        htmlFor={id}
        className={twMerge("flex gap-2 lg:gap-1", labelClassName)}
      >
        {label}
        {required && <span className="text-red p-0">*</span>}
        {error && <span className="text-red">{error}</span>}
      </label>
      <Listbox
        disabled={disabled}
        value={value}
        name="Listbox"
        onChange={(option: Option) => {
          onChange?.(option);
          setSelectArrow(false);
        }}
      >
        <div className="relative">
          {isRemixField && (
            <InputField
              type={"hidden"}
              id={id ?? ""}
              name={name}
              key={name}
              value={value?.value}
            />
          )}
          <Listbox.Button
            onClick={() => setSelectArrow(!selectArrow)}
            data-testid="select-dropdown"
            className={twMerge(
              "Listbox relative w-full bg-eerieBlack border-opacity-80 focus:outline-none text-sm font-normal h-12 3xl:h-[89px] py-2 px-2 text-left cursor-pointer border-primary flex justify-between items-center",
              inputClassName
            )}
          >
            <span className={twMerge("block truncate", selectedLabelClassName)}>
              {value ? value.label : placeholder}
            </span>
            {hasArrow && arrowIcon ? (
              arrowIcon
            ) : hasArrow ? (
              <span
                className={twMerge(
                  "pointer-events-none inset-y-0 flex items-center pr-2",
                  arrowClassName
                )}
              >
                {selectArrow ? (
                  <ChevronUpIcon
                    width={20}
                    height={20}
                    aria-hidden="true"
                    className="fill-current"
                  />
                ) : (
                  <ChevronDownIcon
                    width={20}
                    height={20}
                    aria-hidden="true"
                    className="fill-current"
                  />
                )}
              </span>
            ) : null}
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setSearchValue("")}
          >
            <Listbox.Options
              className={twMerge("Listbox--options", optionsClassName)}
            >
              {!hideSearch && options.length > 5 && (
                <div className="w-full p-1">
                  <InputSuffix
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search"
                    suffix={<></>}
                    inputClassName={twMerge(
                      "pl-4 !h-8 !text-sm !text-white !font-normal border-white rounded bg-transparent focus:outline-none placeholder:text-white placeholder:text-opacity-50",
                      searchBoxClasses
                    )}
                  />
                </div>
              )}
              {filterOptions.length === 0 ? (
                <p
                  className={twMerge("text-white text-center", notFoundClasses)}
                >
                  Not found.
                </p>
              ) : (
                <div className={twMerge("overflow-auto", optionsListClasses)}>
                  {filterOptions.map((object, index) => (
                    <Listbox.Option
                      key={index}
                      data-testid={`option-id-${object.label}`}
                      className={({ active }) =>
                        twMerge(
                          "Listbox--option relative cursor-default select-none",
                          active ? "active--option" : "",
                          optionClassName
                        )
                      }
                      value={object}
                    >
                      {() => (
                        <>
                          <span
                            className={twMerge(
                              "block truncate",
                              labelOptionClassName
                            )}
                          >
                            {object.label}
                          </span>
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </div>
              )}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default Select;
