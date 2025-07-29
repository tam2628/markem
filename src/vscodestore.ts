import * as vscode from 'vscode';
import { Mark } from './core/types';
import { performDiff } from './core/mark';

const MARK_FILE_KEY = 'marks';
const CURRENT_OPEN_FILE_POSITION_KEY = 'currentOpenFilePosition';

export function readMarks(context: vscode.ExtensionContext): Mark[] {
    return context.globalState.get<Mark[]>('marks', []);
}

export function writeMark(context: vscode.ExtensionContext, mark: Mark): Thenable<void> {
    const existingMarks = readMarks(context);
    const updatedMarks = performDiff(existingMarks, mark);
    return context.globalState.update(MARK_FILE_KEY, updatedMarks);        
}

export function writeMarks(context: vscode.ExtensionContext, mark: Mark[]): Thenable<void> {
    return context.globalState.update(MARK_FILE_KEY, mark);
}

export async function clearMarks(context: vscode.ExtensionContext): Promise<void> {
    await context.globalState.update(MARK_FILE_KEY, []);
    await writeCurrentOpenFilePosition(context, -1);
}

export function readCurrentOpenFilePosition(context: vscode.ExtensionContext): number {
    return context.globalState.get<number>(CURRENT_OPEN_FILE_POSITION_KEY, -1);
}

export function writeCurrentOpenFilePosition(context: vscode.ExtensionContext, position: number): Thenable<void> {
    return context.globalState.update(CURRENT_OPEN_FILE_POSITION_KEY, position);
}
