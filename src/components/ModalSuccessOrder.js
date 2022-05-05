import React from "react";
import Modal from "react-responsive-modal";

const ModalSuccessOrder = (props) => (
  <Modal
    open={props.showModal}
    onClose={props.closeModal}
    center
    closeIconSize={16}
  >
    <div>
      <p className="modalTitle">Obavještenje!</p>
      <p>Narudžba je uspješno poslata!</p>
      <div>
        <button
          className="btn btn-primary btn-sm bntModal"
          onClick={props.closeModal}
        >
          OK
        </button>
      </div>
    </div>
  </Modal>
);

export default ModalSuccessOrder;
