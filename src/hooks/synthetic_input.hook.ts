import React, { FormEvent, useState } from "react"

export const useSyntheticInput = (initial = '') => {
	const [value, setVal] = useState(initial);

	const onChange = (e: React.ChangeEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>) => {
		setVal(e.currentTarget.value);
	}

	return {
		onChange,
		value,
	};
}