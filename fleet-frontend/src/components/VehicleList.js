import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DataTable from './DataTable';
import axios from "axios"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
  },
  bar:{
    backgroundColor: '#0d2c54',
  }
}));

// function createData(vehicleId) {
//   return { vehicleId };
// }

// // const rows = [
// //   createData("10001110000"),
// //   createData("10001110002"),
// //   createData("10001110004"),
// //   createData("10001110006"),
// //   createData("10001110008"),
// //   createData("20001110000"),
// //   createData("20001110002"),
// //   createData("20001110004"),
// //   createData("20001110006"),
// //   createData("20001110008"),
// //   createData("30001110000"),
// //   createData("30001110002"),
// //   createData("30001110004"),
// //   createData("30001110006"),
// //   createData("30001110008"),
// // ].sort((a, b) => (a.vehicleId < b.vehicleId ? -1 : 1));

const VehicleList = (props) =>{
  useEffect(() => getVehicles(), []);

  const classes = useStyles();
  const [records,setRecords] = useState([]);

  const getVehicles = () => {
    try {
      axios.get("http://localhost:9000/vehicle", {
        headers: {"Access-Control-Allow-Origin": "*"}
        ,responseType: 'json',
      }).then(response => {
        setRecords([...response.data])
     });

    } catch (error) {
      console.error(error)
    }
  }
  const rows = records.sort((a, b) => (a.createDate < b.createDate ? -1 : 1));;

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.bar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
          {"Vehicles"}
          </Typography>
        </Toolbar>
      </AppBar>
      <DataTable headers={["Vehicle ID"," "]} attributes={["vehicleId"]} keyAttr={"vehicleId"} timelineButton={true} rows={rows} history={props.history}/>
    </div>
  );
}

export default VehicleList;