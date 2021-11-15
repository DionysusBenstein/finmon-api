import fetch, { Headers } from 'node-fetch';

const api = {
    baseUrl: 'https://api.monobank.ua/',
    xToken: 'u-SyV6qukl-cd86UpjZM_7LofCYke8q0AX14JVWsfhIc'
};

const headers = new Headers();
headers.append("X-Token", api.xToken);

const options = {
    method: 'GET',
    headers: headers,
};

export async function getClientInfo() {
    const response = await fetch(`${api.baseUrl}personal/client-info`, options);
    return await response.json();
}

export async function getTransactions(account, from, to) {
    const response = await fetch(`${api.baseUrl}personal/statement/${account}/${from}/${to}`, options);
    const responseBody = await response.json();
    const transactions = [];

    for (const item of responseBody) {
        transactions.push({
            id: item.id,
            category: item.description,
            amount: item.amount,
        });
    }

    return transactions;
}