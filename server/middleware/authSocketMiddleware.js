import jwt from 'jsonwebtoken'
const authSocketMiddleware = (socket, next) => {
    const token = socket.handshake.auth?.token?.split(' ')[1];
    if (!token) return next(new Error('Unauthorized'));

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        socket.userId = decoded._id;
        return next();
    } catch (e) {
        return next(new Error(e.message));
    }
}

export default authSocketMiddleware;