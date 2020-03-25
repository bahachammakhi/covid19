// eslint-disable-next-line no-unused-vars
import React from 'react';

// eslint-disable-next-line no-unused-vars
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const InfectedDetails = ({ modal, toggle, data }) => {
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>{data.name}</ModalHeader>
      <ModalBody>{data.email}</ModalBody>
      {/* <ModalFooter>
        <Button color="primary" onClick={toggle}>
          Do Something
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter> */}
    </Modal>
  );
};

export default InfectedDetails;
