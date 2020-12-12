import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import VehicleList from './components/VehicleList'
import CoordinateList from './components/CoordinateList'
import { createBrowserHistory } from 'history'

function App() {
  const history = createBrowserHistory();
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route path="/coordinate/:itemId(.+)" render = {props => <CoordinateList {...props} history={history}/>} />
            <Route path="/" exact={true} render = {props => <VehicleList {...props} history={history}/>} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

