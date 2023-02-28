import express from 'express'
import {
    listOrder,
    createOrder,
    validation
} from '../../controllers/v1/order'

const router = express.Router()

router
    .route('/order')
    .get(listOrder)

router
    .route('/order')
    .post(validation('createOrder'), createOrder)

export default router