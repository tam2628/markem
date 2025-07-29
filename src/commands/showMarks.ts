import * as vscode from 'vscode';
import { readMarks, writeCurrentOpenFilePosition } from '../vscodestore';

export function showMarks(context: vscode.ExtensionContext): void {
    const items = readMarks(context).map((mark, index) => ({
        label: mark.fileName,
        description: `File: ${mark.filePath}, Line: ${mark.lineNumber}`,
        mark: mark,
        index: index
    }));

    vscode.window.showQuickPick(items, {
        placeHolder: 'Select a mark to go to',
        canPickMany: false
    }).then(selected => {
        if (selected) {
            const uri = vscode.Uri.file(selected.mark.filePath);
            vscode.workspace.openTextDocument(uri).then(doc => {
                writeCurrentOpenFilePosition(context, selected.index);
                
                vscode.window.showTextDocument(doc).then(editor => {
                    const position = new vscode.Position(selected.mark.lineNumber - 1, 0);
                    editor.selection = new vscode.Selection(position, position);
                    editor.revealRange(new vscode.Range(position, position));
                });
            });
        }
    });
}