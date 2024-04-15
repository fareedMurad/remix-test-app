import { cn } from "../../utils/utils";
import * as SwitchRadix from "@radix-ui/react-switch";

type SwitchProps = {
  className?: string;
  label?: string;
  onChange?: (value: boolean) => void;
  value?: boolean;
};

function Switch({ className, label, onChange, value }: SwitchProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <SwitchRadix.Root
        className="w-16 h-8 bg-neutral-200 !rounded-full relative data-[state=checked]:bg-primary outline-none cursor-pointer"
        checked={value}
        onCheckedChange={onChange}
      >
        <SwitchRadix.Thumb className="block w-6 h-6 bg-white !rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[38px]" />
      </SwitchRadix.Root>
      <label className="text-black text-base font-medium font-Calibri leading-tight pl-2.5">
        {label}
      </label>
    </div>
  );
}

export default Switch;
