interface CheckboxProps {
	checked?: boolean;
	className?: string;
	id?: string;
	testId?: string;
}

export const Checkbox = ({
	checked,
	className = '',
	testId,
	id,
}: CheckboxProps) => {
	return (
		<label>
			<input type="checkbox" />
		</label>
	);
};