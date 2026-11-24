# Exercício 7 - Integração e Entrega Contínua

## Questão 1
No package.json, o script de build foi configurado como `CI=false node build.mjs`. O exemplo usa Node.js e uma verificação de formatação que emite um aviso por espaços no final de uma linha do HTML. Em modo CI rígido, esse aviso interrompe o build; em modo não rígido, o arquivo de produção é gerado normalmente.

## Questão 2
O comando adicionado antes do script foi `CI=false`. O workflow demonstra o comportamento rígido e executa o build de produção com a variável desativada. Consulte a aba Actions para confirmar o resultado real.

## Questão 3
Usar CI=false indiscriminadamente pode permitir avisos importantes, acumular problemas técnicos e reduzir a confiabilidade do software. Deve ser usado temporariamente, apenas para avisos conhecidos e avaliados que não comprometam o funcionamento, enquanto a causa é corrigida. A variável não desativa todos os erros nem substitui testes de qualidade.

## Execução
No runner Ubuntu, execute `npm run build` dentro desta pasta. A saída será `dist/index.html`. O comando `npm run build:strict` demonstra a falha por aviso. Este exemplo não altera o CI do portfólio original.
