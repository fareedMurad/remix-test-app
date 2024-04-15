interface InputProps {
  ref?: React.RefObject<HTMLInputElement>;
  className: string;
  name?: string;
  id: string;
  placeholder?: string;
  commonProps?: any;
  rows?: number;
  cols?: number;
  onChange?: Function;
  value?: string;
}

const TextareaField = (props: InputProps) => {
  const {
    ref,
    className,
    name,
    id,
    placeholder,
    commonProps,
    onChange,
    value,
    rows,
    cols,
  } = props;

  return (
    <textarea
      {...commonProps}
      ref={ref}
      name={name}
      id={id}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      className={className}
      rows={rows}
      cols={cols}
    />
  );
};

export default TextareaField;
