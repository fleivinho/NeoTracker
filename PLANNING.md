# Planejamento

1. Ler e interpretar a demanda em inglês, que não é meu idioma principal. Até o momento, não foi necessário buscar nenhuma tradução para a leitura. Terei que escrever em inglês a documentação, o que é uma dificuldade e devo recorrer a uma tradução.

2. Compreendi que o projeto terá que haver frontend e backend no mesmo repositório. Por tanto, decidi criar uma pasta para cada: `/frontend` onde terá os recursos para React com TypeScript e a pasta `/backend` para rodar o Python.

3. O projeto pede Python para o Backend, tenho mais prática com TypeScript  então terei que revisar videos e pesquisar para aplica-la da melhor forma.

4. Considerei utilizar o Vite no frontend, porém optei pelo Next.js pela praticidade, familiaridade com a tecnologia e pelos recursos oferecidos pelo framework. Além de proporcionar uma estrutura moderna e organizada para React e suas rotas/páginas. Também optei por utilizar Tailwind CSS para estilizar o frontend, pois acredito que deixará a criação dos componentes mais prática.

5. Pretendo fazer o site com um visual clean, parecido com meus outros projetos, como: https://maissocioludo-front.vercel.app/.

6. No backend, pretendo utilizar FastAPI para criar os endpoints da API. As requisições serão armazenadas em memória, como solicitado, provavelmente utilizando um dicionário onde o identificador da requisição será utilizado como chave.

7. O processamento não poderá bloquear a API. Então, após a criação de uma requisição, o backend deverá retornar rapidamente o ID e o status inicial, enquanto o processamento continuará em segundo plano e atualizará progressivamente o status, progresso, logs e resultado armazenados.

8. Na tela de detalhes, o frontend deverá consultar o backend em um intervalo de tempo para atualizar o progresso da requisição. Deve parar quando a requisição chegar em um status final:  `completed` ou `error`.

9. Uma dificuldade que espero encontrar será o cancelamento de uma requisição enquanto ela estiver sendo processada. Será necessário garantir que o processamento consiga identificar que houve um cancelamento e não continue alterando os dados da requisição depois disso.

10. Também pretendo separar os tipos retornados pela API em interfaces ou types no frontend, evitando o uso de `any` e garantindo principalmente a tipagem dos possíveis valores de status.

## Problema

Algumas operações precisam de um tempo para serem concluídas, como o processamento dos dados e validações. Assim, o usuário pode ficar esperando o processo acontecer pra ter algum tipo de retorno, como ficar parado em uma tela parada, o que não é atrativo. Então, retornar pro usuário um resultado rápido e enquanto espera, retornar sinais de progressão é o ideal.

Então eu devo: Receber os dados enviados pelo usuário, garantir que o backend receba rapidamente, que tudo rode em segundo plano e que o usuário possa ver o progresso de 0 a 100%, ler as logs e o status final.

## Fluxo esperado

O usuário deverá enviar uma lista de números através do frontend. O frontend enviará esses dados para o backend através do endpoint de criação.

O backend deverá criar a requisição inicialmente como `pending`, armazená-la em memória e iniciar o processamento em segundo plano, retornando imediatamente para o frontend o identificador da requisição e seu status.

Durante o processamento, a requisição deverá passar pelos passos definidos no problema, atualizando o progresso e adicionando novos logs.

O frontend poderá utilizar o ID recebid para acessar a página de detalhes da requisição. Nessa página, serão feitas consultas periódicas ao backend para acompanhar o andamento até que o processamento seja concluído ou ocorra algum erro.

## Estrutura inicial

A estrutura inicial que pretendo seguir será:

```
frontend/
backend/
PLANNING.md
README.md
```
