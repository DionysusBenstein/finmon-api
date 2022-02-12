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
router.put('/:username/budget', controller.addBudget);
router.delete('/:username/budget/:id', controller.removeBudget);

router.get('/:username/cryptowallet', controller.getCryptowalletsList);
router.put('/:username/cryptowallet', controller.addCryptowallet);
router.delete('/:username/cryptowallet/:address', controller.removeCryptowallet);

router.post('/avatar', upload.single('avatar'), controller.uploadAvatar);

export default router;
