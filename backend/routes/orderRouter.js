import express from 'express'
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  payOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
  updateOrderToPaidWithPayPal,
} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)

router.route('/:id').get(protect, getOrderById)

router.route('/:id/paypal').post(protect, updateOrderToPaidWithPayPal)
router.route('/:id/pay').post(protect, payOrders)

router.route('/:id/updatepay').get(updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)
export default router
