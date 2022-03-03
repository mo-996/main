import express from 'express'
import phoneController from '../controllers/phoneController'
import auth from '../middleware/auth'

const router = express.Router()

router.route('/phone')
  .get(phoneController.getPhones)
  .post(auth, phoneController.createCategoryPhones)

router.route('/phone/:id')
  .patch(auth, phoneController.updatePhone)
  .delete(auth, phoneController.deletePhone)

export default router;