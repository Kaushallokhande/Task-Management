const jwt = require('jsonwebtoken');
const JWT_SECRET = 'madebydevil'

const fetchUser = async(req, res, next) => {
    //Get the user from the jwt token and add id to req object 
    try {
        const token = req.header('auth-token');
        if (!token) {
            return res.status(401).send({ error: 'Please authenticate with valid token' })
        }
        const data = await jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        next();
        
    } catch (error) {
        console.error(error.message);
        return res.status(401).send({ error: 'Please error with valid token' })
    }
}
module.exports = fetchUser;