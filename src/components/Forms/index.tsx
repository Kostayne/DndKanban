import { observer } from "mobx-react-lite";
import { ReactElement, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { StoreCtx } from "../../App";
import { FormNames } from "../../store/ui.store";
import { formsInfo } from "../../utils/forms_list";
import { Banner } from "../Banner";

export const FormsSelector = observer(() => {
	const store = useContext(StoreCtx);
	const uiStore = store.uiStore;
	const activeForm = store.uiStore.activeForm;
	const [formC, setFormC] = useState<ReactElement | null>(null);

	useEffect(() => {
		if (activeForm == FormNames.none) {
			setTimeout(() => {
				setFormC(null);
			}, 500);
		}

		const form = formsInfo.find(f => f.name == activeForm);
		if (activeForm != FormNames.none && !form) {
			throw new Error('Can not find form binded to ' + activeForm);
		}

		if (form) {
			setFormC(form.component);
		}
	}, [activeForm]);		

	const onClickOutside = () => {
		uiStore.setActiveForm(FormNames.none);
	};

	if (!formC) {
		return null;
	}

	return (
		<Banner onClickOutside={onClickOutside} 
		className={`${activeForm == FormNames.none? 'fadeout' : ''}`}>
			{formC}
		</Banner>
	);
});