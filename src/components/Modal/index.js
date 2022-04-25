import Button from "@mui/material/Button";

import "./style.css";

const Modal = ({ active, children }) => {
  return (
    <div className={active ? "modal active" : "modal"}>
      <div
        className={active ? "modal__content active" : "modal__content"}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__childprop">{children}</div>
      </div>
    </div>
  );
};
export default Modal;
