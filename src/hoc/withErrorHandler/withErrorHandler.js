import React from 'react';

import Modal from '../../components/UI/Modal/Modal.js';
import Aux from '../Aux'

const withErrorHandler = (WrappedComponent) => {
    return (props) => {
        return (
            <Aux>
                <Modal show>
                    Something went wrang.
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        );
    }
};

export default withErrorHandler;