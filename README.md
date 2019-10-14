# Recrutei

Esse é uma aplicação desenvolvida para o teste de Desenvolvedor Sr. da Recrutei de Uberlândia

# Instalação

Para instalar a aplicação é necessário que você tenha do Docker instalado na sua máquina.

Caso não tenha o Docker instalado, acesse o link [https://www.docker.com] para instalar.

# Execução

1.  `git clone git@bitbucket.org:joaopedrorocha/recrutei-docker.git` *(clone o projeto para a sua máquina local)*
2. `cd recrutei-docker` *(abra o diretório da aplicação)*
3. `chmod +x build.sh` *(dá permissão ao arquivo para executar via sh)*
4. `./build.sh` *(executa o arquivo que faz o build do projeto)*
5. `docker-compose up` *(execute o comando para iniciar o servidor aplicação)*
6. `AGUARDE` *(veja Obs. 2)*
6. `http://localhost:8000` *(link de navegação)*

Obs.: Será criada 2 instâncias para as 2 aplicações existentes: backend e frontend. O backend estará rodando na porta 3000 e o frontend estará rodando na porta 8000.

Obs. 2: Ao executar o comando que roda os servidores da aplicação você irá ver um Log de servidor para back_1 e front_1. O backend estará pronto ao ver a mensagem `MongoDB Connected`. O frontend estará pronto ao ver a mensagem `Compiled` ou `Compiled with warnings`. Ambos os ambientes estão em modo de Desenvolvimento, não foram configurados em modo de Produção.
