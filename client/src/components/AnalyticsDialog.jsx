import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const AnalyticsDialog = (props) => {
  const { onClose, selectedValue, open } = props;
  const [searched, setSearched] = useState([]);
  const [selected, setSelected] = useState([]);

  const handleClose = () => {
    onClose(selectedValue);
  };

  useEffect(() => {
    const fetchSearchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/userSearch");

        if (!response.ok) {
          return;
        }

        const jsonData = await response.json();
        setSearched(jsonData);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSelectData = async () => {
      try {
        const response = await fetch("http://localhost:5000/userSelect");

        if (!response.ok) {
          return;
        }

        const jsonData = await response.json();
        setSelected(jsonData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSearchData();
    fetchSelectData();
  }, [open]);

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Analysis</DialogTitle>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} padding={2}>
        <Grid item xs={12} sm={6}>
          <TableContainer component={Paper} sx={{ minWidth: 200 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Searched</TableCell>
                  <TableCell align="right">Count</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {searched.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell component="th" scope="row">
                      {row._id}
                    </TableCell>
                    <TableCell align="right" component="th" scope="row">
                      {row.count}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TableContainer component={Paper} sx={{ minWidth: 200 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Selected</TableCell>
                  <TableCell align="right">Count</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selected.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell component="th" scope="row">
                      {row._id}
                    </TableCell>
                    <TableCell align="right" component="th" scope="row">
                      {row.count}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Dialog>
  );
};

AnalyticsDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  selectedValue: PropTypes.string,
};

export default AnalyticsDialog;
