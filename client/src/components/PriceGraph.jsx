import { Box, Divider, Grid, InputLabel, MenuItem, Paper, Select, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

const PriceGraph = (props) => {
  const [timeframes, setTimeframes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currencyHistory, setCurrencyHistory] = useState([]);
  const [timeframe, setTimeframe] = useState("");
  const [dataPointLimit, setDataPointLimit] = useState(3);

  useEffect(() => {
    const fetchTimeframes = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/getTimeframes`);
        if (!response.ok) {
          throw new Error("Failed");
        }

        const jsonData = await response.json();
        setTimeframes(Object.keys(jsonData));
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchTimeframes();
  }, []);

  useEffect(() => {
    if (!timeframe) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/getCurrencyHistoryPrices?curr=${props.searchedCurrency}&timeframe=${timeframe}&limit=${dataPointLimit}`
        );
        if (!response.ok) {
          throw new Error("Failed");
        }

        const jsonData = await response.json();

        setCurrencyHistory(jsonData.map((item) => ({ date: new Date(item[0]), price: item[1] })));
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [timeframe, dataPointLimit]);

  const transformX = (val) => {
    return new Date(val).toLocaleDateString() + " " + new Date(val).toLocaleTimeString();
  };

  return (
    <>
      <Divider sx={{ paddingTop: 1 }} />
      <Grid container justifyContent="space-between" className="price-graph">
        <Grid item xs={4}>
          <InputLabel id="range-label">Data range</InputLabel>
          {loading ? (
            <Skeleton variant="rectangular" width={"100%"} height={56} />
          ) : (
            <Select labelId="range-label" id="range-select" value={timeframe} onChange={(e) => setTimeframe(e.target.value)} sx={{ width: "100%" }}>
              {timeframes.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          )}
        </Grid>

        <Grid item xs={4}>
          <InputLabel id="data-point-label" sx={{ float: "right}" }}>
            Data points
          </InputLabel>
          {loading ? (
            <Skeleton variant="rectangular" width={"100%"} height={56} />
          ) : (
            <Select
              labelId="data-point-label"
              id="data-point-select"
              value={dataPointLimit}
              onChange={(e) => setDataPointLimit(e.target.value)}
              sx={{ width: "100%" }}
            >
              {Array.from({ length: 40 }, (x, i) => i + 1).map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          )}
        </Grid>
      </Grid>

      {currencyHistory.length === 0 ? (
        <Typography paddingTop={3} textAlign={"center"} color={"#02B2AF"}>
          Please select data range
        </Typography>
      ) : (
        <Box sx={{ display: "flex" }}>
          <LineChart
            xAxis={[{ dataKey: "date", valueFormatter: (val) => transformX(val) }]}
            series={[{ dataKey: "price" }]}
            height={350}
            dataset={currencyHistory}
            margin={{ top: 10, bottom: 10, left: 45, right: 0 }}
            sx={{
              paddingY: 1,
              [`.${axisClasses.bottom}`]: {
                [`.${axisClasses.tickLabel}`]: {
                  display: "none",
                },
                [`.${axisClasses.tickContainer}`]: {
                  display: "none",
                },
              },
            }}
          />
        </Box>
      )}
    </>
  );
};

export default PriceGraph;
