// InputPassword.tsx

import React, { ChangeEvent } from 'react';
import { Input } from 'antd';

interface InputPasswordProps {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
}

const InputPassword: React.FC<InputPasswordProps> = ({
    placeholder,
    value,
    onChange,
}) => {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <Input
            type="password"
            placeholder={placeholder}
            value={value}
            onChange={handleInputChange}
        />
    );
};

export default InputPassword;
