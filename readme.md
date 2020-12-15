<div align="center">
  <img src="logo.svg" align="center" width="160">
  <h1 align="center">Yellow Card Backend Engineering Test</h1>
</div>

## Summary
This project contains the basic skeleton for a simple local serverless service. This environment contains an API endpoint, a dynamodb table, and a seed. The example endpoint scans the table for transactions and returns as many as it can. DynamoDB has a 1MB limit on the amount of data it will retrieve in a single request.

The goal is to create an endpoint to fetch transactions of specific `currency` on a certain `country`. Make sure pagination is supported such that a Client could specify the `size` of the transctions to retrieve, and the `page` (or other identifier). The transactions **must** be sorted by time with the most recently created as the first transaction.   


## Data
Supplied is a pre-generated list of transactions that will be seeded upon database start (`txs.json`). The generation script (`tx-init.js`) is also included and can be modified to include **extra** data if neccessary to achieve results.  

Example transaction feature `currency` and `country`
```
{
    "id":"0",
    "amount":793.93,
    "country":"BW",
    "createdAt":1606186591726,
    "updatedAt":1606186591726,
    "currency":"USDT",
    "bitcoinAddress":"19xiZnXJexGgC6R1Tp9M8L7P8MsRhCE5",
    "customerName":"Jenny Kunze",
    "customerEmail":"Lavonne.Oberbrunner@yahoo.com",
    "customerId":"Kayla_Hilll"
}
```
#

## Setup
1. Install Serverless Framework: 
    ```
    npm i -g serverless
    ```
2. Install local modules
    ```
    npm i
    ```
3. Install local Dynamodb Instance
    ```
    serverless dynamodb install
    ```
4. Start local service
    ```
    sls offline start
    ```
5. Install [Dynamodb-admin]("https://github.com/99x/serverless-dynamodb-local") for AWS-like table explorer _(optional)_

6. To test, `GET` the below example in postman or browser.
   ```
   localhost:3000/dev/transactions/size/20?country=GH&currency=USDT&nextPageId=29790
```

#

## Problem
DynamoDb actions limit to 1mb of data per call. This table has 30,000 transactions and can only retrieve ~5,286 of them. 

The API Endpoint **must** accept country code, currency, the size limit of the # of transactions to retrieve per page, and some identifier, whether it be a page number or unique key, to be able to traverse forwards and backwards in the results in order. 


## Notes
Remember, the end result is an API that is setup for a transaction history page on a UI. There is far from a single solution. This problem is open-ended such that attributes can be added to the generated data, indexes can be added on the resource configuration in `serverless.yml`, etc. 

Performance and elegance is important. `Scans do not have to be used. `

## Review
We've set this project up in a way that allows for a simple review process from start to finish.

1. Clone this repository to your local machine
2. Create a new private repository for yourself called yellowcard-engineering-test
3. Follow the instructions to push an existing repository to push this project to your new private repository
4. Add @uncle-scooter and @okolilemuel as collaborators to your new private repository
