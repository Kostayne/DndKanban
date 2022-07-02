import { ReactNode } from 'react';
import css from './index.module.scss';

interface TextButtonProps {
	id?: string;
	testId?: string;
	className?: string;
	children: ReactNode;
	onClick?: () => void;
}

export const TextButton = ({
	id,
	testId,
	className='',
	children,
	onClick,
}: TextButtonProps) => {
	return (
		<button className={`${className} ${css['button']}`}
		onClick={onClick} id={id} data-testid={testId}>
			{children}
		</button>
	);
};