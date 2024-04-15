import { clsx, type ClassValue } from "clsx";
import type { RefObject } from "react";
import { createRef } from "react";
import type { FieldError, FieldValues } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import type { Option } from "../components/Select";
import type { Region } from "../models/common.server";
import type { Counter } from "../types";
import { vi } from "vitest";

export const formatDate = (date: Date | string, time = false) => {
  const value = typeof date === "string" ? new Date(date) : date;
  const withHours: Intl.DateTimeFormatOptions | {} = time
    ? {
        hour: "2-digit",
        minute: "2-digit",
      }
    : {};

  return Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
    ...withHours,
  }).format(value);
};

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

export const formatMoney = (summary: number | string) => {
  if (typeof summary == "string") {
    return !isNaN(+summary) ? formatter.format(+summary) : formatter.format(0);
  }

  return formatter.format(summary);
};

export const getErrorMessage = <T extends FieldValues>(
  errors: T,
  field: string
) => {
  const value = field
    .split(".")
    .reduce((prev, cur) => prev?.[cur], errors) as unknown as
    | FieldError
    | undefined;

  return value?.message;
};

export function downloadFile(url: string, filename: string) {
  const element = document.createElement("a");
  element.setAttribute("href", url);
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

export function handleCopyText(text: string) {
  if (navigator) navigator.clipboard.writeText(text);
}

export const numberWithCommas = (x: number = 0) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const hasError = (errorMessage?: string) => errorMessage?.trim()?.length;

export function range(n: number) {
  return Array.from({ length: n }, (_, i) => i);
}

export function handleCalcDifferenceTime(date: Date) {
  const now = new Date().getTime();
  const difference = date.getTime() - now;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return {
    difference,
    time: { days, hours, minutes, seconds },
  };
}

export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}

export function calcMilisecond(time: Counter) {
  return (
    time.days * 24 * 60 * 60 +
    time.hours * 60 * 60 +
    time.minutes * 60 +
    time.seconds
  );
}

export function handleImageError(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  image: string
) {
  e.currentTarget.src = image;
}

export function formatRegions(regions?: Region[]) {
  if (regions) {
    let formatedStates: Option[] = [];
    (regions as Region[]).forEach?.((region) =>
      formatedStates.push({
        value: region.regionCode,
        label: region.regionName,
        iso_code: region.regionCode,
      })
    );

    return formatedStates;
  }
  return [];
}

export function handleIfiniteScroll(
  container: RefObject<HTMLDivElement>,
  pageCount: number,
  pageIndex: number,
  callback: (nextPage: number) => void
) {
  if (container.current) {
    const { scrollTop, scrollHeight, clientHeight } = container.current;
    if (scrollTop + clientHeight + 200 >= scrollHeight) {
      const nextPageIndex = pageCount - 1;
      const nextPage = pageIndex + 1;
      if (nextPageIndex !== pageIndex) {
        callback(nextPage);
      }
    }
  }
}
export const randomNumberClientSide = (): number => {
  const buffer = new Uint32Array(1);
  window.crypto.getRandomValues(buffer);
  return buffer[0] / (0xffffffff + 1);
};

export const randomNumber = (): number => {
  const buffer = new Uint32Array(1);
  crypto.getRandomValues(buffer);
  return buffer[0] / (0xffffffff + 1);
};
