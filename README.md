# Spotlight
This README will help you set up a deployment for Spotlight.

<p align='left'>
<!-- <img src='frontend/src/public/images/ft-badge.png' />
<br /> -->
<img style="border-radius: 24px" src='frontend/src/public/images/login.png'>
</p>
Spotlight is a digital tool for managing self-directed study blocks, designed to replace traditional paper-based systems with a secure, cloud-based solution. It provides administrators with valuable insights into how time is utilized during these blocks, enabling better data-driven decisions and fostering an environment where both students and educators can get smarter together.

# Application Deployment
In this section, you will learn how to deploy Spotlight on a local Windows machine. The same procedure should allow you to deploy in a cloud environment as well.
 
## Backend
The backend for Spotlight is written in PHP 7. It uses the Laravel (version 7) framework, and the Laravel Passport (version 9.2) library for authentication.

### First-time Setup for Dev Environment
  - PHP,  MySQL and Composer are required to run the backend. XAMPP is recommended to run both of these. https://www.apachefriends.org
    - Download and run the installer, choosing the latest version of PHP 7.
  - Install Composer, the PHP dependency manager: https://getcomposer.org
  - Download and install PHP dependencies:

 ```bash
 cd api
 composer install
 composer update
 ```

 - You need to create a new `.env` file:

```bash
cp .env.example .env
```

  - Run XAMPP. You only need Apache and MySQL to be running. If you have any conflicts trying to run MySQL, this is usually because another installation of MySQL is trying to bind to the same port. If this happens, stop MySQL and try again. On Linux this is done by running `sudo service mysql stop`. On Windows, this is done by pressing `Win` + `R` and entering `services.msc`, then stopping the MySQL service.
  - A database is required to store sample data. With MySQL and Apache running, visit http://localhost/phpmyadmin and create a new database. You can name the database anything you want, but it should match what's written as `DB_DATABASE` in your `.env` file (you can just name it "`spotlight`"). Leave the default settings for the database.
  - With the database created, we can now migrate our tables on to it:
  
```bash
php artisan migrate
```

 If the migration fails and you need to restart it, run `$ php artisan migrate:fresh`.

  - Now it's time to seed the database with sample data, when applicable:

```bash
pa db:seed
```

### Running the Backend Server
  - You can now run the backend:
  
```bash
php artisan serve
```

  - If you ever need to wipe the database, rebuild your tables and create new sample data, this can quickly be done using:

```bash
pa migrate:fresh --seed
```

> Note: You don't need to stop the backend to run migrations or refresh code.

## Frontend
The frontend is written in TypeScript. It uses the NextJS framework (version 9), which is a meta framework for ReactJS. NextJS uses NodeJS to run. The latest version(s) of NodeJS will not work for Next version 9. You can use NVM (Node Version Manager) to switch your Node version on the fly. Node 14 is a stable version for this project. With Node and NVM installed, run `nvm use 14` in your terminal.

### First-time Setup for Dev Environment

  - Download Javascript dependencies:

```bash
cd frontend
npm install
```

## Frontend - Running

```bash
npm run dev
```

 - The app should now be available in your browser. The default port is `3000`: http://localhost:3000

# Application Setup
With the application deployed, there are a few additional steps needed to get the app running.

## 1. Generate Appication Key
Run the following command:
```
php artisan key:generate
```

## 2. Table Migration
Run the table migrations. This is achieved using `php artisan migrate:fresh --seed`. The `--seed` flag will add example records to the table.

> **Note**: The default password for users is their username. For students, that is their student ID, and for teachers, that is their email address.

## 3. Table Setup
In Spotlight, the `settings` table stores data about your school's start and end dates.

### `settings`
Stores settings that are unique to your school. Most of these columns are unused, so you should only refer to `description` and `value`.

Example:


|id|key|description|type|min|max|value|group_id|authenticated|
|:----|:----|:----|:----|:----|:----|:----|:----|:----|
|1|school_name|School name|string|0|255|St. Andrews|1|FALSE|
|2|start_datetime|Year start|datetime|0|255|9/18/2023|1|TRUE|
|3|end_datetime|Year end|datetime|0|255|6/27/2024|1|TRUE|
|4|weekends|Include weekends|boolean|0|255|0|1|TRUE|
|5|include_days|Days included in schedule|weekdays|0|255|2,3,4,5,6|2|TRUE|
|6|air-check-in|Enable Air Check-in|boolean|0|255|1|3|TRUE|
|7|show-student-numbers|Show Student Numbers|boolean|0|255|0|4|TRUE|
|8|school_logo|School logo|string|0|255|standrews.jpg|1|FALSE|
|9|appointment_limit|Maximum number of appointments a student can have per block|number|0|255|1|2|TRUE|


### `blocks`
Because Spotlight supports multiple flex and non-flex blocks, a table is used to store these blocks.

 - `id`: A unique identifier for the record
 - `flex`: `TRUE`: if the block is a flex block, `FALSE` otherwise.
 - `label`: A human-readable label for the block.

Example:

|id|flex|label|
|--|----|-----|
|9|TRUE|Focus Block|

### `block_schedule`
Associated a block with all of its occurrences during the week.
 - `id`: A unique identifier for the record
 - `block_id`: A reference to the block being scheduled
 - `day_of_week`: Day of the week. Sunday = 1, Monday = 2, ..., Friday = 6.
 - `start`: Time of day that the block starts
 - `end`: Time of day that the block end

Example:

|id|block_id|day_of_week|start|end|
|--|-----|-|-------|--------|
|7 |9    |2|9:45:00|10:35:00|
|29|9|3|9:45:00|10:35:00|
|30|9|6|9:45:00|10:35:00|
|31|9|5|9:45:00|10:35:00|

## 4. Laravel Passport
With Laravel Passport installed and the migrations already run, you must initialize this library. Run the following command:

```
php artisan passport:install
```

You will get an output similar to the following:

> Password grant client created successfully.
>
> Client ID: 2
>
> Client Secret: aaaaaaaaaaaaaa...

Paste the **password grant client** details into your `.env` file, like so:

```
...
PASSPORT_CLIENT_ID=2
PASSPORT_CLIENT_SECRET=aaaaaaaaaaaaaa...
```

You can refer to this video for assistance: https://www.youtube.com/watch?v=HGh0cKEVXPI

## Bulk Adding Students
In Spotlight, users are able to upload CSV files that contain student information. Because there is no queue worker configured for the app, file uploads will not be processed automatically. If you wish to use the CSV upload feature, you must run the following command after the CSV file has been uploaded:

```
php artisan process-csv
```

Instead of doing this, you can simply use a query editor such as PHP MyAdmin or DBeaver to perform a bulk student or teacher upload, using seed data as a reference. Passwords are encrypted using bcrypt. Once all the students are added, you can reset their passwords from Spotlight using the password manager.
