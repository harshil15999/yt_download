// import { verify } from 'jsonwebtoken'

// const auth = async (req, res, next) => {
//     try {
//         const token = req.header('Authorization').replace('Bearer ', '')
//         const decoded = verify(token, process.env.JWT_SECRET)
//         const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

//         if (!user) {
//             throw new Error()
//         }

//         req.token = token
//         req.user = user
//         next()
//     } catch (e) {
//         res.status(401).send({ error: 'Please authenticate.' })
//     }
// }

// Middleware function to sanitize query parameters
const sanitizeQueryParams = (req, res, next) => {
  // Sanitize each query parameter
  for (const key in req.query) {
    req.query[key] = sanitizeFunction(req.query[key]);
  }

  next();
};

// Example sanitize function (you should customize it based on your needs)
const sanitizeFunction = (input) => {
  // Your sanitization logic here
  return input.trim();
};

export default {
  sanitizeQueryParams,
};
