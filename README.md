# Finmon API

### Bank integrations:
- [x] Mono
- [x] Privat
- [ ] Revolut 

Base URL:
> http://finmonapi-env.eba-ndgcrque.us-east-2.elasticbeanstalk.com/

## **Client information**

### PATH

> GET /banks/{bank}/user/info


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

> GET /banks/{bank}/transactions/{account}/{from}/{to}
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

> GET /banks/{bank}/transactions/{account}
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
<br/>

## **User registration**
### PATH

> POST /auth/registration
****

### DESCRIPTION
Add user to database.

Body Example
``` json
{
  "email": "Vasyan1488_Tesak@**gmail**.com",
  "password": "penisHerDavalka123",
  "plan": "free",
}
````

Response Example (200 OK)
``` json
{
  "message": "Registration success"
}
````
<br/>

## **User login**
### PATH

> POST /auth/login
****

### DESCRIPTION
Returns auth json web tokeng.

Body Example
``` json
{
  "email": "Vasyan1488_Tesak@**gmail**.com",
  "password": "penisHerDavalka123",
  "plan": "free",
}
````

Response Example (200 OK)
``` json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
            eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0.
            yRQYnWzskCZUxPwaQupWkiUzKELZ49eM7oWxAQK_ZXw"
}
````
<br/>

## **Get all users**
### PATH

> GET /auth/users
****

### DESCRIPTION
Recive list of all users from database.

Response Example (200 OK)
``` json
[
  {
    "_id": "61b086d44c53b516038a393d",
    "email": "lilDebil@gmail.hui",
    "password": "$2a$10$Ga3GJogmZ4SbRcufhLHn8.cua7THOx9agbADevCEbrQAUM2vbAucK",
    "plan": "SUPER DOROGO",
    "__v": 0
  }
]
````

