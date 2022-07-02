import { ReactNode } from 'react';
import css from './index.module.scss';

interface ButtonProps {
	id?: string;
	testId?: string;
	className?: string;
	children: ReactNode;
	onClick?: () => void;
}

export const PrimaryBtn = ({
	id,
	testId,
	className='',
	children,
	onClick,
}: ButtonProps) => {
	return (
		<button className={`${className} ${css['button']}`}
		onClick={onClick} id={id} data-testid={testId}>
			{children}
		</button>
	);
};