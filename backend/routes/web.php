<?php

/** @var \Laravel\Lumen\Routing\Router $router */

$router->group(['prefix' => 'api'], function () use ($router) {
    $router->post('login', 'AuthController@login');
    $router->group(['middleware' => 'auth:api'], function ($router) {
        $router->post('logout', 'AuthController@logout');

        $router->group(['prefix' => 'order'], function () use ($router) {
            $router->get('/', 'OrderController@list');
            $router->post('/status-update', 'OrderController@updateStaus');
            $router->get('/ipn', 'OrderController@getOrderIPNDetails');
            $router->post('store', 'OrderController@store');
        });
    });
});

$router->get('/', function () use ($router) {
    return $router->app->version();
});
