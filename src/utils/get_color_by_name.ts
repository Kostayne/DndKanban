import { TagColors } from "../types/tag_color.type";
import { tagColorsInfo } from "./colors_info";

export function getTagColorByName(name: TagColors): string {	
	const matchedInfo = tagColorsInfo.find(i => i.name == name);

	if (matchedInfo) {
		return '#' + matchedInfo.color;
	}

	return 'gray';
}