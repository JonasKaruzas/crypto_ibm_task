import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import PropTypes from "prop-types";

import { useEffect, useState } from "react";

const SearchItem = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [isPriceValid, setIsPriceValid] = useState(false);

  useEffect(() => {
    setIsPriceValid(() => (props.currencyPrice > 0 ? true : false));
  }, [props.currencyPrice]);

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4}>
          <div>{props.searchedCurrency}</div>
        </Grid>
        <Grid item xs={4}>
          {props.loading ? (
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          ) : (
            <div>{isPriceValid ? `${props.currencyPrice} $` : `Unable to find ${props.searchedCurrency}/USDT market price`}</div>
          )}
        </Grid>
        <Grid item xs={4}>
          <Button variant="outlined" onClick={() => props.setShowHistory(!props.showHistory)}>
            Show price graph
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

SearchItem.propTypes = {
  searchedCurrency: PropTypes.string,
  currencyPrice: PropTypes.number,
  loading: PropTypes.bool,
};

export default SearchItem;
