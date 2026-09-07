# Planejamento
1. Ler e interpretar a demanda em inglês, que não é meu idioma principal. Até o momento, não foi necessário buscar nenhuma tradução para a leitura. Terei que escrever em inglês a documentação, o que é uma dificuldade e devo recorrer a uma tradução.

2. Compreendi que o projeto terá que haver frontend e backend no mesmo repositório. Por tanto, decidi criar uma pasta para cada: `/frontend` onde terá os recursos para React com TypeScript e a pasta `/backend` para rodar o Python.

3. Observação pessoal: O projeto pede Python para o Backend, tenho mais prática com TypeScript e Java então terei que revisar videos e pesquisar para aplica-la da melhor forma.

## Problema
Algumas operações precisam de um tempo para serem concluídas, como o processamento dos dados e validações. Assim, o usuário pode ficar esperando o processo acontecer pra ter algum tipo de retorno, como ficar parado em uma tela parada, o que não é atrativo. Então, retornar pro usuário um resultado rápido e enquanto espera, retornar sinais de progressão é o ideal.

Então eu devo: Receber os dados enviados pelo usuário, garantir que o backend receba rapidamente, que tudo rode em segundo plano e que o usuário possa ver o progresso de 0 a 100%, ler as logs e o status final.