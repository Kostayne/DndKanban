import { SvgIconProps } from "../../types/svg_icon_props";

export const DotsIconSvg = ({
	className = '',
	pathClassName = '',
}: SvgIconProps) => {
	return (
		<svg width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg"
		className={className}>
			<circle cx="1.875" cy="1.625" r="1.625" fill="#506993" 
			className={pathClassName} />

			<circle cx="8.125" cy="1.625" r="1.625" fill="#506993"
			className={pathClassName} />

			<circle cx="14.375" cy="1.625" r="1.625" fill="#506993"
			className={pathClassName} />
		</svg>
	);
};