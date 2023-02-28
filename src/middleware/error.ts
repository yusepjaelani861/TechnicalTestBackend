import { NextFunction, Request, Response } from "express";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (typeof (err) !== 'undefined' && err.error?.error_code === 'VALIDATION_ERROR') {
        let error_validation: any = {}

        err.error.error_data.forEach((error: any) => {
            error_validation[error.param] = [error.msg]
        })

        return res.status(err.status || 422).json({
            success: false,
            message: err.message || "Validation error",
            data: err.data || null,
            error: {
                error_code: err.error?.error_code || 'VALIDATION_ERROR',
                error_data: error_validation || null,
            }
        })
    }

    if (typeof (err) !== 'undefined' && err.error?.error_code === 'NOT_FOUND') {
        return res.status(err.status || 404).json({
            success: false,
            message: err.message || "Not found",
            data: err.data || null,
            error: {
                error_code: err.error?.error_code || 'NOT_FOUND',
                error_data: err.error?.error_data || null,
            }
        })
    }

    return res.status(err.status || 400).json({
        success: false,
        message: err.message || "Something went wrong",
        data: err.data || null,
        error: {
            error_code: err.error?.error_code || 'PROCESS_ERROR',
            error_data: err.error?.error_data || null,
        }
    })
}

export {
    errorHandler
}