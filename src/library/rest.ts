interface Pagination {
    total: number;
    total_page: number;
    per_page: number;
    prev_page: number;
    next_page: number;
    current_page: number;
    from: number;
    to: number;
}

class sendResponse {
    success: boolean = true;
    message: string = "Success getting data";
    data: any = null;
    pagination: Pagination = {
        total: 0,
        total_page: 0,
        per_page: 0,
        prev_page: 0,
        next_page: 0,
        current_page: 0,
        from: 0,
        to: 0
    };
    error: {
        error_code: string,
        error_data: string
    }

    constructor(data: Object, message: string = 'Success getting data', pagination: any = null, status: number = 200) {
        this.message = message;
        this.data = data;
        this.pagination = pagination;
        this.error = {
            error_code: '',
            error_data: ''
        }
    }
}

class sendError {
    success: boolean = false;
    message: string = "Something went wrong";
    data: any = null;
    error: {
        error_code: string,
        error_data: any
    }

    constructor(message: string = 'Something went wrong', error_data: any = [], error_code: string = 'PROCESS_ERROR', status: number = 400) {
        this.message = message;
        this.error = {
            error_code: error_code,
            error_data: error_data
        }
    }
}

export {
    sendResponse,
    sendError
}