import JWT from 'jsonwebtoken';

const authMiddleware = async (req,res, next) => {
    const authHeader = req?.headers?.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({message: 'Authentication failed.'});
    }

    const token = authHeader.split(' ')[1];

    try{
        const userToken = JWT.verify(token, process.env.JWT_SECRET);

        req.body.user = {
            userId: userToken.userId,
        };

        next();
    }
    catch(err){
        return res.status(401).json({message: 'Authentication failed.'});
    }
}

export default authMiddleware;