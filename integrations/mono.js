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
    redirect: 'follow'
};

async function getClientInfo() {
    // fetch(`${api.baseUrl}personal/client-info`, options)
    //   .then(response => response.text())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));

    const response = await fetch(`${api.baseUrl}personal/client-info`, options);
    const responseBody = await response.json();

    return responseBody;
}

console.log(getClientInfo());