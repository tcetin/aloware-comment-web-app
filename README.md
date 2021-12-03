## **Aloware Code Challenge Solution**

#### **Solution Description**

It is a web application of the code challenge solution. It is developed in Laravel Framework 8.65 and ReactJS as SPA.

It is developed with TDD(Test Driven Development) methodology.

Repository pattern is used for accessing to data source for CRUD operations.

In most cases single-responsibility principle is implemented for the class methods.

#### **Getting Started**

-   Install composer php dependencies with `composer install` command.

-   To run with internal laravel's php server you can just use `php artisan serve`

If you choose this option to run please change `.env` enviroment like in below:

```
...other configurations

APP_URL=http:127.0.0.1:8000
MIX_PROD_URL=http://127.0.0.1:8000
MIX_APP_URL=http://127.0.0.1:8000

... other configurations
```

-   After this configuration has been set it needs to install node packages like in below:

```
 npm install && npm run dev
```

### **Database**

-   Create a MySQL database with `aloware` schema

-   Set `.env` file db configurations like this:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=aloware
DB_USERNAME=root

```

-   Migrate tables to the database with migration command:

```
php artisan migrate
```

#### **Backend**

To create Repository for comments `CommentsRepository` created under the `App\Repositories` directory. BaseRepository implemented with suitable contracts.

BaseRepository handles basic CRUD operations.

CommentsController used for consuming api endpoints requests by injecting `CommentsRepository.`

#### **Frontend**

The project created as SPA project in frontend with ReactJS. `CommentList` is component created to list comments. `CommentForm` is component created to make a store request to create comment. `Comment` is component created to show a comment.

### **Testing**

`CommentTest.php` is created for feature testing purpose. All test crud operations are handling with in memory sqlite database.
