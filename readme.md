# 👟 FastFeet Project

FastFeet Project for [**@rocketseat**](www.rocketseat.com.br) certification.

## 🗾 Images

<h1 align="center">
  <img src="backend/src/assets/web.png" alt="web"/>
  <img src="backend/src/assets/mobile.png" alt="mobile" />
<h1>

## 📃 Overview

This repository has tree folders:

- **backend** - A folder for backend project made in NodeJS and Express.
- **frontend** - A folder for web project made in React.
- **mobile** - A folder for mobile project made in React Native.

## 📋 Requirements

- **Yarn** or npm;
- **Postgres** - Relational database
- **Redis** - Non-relational database
- **E-mail** - I use **mailtrap** for development

## 🧾 How to run (step by step)

- **Clone** this repository;

```bash
# clone the repository
git clone https://github.com/henriqueantonio/fastfeet.git

```

- **Run the backend**:

```bash
  # enter the repository and use yarn tu run the dependencies
  cd fastfeet/backend && yarn

  # copy the .env.example and make your own .env (configuring Postgres, Redis, Mail and your APP_SECRET)

  # run the database migrations
  yarn sequelize db:migrate

  # run the seeds migrations
  yarn sequelize db:seed:all

  # run the server
  yarn dev

  # run the queue to send e-mails
  yarn queue
```

- **Run the web**:

```bash
  # enter the repository and use yarn tu run the dependencies
  cd fastfeet/web && yarn

  # run the application
  yarn start
```

- **Run the mobile**:

```bash
  # enter the repository and use yarn tu run the dependencies
  cd fastfeet/mobile && yarn

  # run the application on ios
  yarn react-native run-ios

  # run the application on android
  yarn react-native run-android
```
