"use strict";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

/**
 * TextEditorCommand
 * @param {TextEditor} textEditor
 * @param {TextEditorEdit} edit
 */
function prettyCurl(textEditor, edit) {
    const { tabSize } = textEditor.options;

    if (!textEditor) {
        vscode.window.showErrorMessage("no active editor found");
        return 0;
    }

    if (!textEditor.selection.isEmpty) {
        const curl = prettifyCurl(
            textEditor.document.getText(textEditor.selection),
            tabSize
        );

        if (typeof curl === "string") {
            edit.replace(
                textEditor.selection,
                curl
            );
        } else {
            vscode.window.showWarningMessage("Cannot parse Curl command: " + e.message);
        }
    } else {
        const lineNumber = textEditor.selection.start.line;
        const line = textEditor.document.lineAt(lineNumber).text;
        const curl = prettifyCurl(line, tabSize);

        // if there is an error parsing the line
        // try parsing the whole editor
        if (typeof curl === "string") {
            edit.replace(
                new vscode.Range(lineNumber, 0, lineNumber, line.length),
                curl
            );
        } else {
            const fullFile = prettifyCurl(textEditor.document.getText(), tabSize);
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
                vscode.window.showWarningMessage("Cannot parse Curl command: " + curl.message);
            }
        }
    }
}

/**
 * actually makes the curl prettier
 * @param {string} text
 * @param {number} tabSize
 */
function prettifyCurl(text, tabSize) {
    try {
      if (!/curl\s/.test(text)) {
        throw {message: "curl word not found"};
      }
      const reg = /(\s+-\S+)?(\s+("|')[^\3]*?\3)?/g;

      return ["curl"].concat(text.match(reg))
        .map(s => { return s.trim() })
        .filter(s => { return s })
        .join(" \\\n" + Array(tabSize+1).join(" "));

    } catch (e) {
        return e;
    }
}

exports.prettyCurl = prettyCurl;
exports.prettifyCurl = prettifyCurl;
