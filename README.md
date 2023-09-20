# GPS
Esse projeto tem o objetivo de tratar os dados recebidos em hexadecimal com informações da localização de veículos dos usuários, transformando esses dados em objetos no formato .json.<br/><br/>
Na aplicação foram feitos um server e um client para poder simular a conexão dos dispositivos rastresdores dos veículos com os gateways. Além disso, temos um servidor web onde o usuário recebe as informações tratadas do seu veículo por meio do endpoin GET : api/v1/location/:device_id.<br/><br/>
<img src="/assets/estruturacao.png" /><br/><br/>
Os dados que são recebidos dos clients são tratados e, posteriormente, guardados no banco de dados, onde serão acessados pela nossa aplicação web. <br/><br/>
<img src="/assets/database.png" /><br/><br/>
O banco de dados, a arquitetura da aplicação e as tecnologias utilizadas, foram pensados com foco na escalabilidade do projeto, para facilitar novas implementações de endpoints furturos.
O prisma foi usado com o objetivo de poder criar mais tabelas de acordo com as necessidades futuras de forma rápida e fácil. Já a arquitetura, foi pensada para implementar outros endpoints de acordo com as necessidades do cliente, assim como as funções principais foram sparadas para poderem ser reutilizadas futuramente.
## Estrutura de pastas e solução
No projeto, temos como pasta principal a `src`, onde podemos encontrar:

- `App` : Roda e configura o Express com as rotas criadas, além de iniciar e encerrar o banco de dados.

- `Server`: Roda o servidor web e o servidor TCP, que recebe as informações dos clients.

- `Client`: Simula o envio de informação dos rastreadores para o server. 

- `Constants`: Aqui temos dados fixados que são usados na simulação dos rastreadores, na aplicação e nos testes.<br/>
Temos dados para a geração das mensagens e do ping em hexadecimal e para o armazenamento de usuários, na pasta `generationTest`, que é utilizado na criação banco de dados para teste (via seed). Além disso, aqui guardamos as informaçoes das portas de conexão e outras constants usadas no projeto.

- `Database`: Faz a conexão da aplicação com o banco de dados.

- `Protocols`: Aqui são armazenados os types do TypeScript que criamos, ou criaremos, para usar no projeto.

- `Router`: As rotas são definidas e os controlers são chamdos para continuar o processo. Também chamamos a função de validação do usuário e outras funções do middleware caso necessário.

- `Controller`: Responsável por receber as requisiçoes e enviar as respostas. O arquivo `location` recebe o device_id e o id de cada usuário, chama a função da service e retorna as informações do banco de dados para o usuário. O de `login` recebe email e password, que são enviados pra service, e retorna o token do usuário.

- `Service`: Reponsável pelas regras de negócio. A service do `location`, especificamente, recebe o device_id, confirma se não tem erro nesse dado (device id não é do usuário ou não existe, por exemplo) e depois devolve o dado para o controler. 
Já a service do `login` é responsável por encontrar a senha criptografada do usuário, de acordo com o email que foi passado, comparar essa senha com a senha passada pelo usuário e retornar um token JWT válido para esse usuário caso a senha esteja correta.<br/>
Por último, temos a service do `server`, que é responsável por descriptografar a mensagem recebida do server e armazená-la no banco de dados como informação de localização.

- `Repository`: Responsável por buscar os dados no banco de dados e retornar para a service.

Também temos o `prisma` que tem 2 arquivos principais, que são:

-  `Schema`: Aqui são criadas as tabelas do banco de dados e seus dados são especificados conforme a necessidade da aplicação.

- `Seed`: Aqui iniciamos nossa aplicação já com alguns dados apenas para realizarmos testes manuais. Esses dados são armazenados no banco de teste que é passado no `.env.test`

Por fim, temos a pasta tests, que contém os arquivos que testam a aplicação. Nela estão presentes:

- `Factories`: Contém funçoes que nos ajudam nos testes.

- `Unit`: Contém os testes unitários.

