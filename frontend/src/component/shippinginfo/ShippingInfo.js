import React, { useState } from "react";
import { Country, State, City } from "country-state-city";

import {
  InputLabel,
  Select,
  MenuItem,
  Box,
  FormControl,
  TextField,
} from "@mui/material";
import StepForOrder from "../step/StepForOrder";
import { useNavigate } from "react-router-dom";

function ShippingInfo() {
  const shippinginfo = JSON.parse(localStorage.getItem("shippinginfo")) || [];
  //   console.log(shippinginfo);
  const [address, setAddress] = useState(shippinginfo.address);
  const [state, setState] = useState(shippinginfo.state);
  const [country, setcountry] = useState(shippinginfo.country);
  const [city, setCity] = useState(shippinginfo.city);
  const [error, setError] = useState(false);
  const [mobileNumber, setMobileNumber] = useState(shippinginfo.mobileNumber);

  const navigate = useNavigate();

  const handleInput = (e) => {};

  const handleSubmit = (event) => {
    event.preventDefault();

    if (mobileNumber.trim() === "" || address.trim() === "") {
      setError(true);
    } else {
      if (mobileNumber.length === 10) {
        localStorage.setItem(
          "shippinginfo",
          JSON.stringify({
            address,
            mobileNumber,
            country,
            state,
            city,
          })
        );
        setAddress("");
        setCity("");
        setcountry("");
        setMobileNumber("");
        setState("");

        navigate("/order/confirm");
      } else {
        setError(true);
      }
    }
  };

  return (
    <>
      <StepForOrder step={0} />
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto  mt-[20px] max-[600px]:pl-[10px] max-[600px]:pr-[10px] "
      >
        <div className="mb-[20px]">
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              {error ? (
                <TextField
                  error
                  id="address"
                  label="address"
                  variant="outlined"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  helperText="plese enter address"
                />
              ) : (
                <TextField
                  id="address"
                  label="address"
                  variant="outlined"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />
              )}
            </FormControl>

            <div className="mt-[20px]">
              <FormControl fullWidth>
                {error ? (
                  <TextField
                    error
                    id="mobileNumber"
                    label="mobileNumber"
                    variant="outlined"
                    onChange={(e) => setMobileNumber(e.target.value)}
                    value={mobileNumber}
                    helperText="mobile number must be 10 digit."
                  />
                ) : (
                  <TextField
                    id="mobileNumber"
                    label="mobileNumber"
                    variant="outlined"
                    onChange={(e) => setMobileNumber(e.target.value)}
                    value={mobileNumber}
                  />
                )}
              </FormControl>
            </div>

            <div className="mt-[20px]">
              <FormControl fullWidth>
                <InputLabel id="country">Country</InputLabel>
                <Select
                  labelId="country"
                  id="country"
                  value={country}
                  label="Country"
                  onChange={(e) => setcountry(e.target.value)}
                >
                  {Country.getAllCountries().map((country) => (
                    <MenuItem value={country.isoCode} key={country.name}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="mt-[20px]">
              <FormControl fullWidth>
                <InputLabel id="state">state</InputLabel>
                <Select
                  labelId="state"
                  id="state"
                  value={state}
                  label="State"
                  onChange={(e) => setState(e.target.value)}
                >
                  {country &&
                    State.getStatesOfCountry(country).map((country) => (
                      <MenuItem value={country.isoCode} key={country.name}>
                        {country.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>

            <div className="mt-[20px]">
              <FormControl fullWidth>
                <InputLabel id="City">City</InputLabel>
                <Select
                  labelId="City"
                  id="City"
                  value={city}
                  label="City"
                  onChange={(e) => setCity(e.target.value)}
                >
                  {state &&
                    City.getCitiesOfState(country, state).map((country) => (
                      <MenuItem value={country.name} key={country.name}>
                        {country.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
          </Box>
        </div>

        <div className="w-[100%] flex justify-center ">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 w-[50%] rounded-full"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default ShippingInfo;
