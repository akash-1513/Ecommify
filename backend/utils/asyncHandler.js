const asyncHandler = (func) => {
    return (req, res, next) => {
        try {
            return func(req, res, next)
        } catch(error) {
            throw error
        }
    }
}


module.exports = { asyncHandler }