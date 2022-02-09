import { Router } from 'express';
import multer from 'multer';
import controller from '../controller/usersController.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'wallets_resources');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, String(req.body.address));
    }
});

const upload = multer({storage: storage});
const router = new Router();

router.get('/', controller.getUsers);
router.get('/:username', controller.getUserInfo);
router.get('/:username/budget', controller.getBudgetList);
router.post('/avatar', upload.single('avatar'), controller.uploadAvatar);
<<<<<<< HEAD
router.put('/:username/budget', controller.addBudget);
=======
router.post('/:username/budget', controller.addBudget);
>>>>>>> 35d99f5d7fb52b68e83571bc2564f03888e855a2
router.delete('/:username/budget/:id', controller.removeBudget);
router.put('/:username/cryptowallet', controller.addCryptowallet);
router.delete('/:username/cryptowallet/:address', controller.removeCryptowallet);

export default router;
