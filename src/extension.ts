// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

function commadore() {
	const editor = vscode.window.activeTextEditor;
	if (!editor){
		return;
	}

	vscode.commands.executeCommand("acceptSelectedSuggestion").then(() => {
		const lineIndex = editor.selection.active.line;
		const lineObject = editor.document.lineAt(lineIndex);
		const lineLength = lineObject.text.length;
		if (lineObject.text.charAt(lineLength - 1) !== "," && !lineObject.isEmptyOrWhitespace) {
			const insertionSuccess = editor.edit(builder => {
				builder.insert(new vscode.Position(lineIndex, lineLength), ",");
			});
			if (!insertionSuccess) {
				return;
			}
			vscode.commands.executeCommand('cursorEnd').then(() => {
				vscode.commands.executeCommand('editor.action.insertLineAfter');
			});
		}
	});

}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const command = "commadore.addComma";

	let disposable = vscode.commands.registerCommand(command, () => {
		commadore();
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
