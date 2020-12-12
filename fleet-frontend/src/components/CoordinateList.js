import { useState, useEffect } from 'react'
import axios from "axios"
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import DataTable from './DataTable';

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
  },
  backDiv:{
    textAlign: 'start',
  },
  backBtn:{
    margin: ".5em"
  }
}));

// function createData(lat,lon,date,id) {
//   return { lat,lon,date,id };
// }

// const rows = [
//   createData("100.1","89.2","09/13/2020",1),
//   createData("101.1","34.2231","10/13/2020",2),
//   createData("100.1","89.2","11/13/2020",3),
//   createData("132.1","74.2","12/13/2020",4),
//   createData("128.1","103.298","14/13/2020",5),
//   createData("100.1","89.2","15/13/2020",6),
// ].sort((a, b) => (a.date < b.date ? -1 : 1));

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [day, month, year].join('/');
}

const CoordinateList = (props) =>{
  useEffect(() => getLocations(), []);
  const classes = useStyles();
  const {history} = props;
  const currentId = props.match.params.itemId;

  const [records,setRecords] = useState([]);

  const getLocations = () => {
    try {
      axios.get("http://localhost:9000/vehicle/position/"+currentId, {
        headers: {"Access-Control-Allow-Origin": "*"}
        ,responseType: 'json',
      }).then(response => {
        setRecords([...response.data])
     });

    } catch (error) {
      console.error(error)
    }
  }
  const rows = records.map(record => ({...record,date: formatDate(Date(record.createDate))}) ).sort((a, b) => (a.date < b.date ? -1 : 1));

  function goBack(){
    history.back();
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.bar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
          {"Vehicle ID: "+currentId}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.backDiv}>
        <Button color="primary" startIcon={<KeyboardBackspaceIcon />} className={classes.backBtn} onClick={goBack}>Back</Button>
      </div>
      <DataTable headers={["Latitude","Longitude","Recorded Date"]} attributes={["latitude","longitude","date"]} keyAttr={"id"} dateFilter={true} rows={rows} history={props.history}/>
    </div>
  );
}

export default CoordinateList;