import dynamoDb from './db';

export async function GetPaginatedTransactions(event) {
    const country = event.queryStringParameters.country;
    const currency = event.queryStringParameters.currency;
    const sizeLimitPerPage = event.pathParameters.size;
    const nextPageID = event.queryStringParameters.nextPageId;
    let params = {
        TableName: "transactions",
        FilterExpression: "country = :country and currency = :currency",
        ExpressionAttributeValues: {
            ":country": country,
            ":currency": currency
        }
    };

    try {
        if (nextPageID !== "" || nextPageID !== null) {
            params.ExclusiveStartKey = {"id": nextPageID};
        }
        const data = await dynamoDb.scan(params).promise();
        const sortedData = data.Items && Object.values(data.Items).sort((a, b) => Number(b.createdAt) > Number(a.createdAt)? 1 : -1);
        const currentPage = sortedData.slice(0, Number(sizeLimitPerPage));
        const nextId = sortedData.slice(Number(sizeLimitPerPage)+1)[0].id;
        const currentData = Object.assign({},
            {Count: Number(sizeLimitPerPage)},
            {ScannedCount: data.ScannedCount},
            {NextPageId: nextId},
            {Items: [...currentPage]});
        return {
            statusCode: 200,
            body: JSON.stringify(currentData)
        };

    } catch (e) {
        return {
            statusCode: 500,
            body: e.message
        };
    }


}

