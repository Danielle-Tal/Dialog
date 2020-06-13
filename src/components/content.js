import React from "react";
import ReactDOM from "react-dom";
import "../App.css";

const Content = (props) => {
  return props.Aria
    ? ReactDOM.createPortal(
        <div id="sectionContent" aria-hidden="true">
          {props.children}
        </div>,
        props.location
      )
    : ReactDOM.createPortal(
        <div id="sectionContent">{props.children}</div>,
        props.location
      );
};

export default Content;
