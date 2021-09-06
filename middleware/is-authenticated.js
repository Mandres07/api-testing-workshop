const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
   const authHeader = req.get('Authorization');
   if (!authHeader) {
      return res.status(401).json({
         message: 'Not authenticated'
      });
   }
   const token = authHeader.split(' ')[1];
   let decodeToken;
   try {
      decodeToken = jwt.verify(token, 'secret');
   }
   catch (error) {
      return res.status(401).json({
         message: 'Not authenticated'
      });
   }
   if (!decodeToken) {
      return res.status(401).json({
         message: 'Not authenticated'
      });
   }
   req.userEmail = decodeToken.email;
   next();
};