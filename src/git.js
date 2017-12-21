// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

const cp = require('child_process');
const path = require('path');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "raiman-tools" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.gitCheckout', function () {
        // The code you place here will be executed every time your command is executed

        const activeEditor = vscode.window.activeTextEditor;

        if (!activeEditor) {
            vscode.window.showErrorMessage("no active editor found");
            return 0;
        }

        const fileName = activeEditor.document.fileName;

        if (!fileName) {
            vscode.window.showErrorMessage("no fileName found");
            console.log(fileName);
            return 0;
        }
        // debugger

        const dirname = path.dirname(fileName);

        cp.exec(
            `git checkout ${fileName}`,
            { cwd: dirname },
            () => {
                console.log(arguments);
            }
        );
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;