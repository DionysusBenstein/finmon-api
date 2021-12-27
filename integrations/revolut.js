import fetch, { Headers } from 'node-fetch';

const api = {
    baseUrl: 'https://oba.revolut.com/',
    xToken: '',
    accountId: '';
};

const headers = new Headers();
headers.append("X-Token", api.xToken);

const options = {
    method: 'GET',
    headers: headers,
};

async function getTransactions(account, from, to) {
    const response = await fetch(`${api.baseUrl}accounts/${api.accountId}/transactions`, options);
    const responseBody = await response.json();
    
    return responseBody;
}

export { getTransactions };
