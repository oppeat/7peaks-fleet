import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Pagination from './Pagination';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
  paper: {
    margin: "1em",
    width: "auto",
  }
});

export default function DataTable(props) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { headers, attributes, timelineButton, rows, keyAttr, dateFilter, history } = props;
  var date = new Date();
  var defaultStartDate = new Date();
  date.setHours(23,59,59,999);
  defaultStartDate.setMonth(defaultStartDate.getMonth()-1);
  defaultStartDate.setHours(0,0,0,0);

  const [selectedDate, setSelectedDate] = React.useState(defaultStartDate);
  const [endDate, setEndDate] = React.useState(date);

  const handleDateChange = (date) => {
    date.setHours(0,0,0,0);
    setSelectedDate(date);
  };

  const handleEndDateChange = (date) => {
    date.setHours(23,59,59,999);
    setEndDate(date);
  };

  var emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleTimeline = (id) => {
    history.push("/coordinate/"+id);
    history.go();
  }

  var displayRows=[];
  if(dateFilter){
    displayRows = rows.filter(row => new Date(row.createDate) > selectedDate && new Date(row.createDate) < endDate)
    emptyRows = rowsPerPage - Math.min(rowsPerPage, displayRows.length - page * rowsPerPage);
  }
  else{
    displayRows = rows;
  }

  return (
    <TableContainer component={Paper} className={classes.paper} elevation={2}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          { dateFilter && <TableRow>
            <TableCell colSpan={headers?.length} style={{border:'none'}}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="flex-end" >
                  <KeyboardDatePicker style={{paddingLeft:".5em",paddingRight:".5em",width:"12em"}}
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="From Date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                  <KeyboardDatePicker style={{paddingLeft:".5em",paddingRight:".5em",width:"12em"}}
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="To Date"
                    value={endDate}
                    onChange={handleEndDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </TableCell>
          </TableRow> }
          <TableRow>
            {
              headers.map(x => {
                return <TableCell key={x}>{x}</TableCell>;
              })
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? displayRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : displayRows
          ).map((row) => (
            <TableRow key={row[keyAttr]}>
              {attributes.map(x => {
                return [<TableCell component="th" scope="row" key={x}>
                {row[x]}
              </TableCell>,
              timelineButton && <TableCell style={{ width: 160 }} align="right" key={row[x]}>
              <Button variant="contained" color="primary" style={{color:"white",backgroundColor:"#2196f3"}} onClick={() => handleTimeline(row[x])}>
                {"VIEW TIMELINE"}
              </Button>
              </TableCell>]
            })}
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={Pagination}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}