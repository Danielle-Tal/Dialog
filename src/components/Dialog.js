import React, {useEffect, useState, forwardRef, useImperativeHandle, createRef} from "react";
import ReactDOM from "react-dom";
import "../App.css";

const Dialog = forwardRef((props, ref) => {
  const [display, setDisplay] = useState(true);

  const dialogRefnew = createRef();

  useImperativeHandle(ref, () => {
    return {
      openPopUp: () => openDialog(),
      closePopUp: () => closeDialog(),
    };
  });

  const openDialog = () => {
    setDisplay(true);
    props.dialogIsDisplayed();
  };

  const closeDialog = () => {
    setDisplay(false);
    props.dialogIsNotDisplayed();
  };

  useEffect(() => {
    if (display) {
      handleTab();

      function keyListener(e) {
        const listener = keyListenersMap.get(e.keyCode);
        return listener && listener(e);
      }
      document.addEventListener("keydown", keyListener);

      return () => {
        document.removeEventListener("keydown", keyListener);
      };
    }
  }, [display]);

  const handleTab = (e) => {
    const focusableDialogElements = dialogRefnew.current.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstElement = focusableDialogElements[0];
    const lastElement =
      focusableDialogElements[focusableDialogElements.length - 1];
    if (!e) {
      firstElement.focus();
      return;
    }
    if (!e.shiftKey && document.activeElement === lastElement) {
      firstElement.focus();
      return e.preventDefault();
    }

    if (e.shiftKey && document.activeElement === firstElement) {
      lastElement.focus();
      e.preventDefault();
    }
  };

  const keyListenersMap = new Map([
    [27, closeDialog],
    [9, handleTab],
  ]);

  return display
    ? ReactDOM.createPortal(
        <div id="dialogPlaceholder">
          <div className="Overlay" onClick={closeDialog}></div>
          <dialog open className="dialog">
            <div role="document" ref={dialogRefnew}>
              {props.children}
            </div>
          </dialog>
        </div>,
        props.location
      )
    : null;
});

export default Dialog;
