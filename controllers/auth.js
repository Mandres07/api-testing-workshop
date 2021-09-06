const jwt = require('jsonwebtoken');
const users = require('../data/users');

exports.login = (req, res, next) => {
   const { email, password } = req.body;
   if (!email || !password) {
      return res.status(400).json({
         message: 'Wrong credentials'
      });
   }
   const user = users.find(item => item.email === email && item.password === password);
   if (!user) {
      return res.status(404).json({
         message: 'Wrong credentials'
      });
   }
   const token = jwt.sign(
      { email: user.email },
      'secret',
      { expiresIn: '1h' }
   );
   return res.status(200).json({
      token
   });
};