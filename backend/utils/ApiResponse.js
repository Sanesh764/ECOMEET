
class ApiResponse {

    constructor(
        statusCode,      // HTTP status code (200, 201, etc.)
        data,            // Actual response data
        message = "success" // Success message
    ) {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}
export { ApiResponse }