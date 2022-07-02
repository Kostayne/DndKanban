export function editObject(obj: any, props: any) {
	for (const [key, val] of Object.entries(props)) {
		obj[key] = val;
	}
}