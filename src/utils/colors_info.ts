import { TagColors } from "../types/tag_color.type";

export type TagColorInfo = {
	name: TagColors;
	color: string;
};

export const tagColorsInfo: TagColorInfo[] = [
	{
		name: TagColors.green,
		color: '61BD4F',
	},

	{
		name: TagColors.yellow,
		color: 'F2D600',
	},

	{
		name: TagColors.orange,
		color: 'FF9F1A',
	},

	{
		name: TagColors.red,
		color: 'EB5A46',
	},
	
	{
		name: TagColors.magenta,
		color: 'C377E0',
	},

	{
		name: TagColors.blue,
		color: '0079BF',
	},

	{
		name: TagColors.gray,
		color: 'C5C5C5'
	},
];