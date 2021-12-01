const Merchant = require('privatbank-api');

merchant = new Merchant({
    id: '202130',
    password: '0f5TTa5eu1W98oV07n1m29zw5WR9xxPm',
    country: 'UA'
});

async function getClientInfo() {
    merchant.balance('4149439317562795')
    .then((balance) => console.log('Balance', balance));
}
    
async function getTransactions(account, from, to) {
    merchant.statement('4149439317562795', '01.01.2017', '15.03.2017')
    .then((statements) => console.log('Statements', statements));
    
    return transactions;
}
    
export { getClientInfo, getTransactions };