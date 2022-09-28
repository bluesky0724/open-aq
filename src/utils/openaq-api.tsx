import { Country } from "../models/types";
import axios from "axios";

const baseUrl = "https://api.openaq.org/v2/";

export const getCountries = async () => {
  const response = await axios.get(
    baseUrl + `countries?limit=300&page=1&offset=0&sort=asc&order_by=country`
  );
  return response.data.results;
};

export const getCities = async (countryCode: String) => {
  const response = await axios.get(baseUrl + `cities`, {
    params: {
      limit: 100,
      page: 1,
      offset: 0,
      sort: "asc",
      order_by: "city",
      country: countryCode,
    },
  });

  console.log("cities are", response.data.results);
  return response.data.results;
};

export const getLatestMeasurements = async (
  countryCode: string,
  city: string
) => {
  const response = await axios.get(baseUrl + "latest", {
    params: {
      limit: 100,
      page: 1,
      offset: 0,
      sort: "asc",
      order_by: "lastUpdated",
      country: countryCode,
      city: city,
    },
  });
  return response.data.results;
};

export const getParameters = async () => {
  const response = await axios.get(baseUrl + "parameters", {
    params: {
        limit: 100,
      page: 1,
      offset: 0,
      sort: "asc",
      order_by: "id",
    }
  });
  return response.data.results;
};
