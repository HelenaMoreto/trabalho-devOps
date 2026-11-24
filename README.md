# Portfólio Profissional | Trabalho de DevOps

![Status do CI](https://github.com/SEU_USUARIO/SEU_REPOSITORIO/actions/workflows/ci.yml/badge.svg)

Site estático com HTML e CSS, integração contínua em Pull Requests e publicação automática no GitHub Pages.

## Personalização

1. Troque o nome, descrições e projetos em `index.html` conforme necessário.
2. Substitua os links genéricos para GitHub e LinkedIn pelos seus próprios perfis.
3. Edite a primeira linha do README para deixar o **badge no topo** e substitua `SEU_USUARIO/SEU_REPOSITORIO` pelo caminho real do repositório.

## Comandos locais

Instale Node.js 20 ou 22 e execute:

```bash
npm install --no-audit --no-fund
npm run lint
npm run check:links
```

## Fluxo GitHub Actions

- **CI:** dispara apenas em Pull Requests destinados a `main`; testa no Node 20 e 22. Confere `index.html`, tamanho de arquivos (com `find`), termos proibidos, HTML e links/imagens.
- **CD:** dispara em `push` para `main` e publica os arquivos estáticos com GitHub Pages.
- **Notificação:** em caso de falha no deploy, publica uma mensagem no Discord quando houver secret `DISCORD_WEBHOOK_URL` configurado.

## Configurações indispensáveis no GitHub

1. Crie um repositório e envie o conteúdo deste projeto para a branch `main`.
2. Em **Settings → Pages → Build and deployment**, escolha **GitHub Actions** como origem da publicação.
3. Em **Settings → Branches → Add branch protection rule** (ou **Settings → Rules → Rulesets**), selecione `main`, ative **Require a pull request before merging** e **Require status checks to pass before merging**. Adicione os checks `validar (Node 20)` e `validar (Node 22)`. Se for oferecido, ative também o requisito de branch atualizada. As restrições de proteção podem depender do tipo e plano do repositório.
4. Em **Settings → Secrets and variables → Actions**, opcionalmente crie `DISCORD_WEBHOOK_URL` com um webhook de canal Discord (não coloque a URL no código).
5. Em **Settings → Collaborators / Collaborators and teams**, convide `09116428-collab` e confirme o envio do convite.

## Evidências exigidas

1. Abra uma branch nova, como `teste-falha`, e faça uma alteração intencional em `index.html` (por exemplo, remova o fechamento `</h1>`). Abra um Pull Request para `main`, e tire um print da verificação CI vermelha. **Não faça merge do código quebrado.**
2. Corrija o HTML no mesmo Pull Request. Aguarde o CI passar e realize o merge para `main`.
3. Tire um print da aba **Actions** mostrando o deploy verde.
4. Entregue o endereço exibido em **Settings → Pages**, normalmente `https://SEU_USUARIO.github.io/SEU_REPOSITORIO/`, além dos prints e do repositório.

> **Atenção:** os prints reais, o link publicado e a configuração de proteção dependem de ações dentro do seu repositório GitHub; os arquivos do ZIP não simulam essas evidências.