## Detalhes da solução adotada
- Essa implementação foi feita dessa forma para solucionar alguns problemas principais, que são: a ausência dos dispositivos rastreadores reais, tratamento dos dados recebidos em hexadecimal, validação do usuário para acessar apenas os dados do seu veículo e armazenamento das informações essenciais.<br/><br/>
- Assim, foi feita uma simulação que começa com o seed, no qual ele guarda no banco de dados de test os cadastros do usuários (pode ser alterado no arquivo `constants/generationTests/users`) seguindo o modelo existente no `schema.prisma`. Assim, a nossa simulação de client usa esses dados para poder gerar mensagens hexadecimais e enviá-las para o server.Além das mensagens, o client também cria os heartbeats para enviar para o server.
Dessa forma, temos os dados dos veículos dos usuários cadastrados sendo atualizados enquanto o client está online. É importante salientar que esses dados são apenas uma simulação para auxiliar a visualização do funcionamento da api, logo não apresentam informações realmente válidas (são dados falsos) <br/><br/>
- O próximo passo é criar um token para poder continuar com os testes, pois o usuário só pode ter acesso aos dados do seu próprio veículo. Assim, Podemos pegar o email e a senha do usuário, existentes no  arquivo `users`, e utilizar como corpo para o endpoint `POST /api/v1/login`, que nos retorna um token válido, criado com a biblioteca jsonwebtoken, para aquele usuário. O token guarda a informação do id do usuário para poder acessar as suas informações e verificar se o device_id que será acessado é mesmo do usuário que quer acessá-lo. Assim, garantimos que nenhum dispositivo será acessado por alguém que não é dono dele.
- Ao finalizar esses passos, podemos colocar o token como headers da requisição (Bearer Token) e acessar a roda `GET /api/v1/location/:device_id` com o device id do usuário. Os casos em que o usuário não pode ou não consegue acessar as informações do seu dispositivo são tratados e reportados, gerando erros de acordo com o protocolo HTTP.

- Observações: A rota de login do usuário foi criada apenas para simular um usuário logado no sistema.

## Rodando a aplicação (Modo Teste)
O passo inicial do nosso projeto é criar um `.env.test` para adicionar e configurar as seguintes variáveis de ambiente:
- `SECRET_KEY`: Pode ser qualquer string, como 'MySecret' por exemplo.

- `PORT`: Número da porta do servidor web.
- `TCP_PORT`: número da porta do servidor TCP.
- `DATABASE_URL`: O endereço do seu banco de dados postegreSQL no formato `postgresql://<nome-do-usuario>:<senha-do-banco>@<nome-do-servidor>:<porta-do-banco>/<nome-do-banco>?schema=public`.

Depois de configurar as variáveis de ambiente você deve instalar as dependencias:
```bash
npm i
```
Agora você pode gerar o Prisma Client com o comando:
```bash
npm run prisma:generate:test
```
E criar as migrações do prisma para o seu postgres com:
```bash
npm run prisma:migrate:test
```
Assim, seu  código está pronto para funcionar. Basta usar os comandos abaixo para criar os dados do banco de teste ( que podem ser alterados na pasta `src/constants/users.ts`) e, posteriormente, colocar os servidores web e o TCP no ar.
```bash
npm run test:seed
```
```bash
npm run dev:test
``` 
Agora é só colocar o client para funcionar também, para simular os rastreadores:
```bash
npm run dev:client
```
Assim já está tudo funcionando.<br/> Use a rota `POST /api/v1/login` com o corpo abaixo, conforme foi especificado anteriormente, para conseguir o token de autenticação e fazer as requisições na rota `GET /api/v1/location/0E678B`.
```bash
{
    email:"user1@gmail.com",
    password: "123456"
}
``` 
 Assim, nesse exemplo, você terá acesso às informações do user1 que estão sendo geradas pelo nosso client.
 ## Rodando a aplicação (Modo Desenvolvimento)
Para rodar a aplicação no modo de denvolvimento basta configurar o `.env` com as mesmas variáveis de ambiente do `.env.test`, porém colocando o banco de dados de desenvolvimento no lugar.<br/>
Depois vamos rodar os comandos:
```bash
npm run prisma:generate:test
```
```bash
npm run prisma:migrate:test
```
Assim, criamos e configuramos o nosso banco de dados de desenvolvimento. Agora é rodar o comando:
```bash
npm run dev
```
Assim os servidores web e TCP já estão no ar e você já pode começar a fazer as suas requisições. É importante lembrar que o banco de dados de desenvolvimento estará vazio e as requisiçoes só vão funcionar se já houver usuários cadastrados no banco.

## Execução dos testes
Os testes criados nessa aplicação servem para verificar se as regras de negócio estão sendo cumpridas conforme a documentação passada. Por conta disso, optei por realizar testes unitários que fazem exatamente essa verificação.<br/><br/>
Foram feitos 3 testes:
- O primeiro simula um usuário tentando acessar um dispositivo que não é dele.

- O segundo simula um usuário tentando acessar um dispositivo que não existe.

- E, por último, o terceiro teste simula um caso de sucesso, onde o usuário tenta acessar um dispostivo que é dele. Nesse caso, deixei as variáveis que compõem a informação a ser passada para o usuário em aberto, com a intenção de alterar manualmente e verificar casos específicos para podermos observar o comportamento da aplicação. Mas também é possível fazer esse teste automaticamente criando dados aleatórios. Usei a primeira opção com o objetivo de deixar a pessoa que vai executar os testes modificar as informações a serem testadas.
Para rodar os testes basta colocar no prompt:
```bash
npm run test
```
