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

    return {
        ...walletInfo
    };
}
