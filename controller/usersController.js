import User from '../models/User.js';
import { getWalletInfo } from '../integrations/blockchain.js';

class usersController {
    async getUsers(req, res) {
        try {
            const users = await User.find();

            for (const user of users) {
                user.password = undefined;
            }

            res.json(users);
        } catch (e) {
            console.log(e);
        }
    }

    async getUserInfo(req, res) {
        const { username } = req.params;
        const user = await User.findOne({ username });
                   
        if (!user) {
            return res.status(400).json({message: `User ${username} not found.`});
        }

        user.password = undefined;
        res.json(user);
    }

    async getBudgetList(req, res) {
        const { username } = req.params;
        const user = await User.findOne({ username });
                   
        if (!user) {
            return res.status(400).json({message: `User ${username} not found.`});
        }

        res.json(user.budgets);
    }

    async getCryptowalletsList(req, res) {
        const { username } = req.params;
        const user = await User.findOne({ username });
                   
        if (!user) {
            return res.status(400).json({message: `User ${username} not found.`});
        }

        res.json(user.cryptowallets);
    }

    async uploadAvatar(req, res) {
        try {
            res.json(req.file)
        } catch (e) {
            console.log(e);
        }
    }

    async addBudget(req, res) {
        const { username } = req.params;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: `User ${username} not found.` });
        }

        user.budgets.push(req.body);
        user.save(function (err) {
            if(err) {
                console.error('ERROR!');
            }
        });
        
        res.json({ message: 'Budget added successfully!' });
    }

    async removeBudget(req, res) {
        const { username, id } = req.params;
        const doesBudgetExist = await User.exists({
            username, budgets: { $elemMatch: { _id: id }}
        });

        if (!doesBudgetExist) {
            return res.status(400).json({ message: 'Budget doesn\'t exist!' });
        }

        User.findOneAndUpdate(username, {
            $pull: { budgets: { _id: id }}
        },
        function (err, managerparent) {
            if (err) throw err; 
            console.log(managerparent);
        });
        
        res.json({ message: 'Budget removed successfully!' });
    }

    async addCryptowallet(req, res) {
        const { username } = req.params;
        const { address } = req.body;
        const doesWalletExist = await User.exists({
            username, cryptowallets: { $elemMatch: { address }}
        });

        if (doesWalletExist) {
            return res.status(400).json({ message: `Address ${address} already exist` });
        }

        const newWallet = await getWalletInfo(address);

        User.findOneAndUpdate(username, {
            $push: { cryptowallets: newWallet }
        }, { new: true, upsert: true },
        function (err, managerparent) {
            if (err) throw err; 
            console.log(managerparent);
        });       

        res.json({ message: 'Cryptowallet added successfully!' });
    }

    async removeCryptowallet(req, res) {        
        const { username, address } = req.params;
        const doesWalletExist = await User.exists({
            username, cryptowallets: { $elemMatch: { address }}
        });

        if (!doesWalletExist) {
            return res.status(400).json({ message: `Address ${address} doesn't exist` });
        }

        User.findOneAndUpdate(username, {
            $pull: { cryptowallets: { address }}
        },
        function (err, managerparent) {
            if (err) throw err; 
            console.log(managerparent);
        });
        
        res.json({ message: 'Cryptowallet removed successfully!' });
    }
}

export default new usersController;