import { Button as AntdButton } from 'antd';
import { ReactElement } from 'react';
import { noop } from '../../../utils/common.ts';

interface ButtonProps {
	children: ReactElement | string;
	onClick?: () => void;
	className?: string;
	type?: 'default' | 'primary' | 'dashed' | 'link' | 'text';
	size?: 'large' | 'small';
}
const Button = ({
	children,
	onClick = noop,
	type = 'primary',
	className,
	size = 'small',
}: ButtonProps) => {
	return (
		<AntdButton type={type} onClick={onClick} className={className} size={size}>
			{children}
		</AntdButton>
	);
};

export default Button;
