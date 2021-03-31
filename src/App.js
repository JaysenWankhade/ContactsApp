import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ContactsMaster from "./components/contacts-master";
import ContactDetails from "./components/contact-details";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/ContactDetails/:id" component={ContactDetails} />
          <Route path="/" component={ContactsMaster} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
