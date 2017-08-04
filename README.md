# simple-atm
This is a very simple ATM application

## APIs

1. Create a new account

```
POST /account

BODY
{
    account_id: <Unique identifier for the account (PIN)>
    balance: <optional staring balance>
}

RESPONSE

201 : Account create successfully
400 : Bad request
```

1. Get account details

```
GET /account/:account_id

RESPONSE 
{
    account_id: <id of the requested account>
    balance: <current balance of the account>
}

```

1. Update account information (i.e. withdraw, deposit)

```
PUT /account/:account_id

BODY
{
    ammount: <ammount to change balance by>
    action: <['withdraw', 'deposit']>
}

RESPONSE
{
    account_id: < ID of the account for the request>
    balance: <updated balance based on action>
}

200 : Account updated successfully
400 : Bad request
```

## Running Locally

This application requires redis. To run locally, make sure you have redis installed (`brew install redis`) and then in a separate terminal tab run `redis-server`

Once redis is running, then you run `npm run app` and get to it from localhost:3000

To run tests - `npm run test`

### Future Features
* Get transaction history
* Security to ensure only you are updating your account
* Globalization and multiple currencies
