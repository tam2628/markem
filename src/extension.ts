import * as vscode from 'vscode';
import { markFile } from './commands/markFile';
import { showMarks } from './commands/showMarks';
import { removeMark } from './commands/removeMark';
import { clearMarks } from './vscodestore';
import { navigate } from './commands/nextFile';

export function activate(context: vscode.ExtensionContext) {

	const markFileCommand = vscode.commands.registerCommand(
		'markem.markFile', () => markFile(context));

	const showMarksCommand = vscode.commands.registerCommand(
		'markem.showMarks', () => showMarks(context));

	const removeMarkCommand = vscode.commands.registerCommand(
		'markem.removeMark', () => removeMark(context));

	const clearAllFilesCommand = vscode.commands.registerCommand(
		'markem.clearAllMarks', () => clearMarks(context));

	const nextFileCommand = vscode.commands.registerCommand(
		'markem.nextFile', () => navigate(context, 'next'));

	const prevFileCommand = vscode.commands.registerCommand(
		'markem.previousFile', () => navigate(context, 'previous'));

	context.subscriptions.push(
		markFileCommand,
		showMarksCommand,
		removeMarkCommand,
		clearAllFilesCommand,
		nextFileCommand,
		prevFileCommand
	);
}

export function deactivate() {
	console.log('Extension "markem" is now deactivated.');
	vscode.window.showInformationMessage('Markem extension has been deactivated.');
}