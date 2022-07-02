import React, { ReactElement, ReactNode } from "react";
import css from './index.module.scss';

interface BannerProps {
	className?: string;
	children: ReactElement | ReactElement[];
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
		<div className={`${css['banner']} ${className} fadein`}
		onMouseDown={handleOnClick}>
			{children}
		</div>
	);
};