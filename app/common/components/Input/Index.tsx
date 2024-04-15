import { forwardRef, type ComponentPropsWithoutRef } from "react";
import type { Option } from "../Select";
import Select from "../Select";

interface InputProps {
  className?: string;
  name?: string;
  id: string;
  placeholder?: string;
  type?: ComponentPropsWithoutRef<"input">["type"];
  autoComplete?: string;
  commonProps?: any;
  autoFocus?: boolean;
  ariaInvalid?: boolean;
  ariaDescribedby?: string;
  onChange?: ComponentPropsWithoutRef<"input">["onChange"];
  onKeyPress?: ComponentPropsWithoutRef<"input">["onKeyPress"];
  onKeyDown?: ComponentPropsWithoutRef<"input">["onKeyDown"];
  onKeyUp?: ComponentPropsWithoutRef<"input">["onKeyUp"];
  onBlur?: ComponentPropsWithoutRef<"input">["onBlur"];
  onFocus?: ComponentPropsWithoutRef<"input">["onFocus"];
  onChangeSelect?: (e: Option) => void;
  value?: ComponentPropsWithoutRef<"input">["value"] | Option;
  label?: string | JSX.Element;
  error?: string;
  labelClassName?: string;
  disabled?: boolean;
  isRequired?: boolean;
  as?: "input" | "select";
  options?: Array<Option>;
  getValues?: Function;
  hasArrow?: boolean;
  inputClassName?: string;
  optionsClassName?: string;
  optionClassName?: string;
  labelOptionClassName?: string;
  selectedLabelClassName?: string;
  arrowClassName?: string;
  isRemixField?: boolean;
  selectArrowDownIcon?: JSX.Element;
  defaultValue?: ComponentPropsWithoutRef<"input">["value"] | Option;
  hideSearch?: boolean;
  searchBoxClasses?: string;
  optionsListClasses?: string;
  notFoundClasses?: string;
}
const InputField = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    name,
    id,
    placeholder,
    type = "text",
    autoComplete,
    commonProps,
    autoFocus,
    ariaInvalid,
    ariaDescribedby,
    onChange,
    onChangeSelect,
    value,
    label,
    error,
    disabled,
    isRequired,
    as,
    options,
    getValues,
    hasArrow,
    labelClassName,
    inputClassName,
    optionsClassName,
    optionClassName,
    labelOptionClassName,
    selectedLabelClassName,
    arrowClassName,
    isRemixField = false,
    selectArrowDownIcon,
    defaultValue,
    hideSearch,
    searchBoxClasses,
    optionsListClasses,
    notFoundClasses,
    onKeyPress,
    onKeyDown,
    onKeyUp,
    onBlur,
    onFocus,
  } = props;

  if (type === "hidden") {
    return <input type="hidden" name={name} value={value as string} />;
  }
  if (as === "select") {
    return (
      <Select
        id={id}
        label={label}
        value={value as Option}
        onChange={onChangeSelect}
        options={options}
        getValues={getValues}
        hasArrow={hasArrow}
        arrowIcon={selectArrowDownIcon}
        labelClassName={labelClassName}
        inputClassName={inputClassName}
        optionsClassName={optionsClassName}
        optionClassName={optionClassName}
        labelOptionClassName={labelOptionClassName}
        error={error}
        placeholder={placeholder}
        selectedLabelClassName={selectedLabelClassName}
        required={isRequired}
        arrowClassName={arrowClassName}
        isRemixField={isRemixField}
        name={name}
        disabled={disabled}
        hideSearch={hideSearch}
        searchBoxClasses={searchBoxClasses}
        optionsListClasses={optionsListClasses}
        notFoundClasses={notFoundClasses}
      />
    );
  }

  return (
    <>
      <label htmlFor={id} className={labelClassName}>
        {label ?? ""}
        {isRequired && <span className="text-red">*</span>}
        {error && <span className="text-red">{error}</span>}
      </label>
      <input
        {...commonProps}
        ref={ref}
        name={name}
        id={id}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        type={type}
        autoComplete={autoComplete}
        className={className}
        autoFocus={autoFocus}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedby}
        disabled={disabled}
        required={isRequired}
        defaultValue={defaultValue}
        onKeyPress={onKeyPress}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </>
  );
});

InputField.displayName = "InputField";

export default InputField;
