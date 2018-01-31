// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

const cp = require('child_process');
const path = require('path');

function fileCheckout() {
    // The code you place here will be executed every time your command is executed

    vscode.commands.executeCommand('git.clean');
}

exports.fileCheckout = fileCheckout;
