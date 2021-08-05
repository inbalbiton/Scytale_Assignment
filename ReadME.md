# **Scytale Assignment - BE**

This project was built using Node JS, By connecting to a mongoDB database.
To start, run the "**npm start**" command in the terminal, when you are in the **"scytale"** folder.

Runs the app in the development mode.\
Open [http://localhost:3004](http://localhost:3004) to view it in the browser.

**Npm packages I used:**
* npm install dotenv
* npm install express
* npm install mongodb
* npm install cors
* npm install morgan

## **PullRequests Module**

The operation of the server is divided into different modules, where in our case we have one module "prs" that will be a prefix to all the routers that currently exist on the server.
The goal is to make a division between different models that can be added over time when each module is responsible for a particular collection of routers.
The main module on the server is the "PullRequest" module which consists of 2 main files:
* "**pr.js**" - In this cube all the functions of the routers belonging to the beginning of "\prs" are implemented.
* "**DBUtil**" - This file implements various functions that access the database in order to manage the data and retrieve information.

## **DB Controller**

The central controller which performs accesses to the mongoDB database.
Connection to the database is done via a URL link, which is in the dotnev file, and can be changed if you want to connect to another database.
The controller accesses a collection called PullRequests in a database called "ScytaleDB".
In this collection we have documents with the following fields:
* object ID - Mongo's default ID
* PR_Number - Request ID
* Title
* Description
* Author
* Status
* Labels
* Creation_date

## **Routes**
* **PSOT** - **"/prs/newpr"**: add new Pull Request to server.
* **GET** - **"/prs/all?status={string}&labels={string}&sorted={string}&order={int}"**: get all the Pull Requests in the server by Filters
* **GET** - **"/prs/allStatus"**: get all the unique Status in the server
* **GET** - **"/prs/allLabels"**: get all the unique Labels in the server


