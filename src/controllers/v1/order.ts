import { PrismaClient } from "@prisma/client";
import asyncHandler from "../../middleware/async";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { sendError, sendResponse } from "../../library/rest";
import { body } from "express-validator/src/middlewares/validation-chain-builders";
import pagination from "../../library/pagination";

const prisma = new PrismaClient()

const listOrder = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let page: number = parseInt(req.query.page as string) || 1
    let limit: number = parseInt(req.query.limit as string) || 10

    const orders = await prisma.order.findMany({
        skip: (page - 1) * limit,
        take: limit,
    })

    const total = await prisma.order.count()

    return res.json(new sendResponse(orders, 'List orders', pagination(orders, limit, total)))
})

const createOrder = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(new sendError('Validation error', errors.array(), 'VALIDATION_ERROR', 422))
    }

    const {
        customer_id, // anggap ini sebagai id customer yang sedang login
        customer_address_id,
        products
    } = req.body;

    // cek apakah customer ada
    const customer = await prisma.customer.findFirst({
        where: {
            id: customer_id
        }
    })

    if (!customer) {
        return next(new sendError("Customer not found", [], "NOT_FOUND", 404));
    }

    // cek apakah customer_address ada
    const address = await prisma.customer_address.findFirst({
      where: {
        id: customer_address_id,
      },
    });
    
    if (!address) {
      return next(new sendError("Address not found", [], "PROCESS_ERROR", 404));
    }

    try {
        await prisma.$transaction(async (prisma) => {
            const order = await prisma.order.create({
                data: {
                    customer_id: customer_id,
                    customer_address_id: customer_address_id,
                }
            })

            await Promise.all(products.map(async (product_id: number) => {
                const order_detail = await prisma.order_detail.create({
                    data: {
                        order_id: order.id,
                        product_id: product_id,
                    }
                })
            }))

            return res.status(200).json(new sendResponse([], 'Order has been created'))
        })
    } catch (error: any) {
        return next(new sendError(error.message || 'Failed create order!', [], "PROCESS_ERROR", 400));
    }
})

const validation = (method: string) => {
    switch (method) {
        case 'createOrder':
            return [
                body('customer_id').notEmpty().withMessage('Customer id is required'),
                body('products').notEmpty().withMessage('Products is required').isArray().withMessage('Products must be array').custom((value: any) => {
                    if (value.length > 0) {
                        for (let i = 0; i < value.length; i++) {
                            if (typeof value[i] !== 'number') {
                                return false
                            }
                        }
                    }
                    return true
                }).withMessage('Products must be array of number')
            ]
        default:
            return []
    }
}

export {
    listOrder,
    createOrder,
    validation
}