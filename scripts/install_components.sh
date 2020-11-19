#!/bin/bash
sudo su

cd /node-weather-app

sudo apt-get update
sudo apt install nodejs
sudo apt install npm

npm init
npm install express
npm install pm2 -ggit 