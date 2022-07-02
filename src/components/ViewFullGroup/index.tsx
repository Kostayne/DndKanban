import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { StoreCtx } from "../../App";
import { FormNames } from "../../store/ui.store";
import { BaseForm } from "../BaseForm";
import css from './index.module.scss';

export const ViewFullGroupForm = observer(() => {	
	const store = useContext(StoreCtx);
	const group = store.uiStore.formTaskGroup;

	if (!group) {
		throw new Error('Form group is not set');
	}

	const handleClick = () => {
		store.uiStore.setActiveForm(FormNames.none);
	};

	return (
		<BaseForm name={group.name} actionName="OK"
		onAction={handleClick}>
			<span className={css['description']}>{group.description}</span>
		</BaseForm>
	);
});

