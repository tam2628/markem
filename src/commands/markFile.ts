import * as vscode from 'vscode';
import { getFileName } from '../helper';
import { Mark } from '../core/types';
import { writeMark } from '../vscodestore';

export function markFile(context: vscode.ExtensionContext): void {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active text editor found.');
        return;
    }

    let mark: Mark = {
        fileName: getFileName(editor.document.uri.fsPath),
        filePath: editor.document.uri.fsPath,
        lineNumber: editor.selection.active.line + 1,
    };

    writeMark(context, Object.freeze(mark)).then(() => {
        vscode.window.showInformationMessage(`Marked file: ${mark.fileName} at line: ${mark.lineNumber}`);
    });
}