import type { JSONResponse } from "./api.server";
import { api } from "./api.server";

export interface Region {
  regionName: string;
  regionCode: string;
}

export async function getRegionsByCountry(
  countryCode: string
): Promise<JSONResponse> {
  const regions = await api
    .get(`regions/country/${countryCode}`)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });

  return regions;
}
