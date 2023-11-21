import { Input as AntdInput } from 'antd';
import { ChangeEvent } from 'react';

interface InputProps {
	placeholder: string;
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	className?: string;
}
const Input = ({ placeholder, value, onChange, className = '' }: InputProps) => {
	return (
		<AntdInput
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			className={className}
		></AntdInput>
	);
};

export default Input;
