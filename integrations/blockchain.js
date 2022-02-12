import fetch from 'node-fetch';
import { pick } from '../utils.js';

export async function getWalletInfo(address) {
    const response = await fetch(`https://blockchain.info/rawaddr/${address}`);
    let walletInfo = await response.json(); 

    walletInfo = pick(walletInfo,
        'address',
        'final_balance:totalBalance',
        'txs:transactions',
        'hash',
        'time',
        'inputs',
        'out',
        'prev_out',
        'value',
        'addr',
        'balance'
    );

    for (const transaction of walletInfo.transactions) {
        const date = new Date(transaction.time * 1000);
        transaction.formatTime = date.toISOString().substring(0, 16).replace('T', ' ');
    }

    return {
        ...walletInfo
    };
}
