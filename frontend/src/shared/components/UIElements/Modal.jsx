import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";
import "./Modal.css";

const ModalOverlay = (props) => {
  const {
    className,
    style,
    headerClass,
    contentClass,
    footerClass,
    header,
    footer,
    onSubmit,
    children,
  } = props;
  const content = (
    <div className={`modal ${className}`} style={style}>
      <header className={`modal__header ${headerClass}`}>
        <h2>{header}</h2>
        <form
          onSubmit={onSubmit ? onSubmit : (event) => event.preventDefault()}
        >
          <div className={`modal__content ${contentClass}`}>{children}</div>
        </form>
        <footer className={`modal__footer ${footerClass}`}>{footer}</footer>
      </header>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  const { show, onCancel } = props;
  return (
    <React.Fragment>
      {show && <Backdrop onClick={onCancel} />}
      <CSSTransition
        in={show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
