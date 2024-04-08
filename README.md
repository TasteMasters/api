# Iniciar banco de dados

- Configure no **.env** o **DATABASE_URL** passando usuario, senha e banco de dados
- Tenha um banco de limpos sem nenhuma tablela
- Exercute o comando de migration

```
npm run migration:run
```

# Rodando o projeto

- Primeiro inicie o banco de dados, seguindo o exemplo acima.
- Primeiro crie um arquivo **.env** na raiz do projeto utilizando o **.env.example**

```
cp .env.example .env
```

- Instale as dependências

```
npm install
```

- Inicie a aplicação

```
npm run start:dev
```

# Testando

- Inicie a aplicação

```
npm run start:dev
```

- Em outro terminal rode os testes

```
npm run test
```

# Criando Migration

- Execute o comando

```
npm run migration:create
```

- Escreva no terminal oque a migration vai fazer
