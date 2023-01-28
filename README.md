## Installation Steps

Requirements:

- php8
- React18

First clone the project from github.

```bash
 https://github.com/smdurjoy/portpos-payment.git
```

Now go to the project directory and run the following commands.

```bash
 cd backend
 composer install
 cp .env.example .env
 php artisan key:generate
 php artisan migrate
 php artisan db:seed
 php artisan jwt:secret
 php artisan serve
```

It should run the backend server. To complete the backend setup you need to update the .env file with the portpos API credentials by using the following keys:

```bash
 PORT_POS_SANDBOX_URL
 PORT_POS_APP_KEY
 PORT_POS_SECRET_KEY
```

Now go back to the root directory run the following commands for frontend setup.

```bash
 cd frontend
 npm install
 npm start
```

It should run the project on http://localhost:3000 and you can see the login page.
Default email and password for login: Email: admin@admin.com, Password: 12345
