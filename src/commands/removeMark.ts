import * as vscode from 'vscode';
import { removeMark as removeFile } from '../core/mark';
import { readCurrentOpenFilePosition, readMarks, writeCurrentOpenFilePosition, writeMarks } from '../vscodestore';

export async function removeMark(context: vscode.ExtensionContext): Promise<void> {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }
    const filePath = editor.document.uri.fsPath;
    let marks = readMarks(context);
    let currentPosition = readCurrentOpenFilePosition(context);
    let [newMarks, newPosition] = removeFile(marks, currentPosition, filePath);
    
    await writeMarks(context, newMarks);
    await writeCurrentOpenFilePosition(context, newPosition);
}