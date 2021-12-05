import Merchant from 'privatbank-api';

const merchant = new Merchant({
    id: '202130',
    password: '0f5TTa5eu1W98oV07n1m29zw5WR9xxPm',
    country: 'UA'
});

async function getClientInfo(account) {
    const balance = await merchant.balance('4149439317562795')
    return balance;
}
// 4149439317562795
async function getTransactions(account, from, to) {
    console.log(from);
    console.log(to);
    const statements = await merchant.statement(account, from, to);
    return statements;
}

export { getClientInfo, getTransactions };