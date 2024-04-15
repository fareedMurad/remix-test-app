import { cn } from "../../utils/utils";
import Button from "../Button";

type SimpleSwitchProps<T extends string> = {
  value: T;
  onChange: (value: T) => void;
  label: string;
  options: T[];
};

function SimpleSwitch<T extends string>({
  options = [],
  value,
  onChange,
  label,
}: SimpleSwitchProps<T>) {
  return (
    <div className="font-Calibri flex items-baseline">
      <div className="text-black leading-tight whitespace-nowrap mr-5">
        {label}
      </div>
      {options.map((name) => (
        <Button
          key={name}
          className={cn(
            "px-2 border-b justify-start cursor-pointer bg-transparent py-0 h-fit text-base",
            {
              "border-green-500 text-black": value === name,
              "border-neutral-400 text-neutral-400": value !== name,
            }
          )}
          onClick={() => onChange(name)}
        >
          <span className="font-medium">{name}</span>
        </Button>
      ))}
    </div>
  );
}

export default SimpleSwitch;
