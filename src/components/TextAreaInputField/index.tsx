import React, { memo } from "react";
import css from './index.module.scss';

interface TextAreaInputFieldProps {
	name?: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	className?: string;
	value: string;
	testId?: string;
	id?: string;
	placeholder?: string;
	inputClassName?: string;
	area?: boolean;
}

export const TextAreaInputField = memo((
	{
		onChange,
		value,
		className = '',
		name,
		testId,
		id,
		placeholder,
		inputClassName,
	}: TextAreaInputFieldProps
) => {
	return (
		<div className={`${className} ${css['wrapper']}`}>
			{name && (
				<span className={`${css['name']}`}>{name}</span>
			)}

			<textarea value={value} onChange={onChange} id={id}
			data-testid={testId} placeholder={placeholder} 
			className={`${inputClassName} ${css['input']}`} />
		</div>
	);
});