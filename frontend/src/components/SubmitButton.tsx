import React from 'react';

interface SubmitButtonProps {
    text: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ text }) => {
    return (
        <button type="submit" className="main-button">
            {text}
        </button>
    );
};

export default SubmitButton;
