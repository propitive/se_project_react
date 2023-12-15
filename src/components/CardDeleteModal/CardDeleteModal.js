import React from "react";
import "./CardDeleteModal.css";

function CardDeleteModal({ onClose, handleDelete, isLoading }) {
  return (
    <div className="modal modal__confirm">
      <div className="modal__delete-container">
        <button className="modal__close modal__close-item" onClick={onClose} />
        <div className="modal__message">
          <p className="modal__message-line">
            Are you sure you want to delete this item?
          </p>
          <p className="modal__message-line">This action is irreversable.</p>
        </div>

        {/* <p className="modal__yes" onClick={handleDelete}>
          {isLoading ? "Saving..." : "Yes, delete item"}
          </p> */}
        <button
          className="delete-modal__delete-buton"
          onClick={handleDelete}
          type="button"
        >
          <span className="delete-modal__delete-text">
            {isLoading ? "Saving..." : "Yes, delete item"}
          </span>
          <span className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
            </svg>
          </span>
        </button>
        <p className="modal__cancel" onClick={onClose}>
          Cancel
        </p>
      </div>
    </div>
  );
}

export default CardDeleteModal;
