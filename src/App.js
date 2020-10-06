import React from "react";
import Item from "./Item";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Pointer Events</h1>
      <p>Scrolling, Item Selection, and Crop Moving</p>
      <ul>
        {Array.from(Array(50)).map((_, i) => (
          <Item key={i} id={i} />
        ))}
      </ul>
    </div>
  );
}

export default App;
