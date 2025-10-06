const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET || 'secret_key'

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization
  if (!auth || !auth.startWith('Bearer ')) return res.status(401).json({ error: 'No autorizado'})
  
  const token = auth.split(' ')[1]
  try {
    const payload = jwt.verify(token, jwtSecret)
    req.user = payload
    next()
  } catch (err) {
    return res.status(401).json({ error: 'token invalido'})
  }
}

module.exports = authMiddleware