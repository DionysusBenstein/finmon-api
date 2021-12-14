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

        User.findOneAndUpdate(username, { $push: { budgets: req.body } }, { new: true, upsert: true },
            function (err, managerparent) {
                if (err) throw err;
                console.log(managerparent);
            }
        );
        
        res.json({ message: 'Budget added successfully!' });
    }

    async removeBudget(req, res) {
        const { username, id } = req.params;

        User.findOneAndUpdate(username, { $pull: { budgets: { _id: id }}},
            function (err, managerparent) {
                if (err) throw err;
                console.log(managerparent);
            }
        );
        
        res.json({ message: 'Budget removed successfully!' });
    }
}

export default new usersController;