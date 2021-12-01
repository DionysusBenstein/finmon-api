# Finmon API

### Bank integrations:
- [x] Mono
- [x] Privat
- [ ] Revolut 

API Endpoint
>https://finmon-api.herokuapp.com/

## **Client information**

### PATH

> GET /{bank}/user/info


### DESCRIPTION
Get basic info about client in {bank} (for instanse 'mono'). Limit on the use of the function no more than once every 60 seconds.

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
****

### DESCRIPTION
Get transactions list in {bank} (for instance 'mono') for time from {from} to {to} (YYYY-MM-DD). Maximum time for which it is possible to receive a statement 31 days + 1 hour (2682000 seconds). Limit on the use of the function no more than once every 60 seconds.

Response Example (200 OK)
``` json
[
  {
    "id": "ZuHWzqkKGVo=",
    "time": 1554466347,
    "category": "Покупка говна",
    "amount": "-95000",
  }
]
````
<br/>

## **Transactions list in a month**
### PATH

> GET /{bank}/transactions/{account}
****

### DESCRIPTION
Get transactions list in {bank} (for instance 'mono') in a month. Limit on the use of the function no more than once every 60 seconds.

Response Example (200 OK)
``` json
[
  {
    "id": "TM0_tRHBTqsCe8j5",
    "time": 1554466347,
    "category": "Техасская мазня говной",
    "amount": "-55000",
  }
]
````