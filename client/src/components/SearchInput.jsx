import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const SearchInput = (props) => {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [isError, setIsError] = useState(false);

  const searchLimit = 30;

  const handleChange = (val) => {
    if (val.length <= searchLimit) {
      setSearchInputValue(val);
    }
  };

  useEffect(() => {
    const regex = /[^a-zA-Z0-9]+/g;
    if (regex.test(searchInputValue)) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [searchInputValue]);

  return (
    <>
      <Autocomplete
        inputValue={searchInputValue}
        onInputChange={(e, newVal) => handleChange(newVal)}
        onChange={(e, newVal) => props.setSearchedCurrency(newVal)}
        disablePortal
        id="combo-box-demo"
        options={props.currencies}
        renderInput={(params) => (
          <TextField
            {...params}
            type="text"
            label={isError ? "Invalid input" : "Search for cryptocurrency"}
            error={isError}
            disabled={props.currencies.length < 1}
            variant="filled"
            sx={{ backgroundColor: "white" }}
          />
        )}
      />
    </>
  );
};

SearchInput.propTypes = {
  setSearchedCurrency: PropTypes.func,
  currencies: PropTypes.array,
};

export default SearchInput;
