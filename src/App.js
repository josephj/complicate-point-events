import React from "react";
import Item from "./Item";
import "pepjs";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="Wrapper">
        <h1>Pointer Events</h1>
        <p>Scrolling, Item Selection, and Crop Moving (150ms)</p>
        <ul>
          {Array.from(Array(50)).map((_, i) => (
            <Item key={`Item-${i}`} id={i} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
