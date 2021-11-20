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

async function getClientInfo() {
    const response = await fetch(`${api.baseUrl}personal/client-info`, options);
    return await response.json();
}

async function getTransactions(account, from, to) {
    const response = await fetch(`${api.baseUrl}personal/statement/${account}/${from}/${to}`, options);
    const responseBody = await response.json();
    let transactions = [];

    if ('errorDescription' in responseBody) {
        transactions = {...responseBody};
    } else {
        for (const item of responseBody) {
            transactions.push({
                id: item.id,
                time: item.time,
                category: item.description,
                amount: item.amount,
            });
        }
    }
    
    return transactions;
}

export { getClientInfo, getTransactions };
