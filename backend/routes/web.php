<?php

/** @var \Laravel\Lumen\Routing\Router $router */

$router->group(['prefix' => 'api'], function () use ($router) {
    $router->post('login', 'AuthController@login');
    $router->group(['middleware' => 'auth:api'], function ($router) {
        $router->post('logout', 'AuthController@logout');
    });
});

$router->get('/', function () use ($router) {
    return $router->app->version();
});
