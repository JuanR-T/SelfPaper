import { Input } from 'antd';
import { ChangeEvent } from 'react';

interface InputTextProps {
    placeholder: string;
    type: string;
    label: string;
    name: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputText: React.FC<InputTextProps> = ({
    placeholder,
    value,
    name,
    onChange,
}) => {
    return (
        <Input
            placeholder={placeholder ?? ''}
            name={name}
            value={value}
            onChange={onChange}
        />
    );
};

export default InputText;
