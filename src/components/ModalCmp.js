import React from 'react'
import Modal from 'react-responsive-modal'

export default class ModalCmp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            show: false
        }
    }

    static getDerivedStateFromProps(nextProps, prevProps) {
        if(nextProps.showModal !== prevProps.showModal) {
            return {
                showModal: nextProps.showModal
            }
        }
        return null
    }

    sendAllInvoiceDetails = () => {

        //to do
        //poruka da je uspjesno upisano u bazu

        this.props.sendOdrer()
        // alert("Uspješno ste poslali narudžbinu")
    }

    render() {
        return(
            <Modal open={this.state.showModal} onClose={this.props.closeModal} center closeIconSize={16}>
                <div >
                    {/* <h8 className="modalTitle">Pošalji narudzbinu?</h8> */}
                    <p className="modalTitle">Obavještenje!</p>
                        <p>Pošalji narudžbu?</p>
                        <div >
                            <button className="btn btn-primary btn-sm bntModal" style={{'margin':'0'}} onClick={this.sendAllInvoiceDetails}>Pošalji</button>
                        </div> 
                    
                </div>
            </Modal>
        )
    }
}