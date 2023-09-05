import { Avatar, Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const SearchInput = (props) => {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [isError, setIsError] = useState(false);

  const searchLimit = 30;

  const handleInputChange = (val) => {
    if (val.length <= searchLimit) {
      setSearchInputValue(val);
    }
  };

  const handleChange = (val) => {
    if (!val) {
      props.setSearchedCurrency("");
    } else {
      props.setSearchedCurrency(val.symbol);
    }
  };

  useEffect(() => {
    const regex = /[^a-zA-Z0-9(). ]+/g;
    if (regex.test(searchInputValue)) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [searchInputValue]);

  return (
    <>
      <Autocomplete
        id="currency-select"
        options={props.currencies}
        getOptionLabel={(option) => option.FullName}
        inputValue={searchInputValue}
        onInputChange={(e, newVal) => handleInputChange(newVal)}
        onChange={(e, newVal) => handleChange(newVal)}
        renderOption={(props, option) => (
          <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
            {option.imageUrl ? <Avatar sx={{ marginRight: 2 }} src={option.imageUrl} /> : <Avatar sx={{ marginRight: 2, bgcolor: "#f6f6f6" }}> </Avatar>}
            {option.FullName}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            type="text"
            label={isError ? "Invalid input" : "Search for cryptocurrency"}
            error={isError}
            disabled={props.currencies.length < 1}
            variant="outlined"
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
