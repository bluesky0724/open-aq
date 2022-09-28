import react, { useEffect, useState } from "react";
import {
  getCities,
  getCountries,
  getLatestMeasurements,
  getParameters,
} from "../utils/openaq-api";

import {
  Autocomplete,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  City,
  Country,
  Measurement,
  MeasurementInfo,
  Parameter,
} from "../models/types";
import { Container } from "@mui/system";

const AQComparePage = () => {
  const [countries, setCountries] = useState<Array<Country>>([]);
  const [cities, setCities] = useState<Array<City>>([]);
  const [measurements, setMeasurements] = useState<Array<Measurement>>([]);
  const [measurementData, setMeasurementData] = useState<
    Array<MeasurementInfo>
  >([]);

  const [selectedCountry, setSelectedCountry] = useState<string>("US");
  const [selectedCity, setSelectedCity] = useState<string>("");

  const fetchCountry = async () => {
    let countries = await getCountries();
    setCountries(countries);
  };

  const fetchCities = async () => {
    let cities: Array<City> = await getCities(selectedCountry);

    setSelectedCity(cities[0]?.city);
    setCities(cities);
  };

  const calcAvg = (arr: Array<MeasurementInfo>) => {
    let sum = 0;
    if (arr.length === 0) return 0;
    arr.forEach((eletment) => {
      sum += eletment.value;
    });
    return sum / arr.length;
  };

  const fetchMeasurementData = async () => {
    let measurements: Array<Measurement> = await getLatestMeasurements(
      selectedCountry,
      selectedCity
    );

    setMeasurements(measurements);
    let measureMap = new Map<string, Array<number>>();
    measurements.map((measurement) => {
      measurement.measurements.map((element) => {
        let temp = measureMap.get(element.parameter);
        if (temp === undefined) temp = new Array<number>();
        temp.push(element.value);
        measureMap.set(element.parameter, temp);
      });
    });

    let measArray: Array<MeasurementInfo> = [];

    measurements.map((element) => {
      measArray = measArray.concat(element.measurements);
    });

    console.log("concat array is", measArray);

    let parameters: Array<Parameter> = await getParameters();

    let newArray: Array<MeasurementInfo> = [];

    newArray = await parameters.map((parameter) => {
      let arr = measArray.filter(
        (element) => element.parameter === parameter.name
      );

      return {
        parameter: parameter.name,
        lastUpdated: new Date(),
        unit: parameter.preferredUnit,
        value: calcAvg(arr),
      };
    });

    setMeasurementData(newArray);

    console.log("new array is", newArray);
  };

  useEffect(() => {
    fetchCountry();
    fetchCities();
  }, []);

  useEffect(() => {
    fetchCities();
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCity !== "") fetchMeasurementData();
  }, [selectedCity]);

  return (
    <div>
      <div style={{ marginTop: "2rem" }}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={countries.map((country) => country.code)}
          sx={{ width: 300 }}
          blurOnSelect
          value={selectedCountry}
          onInputChange={(
            event: React.SyntheticEvent,
            value: string,
            reason: string
          ) => {
            setSelectedCountry(value);
          }}
          renderInput={(params) => <TextField {...params} label="Country" />}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo2"
          options={cities.map((city) => city.city)}
          sx={{ width: 300 }}
          blurOnSelect
          value={selectedCity}
          onInputChange={(
            event: React.SyntheticEvent,
            value: string,
            reason: string
          ) => {
            setSelectedCity(value);
          }}
          renderInput={(params) => <TextField {...params} label="City" />}
        />
      </div>

      <div>
        <TableContainer component={Paper} style={{ width: "auto" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Parameter</TableCell>
                <TableCell align="right">Value</TableCell>
                <TableCell align="right">Unit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {measurementData.map((row) => (
                <TableRow
                  key={row.parameter}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.parameter}
                  </TableCell>
                  <TableCell align="right">{row.value}</TableCell>
                  <TableCell align="right">{row.unit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default AQComparePage;
