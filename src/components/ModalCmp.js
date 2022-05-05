import React from "react";
import Modal from "react-responsive-modal";

const ModalCmp = (props) => {
  const sendAllInvoiceDetails = () => {
    //to do
    //poruka da je uspjesno upisano u bazu

    props.sendOdrer();
  };

  return (
    <Modal
      open={props.showModal}
      onClose={props.closeModal}
      center
      closeIconSize={16}
    >
      <div>
        {/* <h8 className="modalTitle">Pošalji narudzbinu?</h8> */}
        <p className="modalTitle">Obavještenje!</p>
        <p>Pošalji narudžbu?</p>
        <div>
          <button
            className="btn btn-primary btn-sm bntModal"
            style={{ margin: "0" }}
            onClick={sendAllInvoiceDetails}
          >
            Pošalji
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalCmp;
