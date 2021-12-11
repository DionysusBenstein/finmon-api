import User from '../models/User.js';

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

    async addBudget(req, res) {
        const { username } = req.params;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: `User ${username} not found.` });
        }

        user.budgets.push(req.body);
        User.findOneAndUpdate({username}, {$set:{budgets: user.budgets}}, {new: true});
        
        res.json({ message: 'Budget was added successfully!', budgets: user.budgets });
    }
}

export default new usersController;