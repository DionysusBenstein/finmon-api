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
    // fetch(`${api.baseUrl}personal/client-info`, options)
    //   .then(response => response.json())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));

    const response = await fetch(`${api.baseUrl}personal/client-info`, options);
    const responsBody = await response.json();
    return responsBody;
}

async function getStatement(account, from, to) {
    const response = await fetch(`${api.baseUrl}personal/statement/${account}/${from}/${to}`, options);
    const responseBody = await response.json();

    return responseBody;
}
