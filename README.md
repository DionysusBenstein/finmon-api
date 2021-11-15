# Finmon API

## **Client information**

### PATH

> GET /{bank}/user/info


### DESCRIPTION
Get basic info about client in {bank} (for insanse 'mono'). Limit on the use of the function no more than once every 60 seconds.

Response Example (200 OK)
``` json
{
  "id": "3MSaMMtczs",
  "name": "string",
  "webHookUrl": "string",
  "accounts": [
    {
      "id": "kKGVoZuHWzqVoZuH",
      "balance": 10000000,
      "creditLimit": 10000000,
      "type": "black",
      "currencyCode": 980,
      "cashbackType": "UAH"
    }
  ]
}
````
<br/>

## **Transactions list**
### PATH

> GET /{bank}/transactions/{account}/{from}/{to}


### DESCRIPTION
Get transactions list in {bank} (for insanse 'mono') for time from {from} to {to} Unix time format. Maximum time for which it is possible to receive a statement 31 days + 1 hour (2682000 seconds) Limit on the use of the function no more than once every 60 seconds.

Response Example (200 OK)
``` json
[
  {
    "id": "ZuHWzqkKGVo=",
    "category": "Покупка говна",
    "amount": "-95000",
  }
]
````