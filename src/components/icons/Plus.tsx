import { SvgIconProps } from "../../types/svg_icon_props";

export const PlusIconSvg = ({
	className,
	pathClassName
}: SvgIconProps) => {
	return (
		<svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
		width="24px" height="24px" className={className} >
			<path d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"
			className={pathClassName} />
		</svg>
	);
};