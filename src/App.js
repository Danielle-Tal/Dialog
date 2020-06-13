import React, { useRef, useState} from "react";
import "./App.css";
import Dialog from "./components/Dialog";
import Content from "./components/content";

function App() {
  const dialogRef = useRef();
  const [count, setCount] = useState(0);
  const [ariaHidden, setAriaHidde] = useState(true);

  const [previousActiveElement, setpreviousActiveElement] = useState(null);

  const openDialog = () => {
    let activeElement = document.activeElement;
    setpreviousActiveElement(activeElement);
    dialogRef.current.openPopUp();
  };

  const dialogIsDisplayed = () => {
    setAriaHidde(true);
  };

  const dialogIsNotDisplayed = () => {
    setAriaHidde(false);
    if (previousActiveElement) {
      previousActiveElement.focus();
    }
  };

  let mainSection = document.getElementById("main-section");
  if (!mainSection) {
    mainSection = document.createElement("section");
    mainSection.id = "main-section";
    const root = document.getElementById("root");
    root.append(mainSection);
  }

  return (
    <div className="App">
      <Content location={mainSection} openDialog={openDialog} Aria={ariaHidden}>
        <h1>Content Headline</h1>
        <p>Content text</p>
        <button onClick={openDialog}>Open Dialog</button>
        <input type="text"></input>
        <button onClick={() => setCount(count + 1)}> Add 1 to counter</button>
        <p>counter: {count}</p>
      </Content>
      <Dialog location={mainSection} ref={dialogRef} dialogIsDisplayed={dialogIsDisplayed} dialogIsNotDisplayed={dialogIsNotDisplayed}>
        <h1>Dialog</h1>
        <p>Some text</p>
        <button onClick={() => dialogRef.current.closePopUp()}>Close</button>
        <button>button 1</button>
        <button>button 2</button>
        <input type="text" placeholder="type here"></input>
      </Dialog>
    </div>
  );
}

export default App;
