# Bank_Online_Service

## Quick Start

Open the project and run terminal following below
```
npm install
npm start
```
go to 
http://localhost:8080/

## Run in docker container
* Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop/).
* Open the project and run terminal following below

```
docker compose up
```
go to 
http://localhost:8080/

## First time setup 
### Windows
* Download and install [Node.js](https://nodejs.org/en/).
* Download and install [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
* Download and install [MongoDB](https://www.mongodb.com/try/download/community).
* Download Project Bank_Online_Service
### MacOS
* Install Node.JS
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
nvm install 16
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```
* Install MongoDB
```
brew install mongodb-community
```
* Run service MongoDB
```
brew services start mongodb-community
```
### Ubuntu
* Install node 
```
curl -sL https://deb.nodesource.com/setup_16.x | sudo bash -
sudo apt -y install nodejs
```

* Install MongoDB
```
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
```
 * if you receive an error indicating that gnupg is not installed, you can:
```
sudo apt install gnupg
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
```
 * Create a list file for MongoDB.
```
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
```
 * Reload local package database.
```
sudo apt update
```
 * Install the MongoDB packages.
```
sudo apt install -y mongodb-org
```
 * Start the MongoDB
```
sudo systemctl start mongod
```
 * Set MongoDB will start following a system reboot 
```
sudo systemctl enable mongod
```
### In project
* Install the dependencies with npm. For server
```
npm install
```
* Run the server.
```
npm start
```
Then go to
http://localhost:8080/
## Username and password for login
* Account 1
  * Username : User
  * Password : user12345
* Account 2
  * Username : User2
  * Password : user12345
* Account 3
  * Username : Teerat89
  * Password : user12345
## Database
* Database name : **BankDB**
  * Collection :  **transactions** , **users**
  * Example data in users collection


![image](https://user-images.githubusercontent.com/90314670/225601673-2735a9b9-bcc8-4a8e-9ca6-a69aece8031a.png)
  * Example data in transactions


![image](https://user-images.githubusercontent.com/90314670/225601547-b6c22e36-ebfa-4e44-8700-8a20b42bfb02.png)
![image](https://user-images.githubusercontent.com/90314670/225601585-0ec94cf3-5769-42fc-af22-a37e0cfea029.png)

