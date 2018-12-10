'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
//import * as vscode from 'vscode';
import { window, commands, Disposable, SnippetString, ExtensionContext, StatusBarAlignment, StatusBarItem, TextDocument, TextEditor, ViewColumn, workspace, TextLine, TextEdit, Uri, Position } from 'vscode';
import { stringify } from 'querystring';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
    console.log('"Cegeka Helper" is now active!');
    let cegekaHelper = new ALHelper;
    let disp = commands.registerCommand('extension.convertSelection2Enum', () =>{
        cegekaHelper.convertSelection2Enum(window.activeTextEditor);
    })

    context.subscriptions.push(disp);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

class ALHelper 
{
    public convertSelection2Enum(editor: TextEditor)
    {        
        this.convertTextLine2Enum(editor);
    }

    public convertInputText2Enum()
    {
        
    }

    private convertTextLine2Enum(editor: TextEditor)
    {
        let line = editor.document.lineAt(editor.selection.active.line);
        if (line != null && line.text != null)
        {
            window.showInformationMessage(line.text);        
            let tokens = line.text.split(',');
            if (tokens[0] != null && tokens[0] != '' && tokens.length != 0 )
            {
                const snippet = new SnippetString();
                let cnt = 0;
                snippet.appendText('enum id name {\n');
                tokens.forEach(tok => {
                    snippet.appendText(`\tvalue(${cnt}; ${tok}) { Caption = '${tok}'; }\n`)  
                    cnt += 1;                                  
                });
                snippet.appendText('}');
                editor.insertSnippet(snippet);
               
            } else
                window.showErrorMessage('nothing to convert');

        } else
            window.showErrorMessage('Nothing to convert');
    }
}