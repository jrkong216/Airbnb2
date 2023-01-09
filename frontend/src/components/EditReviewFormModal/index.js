// frontend/src/components/EditReviewFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditReviewForm from './EditReviewForm';
import "./EditReviewFormModal.css"

function EditReviewFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <div className="modal-container">
      <div className="log-in-text" onClick={() => setShowModal(true)}>Edit Review</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditReviewForm />
        </Modal>
      )}
      </div>
    </>
  );
}

export default EditReviewFormModal;
