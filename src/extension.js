const vscode = require('vscode');

/**
 * Função principal chamada quando a extensão é ativada
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const provider = new TCHViewProvider(context.extensionUri);

  // Registra o painel lateral
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider('tch.view', provider)
  );

  // Comando para abrir mensagem ou interagir com o painel
  context.subscriptions.push(
    vscode.commands.registerCommand('tch.showSnippets', () => {
      vscode.window.showInformationMessage('Abra o painel da extensão Tiny Code Heroes na barra lateral!');
    })
  );
}

/**
 * Classe que cria a WebView lateral com os snippets
 */
class TCHViewProvider {
  constructor(extensionUri) {
    this.extensionUri = extensionUri;
  }

  /**
   * Monta o conteúdo da WebView
   * @param {vscode.WebviewView} webviewView
   */
  resolveWebviewView(webviewView) {
    webviewView.webview.options = {
      enableScripts: true
    };

    webviewView.webview.html = this.getHtml();
  }

  /**
   * Retorna o HTML com a listagem de snippets
   * Você pode dinamizar isso futuramente lendo os arquivos JSON
   */
  getHtml() {
    return `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: sans-serif;
            padding: 1rem;
          }
          h1 {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
          }
          h2 {
            margin-top: 2rem;
            font-size: 1.2rem;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.9rem;
          }
          th, td {
            border: 1px solid #ccc;
            padding: 6px 10px;
          }
          th {
            background-color: #f0f0f0;
          }
        </style>
      </head>
      <body>
        <h1>🦸 Tiny Code Heroes</h1>
        <p>Esses são os snippets disponíveis para HTML, CSS e JS:</p>

        <h2>HTML</h2>
        <table>
          <tr><th>Prefixo</th><th>Descrição</th></tr>
          <tr><td>tch-html5</td><td>TCH: Estrutura básica do HTML5</td></tr>
          <tr><td>tch-form</td><td>TCH: Formulário com input e botão</td></tr>
          <tr><td>tch-img</td><td>TCH: Tag de imagem com alt</td></tr>
        </table>

        <h2>CSS</h2>
        <table>
          <tr><th>Prefixo</th><th>Descrição</th></tr>
          <tr><td>tch-flexcenter</td><td>TCH: Centralização com Flexbox</td></tr>
          <tr><td>tch-grid2</td><td>TCH: Grid com 2 colunas</td></tr>
          <tr><td>tch-radius</td><td>TCH: Bordas arredondadas</td></tr>
        </table>

        <h2>JavaScript</h2>
        <table>
          <tr><th>Prefixo</th><th>Descrição</th></tr>
          <tr><td>tch-clg</td><td>TCH: console.log()</td></tr>
          <tr><td>tch-fetch</td><td>TCH: Requisição com Fetch API</td></tr>
          <tr><td>tch-afn</td><td>TCH: Função arrow</td></tr>
        </table>
      </body>
      </html>
    `;
  }
}

/**
 * Função chamada quando a extensão é desativada
 */
function deactivate() {}

module.exports = {
  activate,
  deactivate
};
