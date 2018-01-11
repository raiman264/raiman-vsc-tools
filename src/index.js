// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

const { gitCheckout } = require('./commands/git');
const { prettyJSON } = require('./commands/json');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "raiman-tools" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json

    context.subscriptions.push(vscode.commands.registerCommand('raiman264.gitCheckout', gitCheckout));
    // context.subscriptions.push(vscode.commands.registerCommand('raiman264.prettyJSON', prettyJSON));
    context.subscriptions.push(vscode.commands.registerTextEditorCommand('raiman264.prettyJSON', prettyJSON));
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;