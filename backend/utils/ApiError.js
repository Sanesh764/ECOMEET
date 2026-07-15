
class ApiError extends Error {
    constructor(
        statusCode,                  // HTTP status code (404, 401, 500, etc.)
        message = "Something went wrong", // Default error message
        errors = [],                 // Detailed validation errors
        stack = ""                   // Custom stack trace (optional)
    ) {
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors
        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }