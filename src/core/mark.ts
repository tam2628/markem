import { Mark } from "./types";

export function performDiff(existingMarks: Mark[], newMark: Mark): Mark[] {
	let marks = existingMarks.filter(mark => mark.filePath !== newMark.filePath);
	marks.push(newMark);
	return marks;
}

export function removeMark(marks:Mark[], currentPosition: number, filePath: string): [Mark[], number] {
	const removePosition = marks.findIndex(mark => mark.filePath === filePath);
	if (removePosition === -1) {
		return [marks, currentPosition];
	}

	let newPosition = currentPosition;
	let newMarks = marks.filter(mark => mark.filePath !== filePath);
	if (removePosition < currentPosition) {
		newPosition = currentPosition - 1;		
	} else if (removePosition === currentPosition) {
		if (newMarks.length === 0) {
			newPosition = -1;
		} else if (removePosition >= newMarks.length) {
			newPosition = newMarks.length - 1;
		} 
	}

	return [newMarks, newPosition];
}
