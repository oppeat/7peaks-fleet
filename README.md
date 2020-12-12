# Project Configuration
- Clone Project from github, and extract the zip folder

## Setting up MySQL
- Make sure that MySQL client is installed and running on its default port 3306
- Import database schema from 7Peaks_20201212.sql 

## Running backend Server
- Open fleet-backend folder
- Open server.js file with editor
- Change database authentication to match your auhentication e.g. user: 'root', password: 'root',
- Open terminal or cmd in this folder, type `npm i && npm start` if the console print `Application is running on port 9000
DB Connected!` this is done. 

### Backend API
1. URL: `/vehicle/register` Method: `POST` (Register Vehicle to User)
- Body { userId: string, vehicleId: string}

## Running frontend Client
- Open fleet-frontend folder
- Open terminal or cmd in this folder, type `npm i && npm start` -> the web should be running automatically.
