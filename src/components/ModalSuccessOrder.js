import React from 'react'
import Modal from 'react-responsive-modal'

export default class ModalSuccessOrder extends React.Component {
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

    closeModal = () => {
        this.setState({
            showModal: false
        })
    }

    render() {
        return(
            <Modal open={this.state.showModal} onClose={this.props.closeModal} center closeIconSize={16}>
                <div>
                    <p className="modalTitle">Obavještenje!</p>
                        <p>Narudžba je uspješno poslata!</p>
                        <div>
                            <button className="btn btn-primary btn-sm bntModal" onClick={this.props.closeModal}>OK</button>
                        </div> 
                </div>
            </Modal>
        )
    }
}