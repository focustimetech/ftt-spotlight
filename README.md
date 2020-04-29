 # Spotlight
 This README will help you set up your dev environment for Spotlight
 
 ## Backend - First-time setup
  - PHP,  MySQL and Composer are required to run the backend. XAMPP is recommended to run both of these. https://www.apachefriends.org
    - Download and run the installer, choosing the latest version of PHP 7.
  - Install Composer, the PHP dependency manager: https://getcomposer.org
  - Download and install PHP dependencies:

 ```bash
 cd api
 composer install
 composer update
 ```

  - Create a new `.env` file:

```bash
cp .env.example .env
```

  - Run XAMPP. You only need Apache and MySQL to be running. If you have any conflicts trying to run MySQL, this is usually because another installation of MySQL is trying to bind to the same port. If this happens, stop MySQL and try again. On Linux this is done by running `sudo service mysql stop`. On Windows, this is done by pressing `Win` + `R` and entering `services.msc`, then stopping the MySQL service.
  - A database is required to store sample data. With MySQL and Apache running, visit http://localhost/phpmyadmin and create a new database. You can name the database anything you want, but it should match what's written as `DB_DATABASE` in your `.env` file -typically "`spotlight`". Leave the default settings for the database.
  - (OPTIONAL) Create an alias for `php artisan`, which you will type many, many times during development. I usually add `alias pa="php artisan"` to `~/.bashrc`.
  - With the database created, we can now migrate our tables on to it:
  
```bash
php artisan migrate
```

> Or use `pa migrate` if you're using the shortcut alias.

 If the migration fails and you need to restart it, run `$ php artisan migrate:fresh`.

  - Now it's time to seed the database with sample data, when applicable:

```bash
pa db:seed
```

## Backend - Running
  - You can now run the backend:
  
```bash
pa serve
```

  - If you ever need to wipe the database, rebuild your tables and create new sample data, this can quickly be done using:

```bash
pa migrate:fresh --seed
```

> Note: You don't need to stop the backend to run migrations or refresh code.

## Frontend - First-time setup

  - Download Javascript dependencies:

```bash
cd frontend
npm install
```

## Frontend - Running

```bash
npm run dev
```
