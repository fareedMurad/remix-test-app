import { Combobox as BaseCombobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { twMerge } from "tailwind-merge";

type Option<T> = {
  value: T;
  label: string;
};

type ComboboxProps<T> = {
  label: string;
  onChange: (value: T) => void;
  options: Option<T>[];
  value: T;
  getKey?: (option: Option<T>) => string;
  btnLabelClasses?: string;
  className?: string;
  btnClassName?: string;
  optionLabelClassName?: string;
  externalChevronIcon?: JSX.Element;
};

const Combobox = <T,>({
  label,
  onChange,
  options,
  value,
  getKey,
  btnLabelClasses = "text-gray",
  className = "bg-white",
  btnClassName,
  optionLabelClassName,
  externalChevronIcon,
}: ComboboxProps<T>) => {
  const keyGetter = getKey ?? ((option: Option<T>) => option.value + "");

  return (
    <BaseCombobox
      value={options.find((option) => option.value === value)}
      onChange={(v) => onChange(v.value)}
    >
      <BaseCombobox.Label className="whitespace-nowrap text-xs lg:text-xl font-semibold text-black">
        {label}
      </BaseCombobox.Label>

      <div className="relative mt-1 w-full">
        <div
          className={twMerge(
            "relative w-full cursor-default overflow-hidden rounded-[5px] border border-neutral-400 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm",
            className
          )}
        >
          <BaseCombobox.Button
            className={twMerge(
              "inset-y-0 right-0 flex w-full items-center pr-2",
              btnClassName
            )}
          >
            <div
              className={twMerge(
                "w-full border-none py-2 pl-3 pr-10 text-left text-sm leading-5 focus:ring-0",
                btnLabelClasses
              )}
            >
              {options.find((option) => option.value === value)?.label}
            </div>
            {externalChevronIcon ? (
              externalChevronIcon
            ) : (
              <ChevronDownIcon className="w-5 h-5 text-gray" />
            )}
          </BaseCombobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <BaseCombobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((option) => (
              <BaseCombobox.Option
                key={keyGetter(option)}
                className={({ active }) =>
                  `relative select-none py-2 pl-10 pr-4 cursor-pointer ${
                    active ? "bg-darknavy text-white" : "text-gray"
                  }`
                }
                value={option}
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      } ${optionLabelClassName}`}
                    >
                      {option.label}
                    </span>
                    {selected ? (
                      <span
                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                          active ? "text-white" : "text-darknavy"
                        }`}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </BaseCombobox.Option>
            ))}
          </BaseCombobox.Options>
        </Transition>
      </div>
    </BaseCombobox>
  );
};

export default Combobox;
