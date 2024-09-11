import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React, { useState } from 'react';
interface ModalProviderProps {
    modalContent: (props: { handleCancelation: () => void }) => React.ReactNode;
    contentContext: string;
}

const ModalProvider: React.FC<ModalProviderProps> = ({
    modalContent,
    contentContext,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    /** This calculates dynamically the sider width based on the viewport width, the goal is to have a centered modal according to it. */
    const siderWidth = `calc(100vw - 200px)`;

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
            <Button className="modal-button" type="primary" onClick={showModal}>
                <PlusOutlined />
                {contentContext}
            </Button>
            <Modal
                className="modal-provider"
                open={isModalOpen}
                onOk={handleValidation}
                onCancel={handleCancelation}
                footer={[]}
                width={1000}
                style={{ left: `calc(50% - ${siderWidth} / 2)` }}
            >
                {modalContent({ handleCancelation })}
            </Modal>
        </>
    );
};

export default ModalProvider;
