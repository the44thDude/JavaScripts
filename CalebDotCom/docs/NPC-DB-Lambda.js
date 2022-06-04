const AWS = require('aws-sdk');
AWS.config.update( {
  region: 'us-east-1'
});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = 'NPC-list';
const healthPath = '/prod/health';
const NPCpath = '/prod/NPC';
const NPCspath = '/prod/NPCs';

exports.handler = async function(event) {
  console.log('Request event: ', event);
  var http = event.requestContext.http
  let response;
    if( http.method === 'GET' && http.path === healthPath){
      response = buildResponse(200, 'it works!');
    }else if(http.method === 'GET' && http.path === NPCpath){
      response = await getNPC(event.queryStringParameters.NPCid);
    }else if (http.method === 'GET' && http.path === NPCspath){
      response = await getNPCs();
    }else if(http.method === 'POST' && http.path === NPCpath){
      response = await saveNPC(JSON.parse(event.body));
    }else if(http.method === 'PATCH' && http.path === NPCpath){
      const requestBody = JSON.parse(event.body);
      response = await modifyNPC(requestBody.NPCid, requestBody.updateKey, requestBody.updateValue);
    }else if(http.method === 'DELETE' && http.path === NPCpath){
      response = await DeleteNPC(JSON.parse(event.body).NPCid);
    }else if (http.method === 'OPTIONS' && http.path === NPCpath){
      response = buildResponse(200, '');
    }else{
        response = buildResponse(404, '404 Not Found');
    }
  return response;
}

async function getNPC(NPCid) {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      'NPCid': NPCid
    }
  }
  return await dynamodb.get(params).promise().then((response) => {
    return buildResponse(200, response.Item);
  }, (error) => {
    console.error('you rolled a nat 1 on your request check sorry', error);
  });
}

async function getNPCs() {
  const params = {
    TableName: dynamodbTableName
  }
  const allNPCs = await scanDynamoRecords(params, []);
  const body = {
    NPCs: allNPCs
  }
  return buildResponse(200, body);
}

async function scanDynamoRecords(scanParams, itemArray) {
  try {
    const dynamoData = await dynamodb.scan(scanParams).promise();
    itemArray = itemArray.concat(dynamoData.Items);
    if (dynamoData.LastEvaluatedKey) {
      scanParams.ExclusiveStartkey = dynamoData.LastEvaluatedKey;
      return await scanDynamoRecords(scanParams, itemArray);
    }
    return itemArray;
  } catch(error) {
    console.error('you rolled a nat 1 on your request check sorry', error);
  }
}

async function saveNPC(requestBody) {
  const params = {
    TableName: dynamodbTableName,
    Item: requestBody
  }
  return await dynamodb.put(params).promise().then(() => {
    const body = {
      Operation: 'SAVE',
      Message: 'SUCCESS',
      Item: requestBody
    }
    return buildResponse(200, body);
  }, (error) => {
    console.error('you rolled a nat 1 on your request check sorry', error);
  })
}

async function modifyNPC(NPCid, updateKey, updateValue) {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      'NPCid': NPCid
    },
    UpdateExpression: `set ${updateKey} = :value`,
    ExpressionAttributeValues: {
      ':value': updateValue
    },
    ReturnValues: 'UPDATED_NEW'
  }
  return await dynamodb.update(params).promise().then((response) => {
    const body = {
      Operation: 'UPDATE',
      Message: 'SUCCESS',
      UpdatedAttributes: response
    }
    return buildResponse(200, body);
  }, (error) => {
    console.error('you rolled a nat 1 on your request check sorry', error);
  })
}

async function DeleteNPC(NPCid) {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      'NPCid': NPCid
    },
    ReturnValues: 'ALL_OLD'
  }
  return await dynamodb.delete(params).promise().then((response) => {
    const body = {
      Operation: 'DELETE',
      Message: 'SUCCESS',
      Item: response
    }
    return buildResponse(200, body);
  }, (error) => {
    console.error('you rolled a nat 1 on your request check sorry', error);
  })
}

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': '*'
    },
    body: JSON.stringify(body)
  }
}