import { TopicColor } from "../theme";

export interface IStudent {
	id: number
	first_name: string
	last_name: string
	name?: string
	initials: string
	grade: number
	student_number?: number
	color: TopicColor
}

export interface IFlexBlock {
	label: string
	flex: true
	total: number
	attended: number
}

export interface IClassBlock extends IFlexBlock {
	course_id: number
	enrolled_at: string
	dropped_at: string
}

export type IAttendanceBlock = IFlexBlock | IClassBlock
