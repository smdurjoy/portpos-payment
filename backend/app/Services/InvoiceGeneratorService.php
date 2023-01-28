<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\BadResponseException;
use GuzzleHttp\Exception\GuzzleException;

class InvoiceGeneratorService
{
    private $client;
    private $body;

    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => 'https://api-sandbox.portwallet.com',
            'headers' => [
                'Authorization' => $this->getAuthKey(),
            ],
        ]);
        print_r($this->getAuthKey());
        return $this;
    }

    /**
     * @return static
     */
    public static function init(): self
    {
        return new static();
    }

    /**
     * @return Client
     */
    private function getClient(): Client
    {
        return $this->client;
    }

    /**
     * @param string $method
     * @param string $url
     * @param array $options
     * @throws GuzzleException
     */
    private function getRequest(string $method, string $url, array $options = [])
    {
        return $this->getClient()->request($method, $url, $options);
    }

    /**
     * @return string
     */
    private function getAuthKey(): string
    {
        return 'Bearer ' . base64_encode(env('PORT_POS_APP_KEY') . ':' . md5(env('PORT_POS_SECRET_KEY') . time()));
    }

    /**
     * @param $body
     * @return $this
     */
    public function setBody($body): self
    {
        $this->body = $body;
        return $this;
    }

    /**
     * @return mixed
     */
    private function getBody()
    {
        return $this->body;
    }

    /**
     * @throws GuzzleException
     */
    public function generateInvoice()
    {
        try {
            return $this->getRequest('POST', 'payment/v2/invoice', [
                'json' => $this->getBody(),
                'allow_redirects' => true
            ]);
        } catch (BadResponseException $exception) {
            return $exception->getMessage();
        }
    }

    /**
     * @param $invoiceId
     * @param $amount
     * @throws GuzzleException
     */
    public function getIPN($invoiceId, $amount)
    {
        try {
            return $this->getRequest('GET', "payment/v2/invoice/ipn/$invoiceId/$amount");
        } catch (BadResponseException $exception) {
            return $exception->getMessage();
        }
    }
}
