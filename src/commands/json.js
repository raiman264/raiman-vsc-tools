"use strict";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

/**
 * TextEditorCommand
 * @param {TextEditor} textEditor
 * @param {TextEditorEdit} edit
 */
function prettyJSON(textEditor, edit) {
    const { tabSize } = textEditor.options;

    if (!textEditor) {
        vscode.window.showErrorMessage("no active editor found");
        return 0;
    }

    if (!textEditor.selection.isEmpty) {
        const json = prettify(
            textEditor.document.getText(textEditor.selection),
            tabSize
        );

        if (typeof json === "string") {
            edit.replace(
                textEditor.selection,
                json
            );
        } else {
            vscode.window.showWarningMessage("Cannot parse to JSON: " + json.message);
        }
    } else {
        const lineNumber = textEditor.selection.start.line;
        const line = textEditor.document.lineAt(lineNumber).text;
        const json = prettify(line, tabSize);

        // if there is an error parsing the line
        // try parsing the whole editor
        if (typeof json === "string") {
            edit.replace(
                new vscode.Range(lineNumber, 0, lineNumber, line.length),
                json
            );
        } else {
            const fullFile = prettify(textEditor.document.getText(), tabSize);
            if (typeof fullFile === "string") {
                const lastLine = textEditor.document.lineCount - 1;
                const lastColumn = textEditor.document.lineAt(lastLine).text.length;
                edit.replace(
                    new vscode.Range(
                        0, 0,
                        lastLine, lastColumn
                    ),
                    fullFile
                );
            } else {
                vscode.window.showWarningMessage("Cannot parse to JSON: " + json.message);
            }
        }
    }
}

/**
 * actually makes the json prettier
 * @param {string} text
 * @param {number} tabSize
 */
function prettify(text, tabSize) {
    try {
        return JSON.stringify(
            JSON.parse(text),
            null,
            tabSize
        );
    } catch (e) {
        // vscode.window.showWarningMessage("Cannot parse to JSON: " + e.message);
        return e;
    }
}

exports.prettyJSON = prettyJSON;
exports.prettify = prettify;
