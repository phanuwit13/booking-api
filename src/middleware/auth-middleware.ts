import { Request, Response, NextFunction } from "express"


export const requireUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user
    if (user && user.role === "USER") {
        return next()
    }
    return res.status(403).json({ success: false, statusCode: 401, message: "Unauthorized" })
}

export const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user
    if (user && user.role === "ADMIN") {
        return next()
    }
    return res.status(403).json({ success: false, statusCode: 401, message: "Unauthorized" })
}

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user
    if (user) {
        return next()
    }
    return res.status(403).json({ success: false, statusCode: 401, message: "Unauthorized" })
}