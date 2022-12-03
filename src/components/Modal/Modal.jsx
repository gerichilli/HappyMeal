import ReactDOM from "react-dom";
import styles from "./Modal.module.scss";
import { CgClose } from "react-icons/cg";
import { useEffect } from "react";
import { useRef } from "react";

function Modal({ isShow, handleConfirm, handleClose, handleCancel, children }) {
  const modalRef = useRef(null);

  if (!modalRef.current) {
    modalRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(modalRef.current);

    return () => {
      if (modalRef.current) {
        modalRoot.removeChild(modalRef.current);
      }
    };
  }, []);

  if (!isShow) return null;
  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div className={styles.overlay} onClick={handleClose} />
      <div className={styles.dialog}>
        <div className={styles.header}>
          <button className={styles.close} onClick={handleClose}>
            <CgClose aria-label="Close" />
          </button>
        </div>
        <div className={styles.body}>{children}</div>
        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={handleCancel}>
            Cancel
          </button>
          <button className={styles.confirmBtn} onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>,
    modalRef.current
  );
}

export default Modal;
