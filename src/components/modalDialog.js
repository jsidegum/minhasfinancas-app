import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class ModalDialogConfirm extends Component {

    render() {
        return (
            <Modal show={this.props.show} onClick={this.props.handleCancelarAcao}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.props.description}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleCancelarAcao}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={this.props.handleConfirmarAcao} >
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ModalDialogConfirm;