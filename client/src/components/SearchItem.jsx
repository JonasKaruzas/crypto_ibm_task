import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import PropTypes from "prop-types";

import { useEffect, useState } from "react";

const SearchItem = (props) => {
  const [isPriceValid, setIsPriceValid] = useState(false);

  useEffect(() => {
    setIsPriceValid(() => (props.currencyPrice > 0 ? true : false));
  }, [props.currencyPrice]);

  return (
    <>
      <Grid container alignItems="center">
        <Grid item xs={4}>
          <div>{props.searchedCurrency}</div>
        </Grid>

        <Grid item xs={4}>
          {props.loading ? (
            <Skeleton variant="text" sx={{ fontSize: "24px" }} />
          ) : (
            <div>{isPriceValid ? `${props.currencyPrice} $` : `Unable to find ${props.searchedCurrency}/USDT market price`}</div>
          )}
        </Grid>

        <Grid item xs={4}>
          {!props.showHistory && (
            <Button variant="outlined" onClick={() => props.setShowHistory(!props.showHistory)}>
              Show price graph
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
};

export default SearchItem;
