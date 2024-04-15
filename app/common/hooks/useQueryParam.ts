import { useSearchParams } from "@remix-run/react";
import { useCallback } from "react";

export function useQueryParam(key: string, defaultValue: string = "") {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedType = searchParams.get(key);

  const setParam = useCallback(
    (value: string) => {
      setSearchParams({ [key]: value });
    },
    [setSearchParams, key]
  );

  return [selectedType ?? defaultValue, setParam] as const;
}
