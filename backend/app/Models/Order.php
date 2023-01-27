<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    /**
     *
     * @var string[]
     */
    protected $fillable = [
        'product_name',
        'product_description',
        'amount',
        'customer_name',
        'customer_email',
        'customer_phone',
        'street',
        'city',
        'state',
        'zipcode',
        'country',
    ];
}
