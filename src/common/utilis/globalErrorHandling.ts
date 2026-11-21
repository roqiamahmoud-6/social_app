class AppError extends Error{
    constructor(message:string,public statusCode: number = 500){
        super(message)
    }
}

export default AppError