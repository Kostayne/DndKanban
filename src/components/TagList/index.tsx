import { memo } from "react";
import { ITag } from "../../types/tag.type";
import { getTagColorByName } from "../../utils/get_color_by_name";
import css from './index.module.scss';

interface TagListProps {
	className?: string;
	tags: ITag[];
}

export const TagList = memo(({
	tags,
	className = '',

}: TagListProps) => {
	const getTags = () => {
		return tags.map(t => {
			const color = getTagColorByName(t.color);
			
			return (
				<span className={css['tag']} style={{ color }} key={t.id}># {t.text}</span>
			);
		});
	};

	return (
		<div className={`${className} ${css['list']}`}>
			{getTags()}
		</div>
	);
});