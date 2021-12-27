import Merchant from 'privatbank-api';

const merchant = new Merchant({
    id: '202130',
    password: '0f5TTa5eu1W98oV07n1m29zw5WR9xxPm',
    country: 'UA',
});

async function getClientInfo(account) {
    const balance = await merchant.balance('4149439317562795');
    return balance;
}

// 4149439317562795
async function getTransactions(account, from, to) {
    const statements = await merchant.statement(account, from, to);
    const { statement: transactions } = JSON.parse(statements).response.data.info.statements;

    for (const transaction of transactions) {
        let { trandate, trantime } = transaction;

        transaction.formatTime = `${trandate} ${trantime}`;
        transaction.timeMillis = new Date(`${trandate}T${trantime}`).getTime();

        transaction.trandate = undefined;
        transaction.trantime = undefined;
    }

    return transactions;
}

export { getClientInfo, getTransactions };
