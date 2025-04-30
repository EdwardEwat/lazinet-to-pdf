import React from "react";
import Login from "./components/Login/Login";
import TemplateToPDF from "./components/Template/TemplateToPDF";
import TypeOrder from "./components/TypeOrder/TypeOrder";
import { SelectedDataProvider } from "./components/SelectedDataContext/SelectedDataContext";
import "./App.css";

function App() {
  return (
    <SelectedDataProvider>
      <div className="app-container">
        <div className="left-column">
          <Login />
          <TypeOrder />
        </div>
        <div className="right-column">
          <TemplateToPDF />
        </div>
      </div>
    </SelectedDataProvider>
  );
}

export default App;