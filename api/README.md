 # API
 The API backend for Spotlight, which is created with Laravel.
 
 ## Getting Set Up
  - PHP and MySQL are required to run the backend. XAMPP is recommended to run both of these. https://www.apachefriends.org
    - Download the installer, choosing PHP 7.
	- Run the installer.
  - Install Composer, the PHP dependency manager: https://getcomposer.org
  - Download and install PHP dependencies:

 ```bash
 cd /api
 composer install
 composer update
 ```

  - Create a new `.env` file:

```bash
touch .env
```

  - Ask another dev on the project via Slack for the contents of this file, as it should not be checked into version control.
  - Run XAMPP. Apache and MySQL must be running, but that's it. If you have any conflicts trying to run MySQL, this is usually because another installation of MySQL is trying to bind to the same port. If this happens, stop MySQL and try again by running `sudo service mysql stop`.
  - A database is required to store sample data. With MySQL and Apache running, visit http://localhost/phpmyadmin and create a new database. The name of the database should match what's written in your `.env` file, which is typically `'spotlight'`.
  - With the database created, we can now migrate our tables to it:
  
```bash
php artisan migrate
```

    If the migration fails and you need to restart it, run `$ php artisan migrate:fresh`.
  - Now it's time to seed the database with sample data, when applicable:

```bash
php artisan db:seed
```

  - You can now run the backend:
  
```bash
php artisan serve
```

You can now begin running the frontend.
