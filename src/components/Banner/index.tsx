import React, { ReactNode } from "react";
import css from './index.module.scss';

interface BannerProps {
	className?: string;
	children: ReactNode;
	onClickOutside?: () => void;
}

export const Banner = ({
	className = '',
	children,
	onClickOutside,
}: BannerProps) => {
	const handleOnClick = (e: React.MouseEvent) => {
		if (e.target == e.currentTarget) {
			onClickOutside?.call({});
		}
	};

	return (
		<div className={`${css['banner']} ${className}`}
		onMouseDown={handleOnClick}>
			{children}
		</div>
	);
};