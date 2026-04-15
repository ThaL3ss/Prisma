npm add typescript tsx prisma -D

add => alias para o install
-D => pacotes como devDependencies

npm install -D typescript tsx prisma  // equivalente a linha #1

*Melhorar autocomplete no editor*
npm install -D @types/node

*Coração do typescript* 
npx tsc --init

*Executando o prisma* 
npx prisma init --datasource-provider sqlite --output ../generated/prisma
npx prisma migrate dev --name init


## npx prisma studio
^---> comanddo para abrir uma especie de workbench direto no navegador

*Instalando prisma client*
npm install @prisma/client

*Instalando fastify*
npm install fastify

```diff
+ Cadastro criado com sucesso
- Erro ao conectar com o banco








🔴 erro
🟢 sucesso
🟡 atenção