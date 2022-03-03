# Interview Scheduler

This project is a React Interview Scheduler. Use this as a frontend to create, delete, 
and edit interview appointments in our powerful backend "scheduler-api"!

## Screens

Inspecting an appointment
!["Inspect"](https://github.com/loganwoolf/scheduler/blob/master/docs/add.png?raw=true)

Adding/editing an appointment
!["Add"](https://github.com/loganwoolf/scheduler/blob/master/docs/delete.png?raw=true)

Saving changes
!["Save"](https://github.com/loganwoolf/scheduler/blob/master/docs/save.png?raw=true)

Confirming appointment removal
!["Delete"](https://github.com/loganwoolf/scheduler/blob/master/docs/delete.png?raw=true)

## Setup

Clone from github
```
git clone git@github.com:loganwoolf/scheduler.git

# --or, if you can't use SSH--

git clone https://github.com/loganwoolf/scheduler.git
```

Install dependencies 
```
npm install
```

## Running Webpack Development Server

```
npm start
```
Make sure the backend server and database are running,
then visit `http://localhost:8000` in your browser

## Running Jest Test Framework

```
npm test
```

## Running Storybook Visual Testbed

```
npm run storybook
```
then visit `http://localhost:9009` in your browser