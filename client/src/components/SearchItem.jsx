import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import PropTypes from "prop-types";

import { useState } from "react";

const SearchItem = (props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Paper elevation={2} square sx={{ paddingX: "16px", paddingY: "8px" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={4}>
            <div>{props.searchedCurrency}</div>
          </Grid>
          <Grid item xs={4}>
            {props.loading ? <Skeleton variant="text" sx={{ fontSize: "1rem" }} /> : <div>{props.currencyPrice} $</div>}
          </Grid>
          <Grid item xs={4}>
            <Button variant="outlined" onClick={() => setExpanded(!expanded)}>
              Show price graph
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

SearchItem.propTypes = {
  searchedCurrency: PropTypes.string,
  currencyPrice: PropTypes.string,
  loading: PropTypes.bool,
};

export default SearchItem;
