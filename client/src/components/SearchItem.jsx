import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import PropTypes from "prop-types";
import TimelineIcon from "@mui/icons-material/Timeline";

import { useEffect, useState } from "react";
import { Avatar, Box } from "@mui/material";

const SearchItem = (props) => {
  const [isPriceValid, setIsPriceValid] = useState(false);

  useEffect(() => {
    setIsPriceValid(() => (props.currencyPrice > 0 ? true : false));
  }, [props.currencyPrice]);

  const filteredCurrencies = props.currencies.filter((item) => item.symbol === props.searchedCurrency);

  return (
    <>
      <Grid container rowSpacing={1} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Grid item xs={6} sm={4}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ marginRight: 2 }} src={filteredCurrencies[0].imageUrl} />
            <div>{filteredCurrencies[0].FullName}</div>
          </Box>
        </Grid>

        <Grid item xs={6} sm="auto">
          {props.loading ? (
            <Skeleton variant="text" sx={{ fontSize: "24px" }} />
          ) : (
            <div>{isPriceValid ? `${props.currencyPrice} $` : `Unable to find ${props.searchedCurrency}/USDT market price`}</div>
          )}
        </Grid>

        <Grid item xs={12} sm="auto" sx={{ display: "flex", justifyContent: "center" }}>
          {!props.showHistory && (
            <Button variant="outlined" onClick={() => props.setShowHistory(!props.showHistory)}>
              <TimelineIcon />
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  );
};

SearchItem.propTypes = {
  searchedCurrency: PropTypes.string,
  currencyPrice: PropTypes.number,
  loading: PropTypes.bool,
  showHistory: PropTypes.bool,
  setShowHistory: PropTypes.func,
  currencies: PropTypes.array,
};

export default SearchItem;
