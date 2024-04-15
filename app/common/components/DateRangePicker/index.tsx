import { CustomCalendarContainer } from "@fareeds-remix-app/common/components/DateRangePicker/CustomCalendarContainer";
import { cn } from "@fareeds-remix-app/common/utils/utils";
import DatePicker, { type CalendarContainerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CircleArrowDown } from "./icons";

interface Props {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (dates: [Date | null, Date | null]) => void;
  className?: string;
  circleArrowDownClassName?: string;
  wrapperClassName?: string;
}

export const DateRangePicker: React.FC<Props> = (props) => {
  const {
    className,
    wrapperClassName,
    circleArrowDownClassName,
    ...restProps
  } = props;

  return (
    <div
      className={cn("relative w-fit drop-shadow-combobox", wrapperClassName)}
    >
      <DatePicker
        selectsRange={true}
        className={cn(
          "h-[30px] px-4 py-2 box-content bg-white font-Calibri text-base w-[250px] text-black",
          className
        )}
        dateFormat="dd MMM yyyy"
        popperPlacement="bottom"
        popperClassName="!p-0 w-full"
        calendarClassName="!border-none !rounded-none w-full"
        calendarContainer={(calendarProps: CalendarContainerProps) => (
          <CustomCalendarContainer
            {...calendarProps}
            startDate={props.startDate}
            endDate={props.endDate}
          />
        )}
        {...restProps}
      />
      <CircleArrowDown
        className={cn(
          "absolute top-1/2 right-4 -translate-y-2/4 text-primary",
          circleArrowDownClassName
        )}
      />
    </div>
  );
};
