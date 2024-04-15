import React from "react";
import { CalendarContainer } from "react-datepicker";
import { formatDate } from "@fareeds-remix-app/common/utils/utils";
import CalendarIcon from "@fareeds-remix-app/common/assets/icons/calendar.svg";

interface Props {
  className?: string;
  children?: React.ReactNode;
  startDate?: Date | null;
  endDate?: Date | null;
}

export const CustomCalendarContainer: React.FC<Props> = ({
  className,
  startDate,
  endDate,
  children,
}) => {
  return (
    <div className="bg-white w-full">
      <div className="flex flex-col gap-y-1.5 py-1.5">
        <div className="p-1.5 flex items-center justify-between w-[208px] mx-auto bg-aliceWhite">
          <span className="font-Calibri text-xs">
            {startDate ? formatDate(startDate) : ""}
          </span>
          <img src={CalendarIcon} alt="" className="text-black w-3.5" />
        </div>
        <div className="p-1.5 flex items-center justify-between w-[208px] mx-auto bg-aliceWhite">
          <span className="font-Calibri text-xs">
            {endDate ? formatDate(endDate) : ""}
          </span>
          <img src={CalendarIcon} alt="" className="text-black w-3.5" />
        </div>
      </div>

      <CalendarContainer className={className} showPopperArrow={false}>
        {children}
      </CalendarContainer>
    </div>
  );
};
