import logo from './logo.svg';
import './App.css';
import ViewListing from './Components/Listing/ViewListing';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AllListings from './Components/Listing/AllListings';
function App() {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
        <Route path="/" component={AllListings} exact />
        <Route path="/view-listing/:id" component={ViewListing} exact />
        </Switch>
       
      </BrowserRouter>
    </div>
  );
}

export default App;
