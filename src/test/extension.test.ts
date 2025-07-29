import * as assert from 'assert';
import { Mark } from '../core/types';
import { removeMark } from '../core/mark';

suite('Markem tests', () => {

	let marks: Mark[];
	
	setup(() => {
		marks = [
			{ fileName: "file1.ts", filePath: "/path/to/file1.ts", lineNumber: 10 },
			{ fileName: "file2.ts", filePath: "/path/to/file2.ts", lineNumber: 20 },
			{ fileName: "file3.ts", filePath: "/path/to/file3.ts", lineNumber: 30 }
		];
	});

	test("removeMark test not out of bounds", () => {

		let currentPosition: number = 1;

		let expectedMarks: Mark[] = [
			{ fileName: "file1.ts", filePath: "/path/to/file1.ts", lineNumber: 10 },
			{ fileName: "file3.ts", filePath: "/path/to/file3.ts", lineNumber: 30 }
		];
		let expectedPosition: number = 1;
		let removeFilePath = "/path/to/file2.ts";

		let [newMark, newPosition] = removeMark(marks, currentPosition, removeFilePath);
	
		assert.deepStrictEqual(newMark, expectedMarks);
		assert.strictEqual(newPosition, expectedPosition);
	});

	test("removeMark test out of bounds", () => {
		let currentPosition: number = 2;

		let expectedMarks: Mark[] = [
			{ fileName: "file1.ts", filePath: "/path/to/file1.ts", lineNumber: 10 },
			{ fileName: "file2.ts", filePath: "/path/to/file2.ts", lineNumber: 20 }
		];
		let expectedPosition: number = 1;
		let removeFilePath = "/path/to/file3.ts";

		let [newMark, newPosition] = removeMark(marks, currentPosition, removeFilePath);
	
		assert.deepStrictEqual(newMark, expectedMarks);
		assert.strictEqual(newPosition, expectedPosition);
	});

	test("removeMark test no marks left", () => {
		let currentPosition: number = 0;
		marks = [
			{ fileName: "file1.ts", filePath: "/path/to/file1.ts", lineNumber: 10 }
		];
		let expectedMarks: Mark[] = [];
		let expectedPosition: number = -1;
		let removeFilePath = "/path/to/file1.ts";

		let [newMark, newPosition] = removeMark(marks, currentPosition, removeFilePath);
	
		assert.deepStrictEqual(newMark, expectedMarks);
		assert.strictEqual(newPosition, expectedPosition);
	});

});
