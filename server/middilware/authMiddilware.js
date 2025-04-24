 import jwt from 'jsonwebtoken';

export default async (req, res, next) => {
    try {
        const authHeader = await req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        if (decode) {
            req.user = decode;
            next();
        }
        else {
            return res.status(200).send({ message: "authentication failed token are unavailable", success: false });
        }

    } catch (error) {
        console.log(error);
    }
}

