import { ReactNode } from "react";
import { PrimaryBtn } from "../PrimaryButton";
import css from './index.module.scss';
import { TextButton } from "../Button";
import { DeleteIconSvg } from "../icons/Delete";

interface BaseFormProps{ 
	name: string;
	actionName?: string;
	children: ReactNode;
	onAction?: () => void;
	onDelete?: () => void;
}

export const BaseForm = ({
	children,
	name,
	actionName,
	onAction,
	onDelete,
}: BaseFormProps) => {
	return (
		<div className={`${css['form']} card modal-form`}>
			<div className={`${css['top-block']}`}>
				<span className={`${css['headline']} modal-form__title`}>{name}</span>

				{onDelete && (
					<TextButton className={css['delete-btn']} onClick={onDelete}>
						<DeleteIconSvg className={css['delete-btn__svg']} />
					</TextButton>
				)}
			</div>
			
			<div className={css['content']}>
				{children}
			</div>

			{actionName && (
				<PrimaryBtn className={`${css['action-btn']}`} onClick={onAction}>
					{actionName}
				</PrimaryBtn>
			)}
		</div>
	);
};
