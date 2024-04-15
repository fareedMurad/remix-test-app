import {
  type Control,
  type Path,
  type FieldValues,
  Controller,
} from "react-hook-form";

interface Properties<C extends FieldValues> {
  label: string;
  control: Control<C>;
  name: Path<C>;
}

const CountryField = <C extends FieldValues = FieldValues>({
  label,
  control,
  name,
}: Properties<C>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => {
        return <></>;
      }}
    />
  );
};

export default CountryField;
