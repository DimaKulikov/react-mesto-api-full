const router = require('express').Router();
const joiValidator = require('../middlewares/joiValidator');
const {
  getAllUsers,
  getUser,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', joiValidator.getUser, getUser);
router.patch('/me', joiValidator.updateUser, updateUser);
router.patch('/me/avatar', joiValidator.updateAvatar, updateAvatar);

module.exports = router;
