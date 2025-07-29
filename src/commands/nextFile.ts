import * as vscode from "vscode";
import { readCurrentOpenFilePosition, readMarks, writeCurrentOpenFilePosition } from "../vscodestore";
import { Direction } from "../core/types";

export function navigate(context: vscode.ExtensionContext, direction: Direction): void {
    let currentPos = readCurrentOpenFilePosition(context);
    let marks = readMarks(context);
    let nextMove = direction === 'next' ? 1 : -1;
    currentPos = (currentPos + nextMove) % marks.length;
    if (currentPos < 0) {
        currentPos = marks.length - 1;
    }
    const nextMark = marks[currentPos];
    if (nextMark) {
        const uri = vscode.Uri.file(nextMark.filePath);
        vscode.workspace.openTextDocument(uri).then(doc => {
            vscode.window.showTextDocument(doc).then(editor => {
                const position = new vscode.Position(nextMark.lineNumber - 1, 0);
                editor.selection = new vscode.Selection(position, position);
                editor.revealRange(new vscode.Range(position, position));

                writeCurrentOpenFilePosition(context, currentPos);
            });
        });
    }
}