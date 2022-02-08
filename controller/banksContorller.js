import * as mono from '../integrations/mono.js'; 
import * as privat from '../integrations/privat.js'; 

class bankController {
    async getClientInfo (req, res) {
        if (req.params.bank === "mono") {
            res.send(await mono.getClientInfo());
        } else if (req.params.bank === "privat") {
            res.send(await privat.getClientInfo());
        }
    }

    async getTransactions(req, res) {
        if (req.params.bank === 'mono') {
            let [fromYear, fromMonth, fromDay] = [...req.params.from.split('-')];
            let [toYear, toMonth, toDay] = [...req.params.to.split('-')];
        
            const from = new Date(fromYear, fromMonth - 1, fromDay).getTime();
            const to = new Date(toYear, toMonth - 1, toDay).getTime();
            
            res.send(await mono.getTransactions(req.params.account, from, to));
        } else if (req.params.bank === 'privat') {
            const from = req.params.from.split('-').reverse().join('.');
            const to = req.params.to.split('-').reverse().join('.');
    
            res.send(await privat.getTransactions(req.params.account, from, to));
        }
    }

    async getMonthTransactions (req, res) {
        const date = new Date();
    
        if (req.params.bank === 'mono') {
            const dateTo = new Date();
            date.setMonth(date.getMonth() - 1);
    
            res.send(await mono.getTransactions(req.params.account, date.getTime(), dateTo.getTime()));
        } else if (req.params.bank === 'privat') {
            const dateTo = date.toISOString().substring(0, 10).split('-').reverse().join('.');
            date.setMonth(date.getMonth() - 1);
            const dateFrom = date.toISOString().substring(0, 10).split('-').reverse().join('.');
    
            res.send(await privat.getTransactions(req.params.account, dateFrom, dateTo));
        }
    }
}

export default new bankController;