import React, { useState } from 'react';
import { Button, Modal } from 'antd';

interface ModalProviderProps {
    modalContent: React.ReactNode;
    contentContext: string;
}

const ModalProvider: React.FC<ModalProviderProps> = ({
    modalContent,
    contentContext,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleValidation = () => {
        setIsModalOpen(false);
    };

    const handleCancelation = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                {contentContext}
            </Button>
            <Modal
                visible={isModalOpen}
                onOk={handleValidation}
                onCancel={handleCancelation}
                width={1000}
            >
                {modalContent}
            </Modal>
        </>
    );
};

export default ModalProvider;