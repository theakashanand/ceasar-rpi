import React from "react";

import logo from './logo.svg';
import './App.css';
import './style.css';

import Home from './components/Home';

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      
      <body>
        <div className="Banner">
          <h3 className="CompanyTitle">Welcome to CEASAR</h3>
          <br/>
          <h4>Controlled Environment Agriculture System with Automated Recording</h4>
          <Home></Home>
        </div>
        


      </body>

    </div>
  );
}

export default App;
