import fetch from 'node-fetch';

async function getWalletInfo(address) {
    const response = await fetch(`https://blockchain.info/rawaddr/${address}`);
    return await response.json();
}

export { getWalletInfo };


