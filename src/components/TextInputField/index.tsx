import React, { memo } from "react";
import css from './index.module.scss';

interface TextInputFieldProps {
	name?: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
	value: string;
	testId?: string;
	id?: string;
	placeholder?: string;
	inputClassName?: string;
	area?: boolean;
}

export const TextInputField = memo((
	{
		onChange,
		value,
		className = '',
		name,
		testId,
		id,
		placeholder,
		inputClassName,
		area,
	}: TextInputFieldProps
) => {
	return (
		<div className={`${className} ${css['wrapper']}`}>
			{name && (
				<span className={`${css['name']}`}>{name}</span>
			)}

			<input value={value} onChange={onChange} id={id}
			data-testid={testId} placeholder={placeholder} 
			className={`${inputClassName} ${css['input']}`} />	
		</div>
	);
});