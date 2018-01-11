// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

const cp = require('child_process');
const path = require('path');

function gitCheckout() {
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

    const dirname = path.dirname(fileName);

    cp.exec(
        `git checkout ${fileName}`,
        { cwd: dirname },
        () => {
            console.log(arguments);
        }
    );
}

exports.gitCheckout = gitCheckout;
