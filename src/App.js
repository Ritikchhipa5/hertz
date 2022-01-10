import "./App.css";
import React, { useEffect } from "react";
import { store } from "./Redux/store";
import Routers from "./Router/route";
import allFunction from "./Services/allFunction";

function App() {
  useEffect(() => {
    allFunction();
  }, []);
  return (
    <div className="App">
      <Routers />
      <button
        onClick={() => {
          console.log(store.getState());
        }}
      >
        Click me
      </button>
    </div>
  );
}

export default App;
