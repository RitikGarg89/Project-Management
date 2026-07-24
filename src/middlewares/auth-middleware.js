import { User } from '../models/user-model.js'
import { ApiError } from '../utils/api-error.js'
import { asyncHandler } from '../utils/asyn-handler.js'
import jwt from 'jsonwebtoken'



export const verifyJWt = asyncHandler(async (req, res, next) => {

    const token = req.cookies ? req.cookies.accessToken : req.header("Authorization")?.replace("Bearer ", "")
    if (!token) {
        throw new ApiError(401, "Unauthorized request: No token provided")
    }
    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
        );
        if (!user) {
            throw new ApiError(401, "Invalid Access Token: User no longer exists")
        }
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401, "Invalid Access Token: User no longer exists")
    }


})