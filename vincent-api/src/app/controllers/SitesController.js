const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');

class SitesController{
    async google(req, res, next) {

        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        const { token } = req.body;
        try {
          const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
          });
          const payload = ticket.getPayload();
          const { sub, email, name } = payload;
      
          let user = await User.findOne({ googleId: sub });
          if (!user) {
            user = new User({ googleId: sub, email, username: email, name, role: 'student', password: sub});
            await user.save();
          }
      
          const jwtToken = jwt.sign({ id: user._id, role: user.role }, 'conchimlahet', { expiresIn: '1h' });
          res.json({ token: jwtToken, role: user.role });
        } catch (error) {
          console.error('Lỗi xác thực Google', error);
          res.status(401).json({ message: 'Lỗi xác thực Google' });
        }
    }

    async login(req, res, next) {
        const { username, password } = req.body;
        try {
           const user = await User.findOne({ username });
           if (!user) return res.status(400).json({ message: 'Sai tên đăng nhập' });
     
           const isMatch = await bcrypt.compare(password, user.password);
           if (!isMatch) return res.status(400).json({ message: 'Sai mật khẩu' });
     
           const token = jwt.sign({ userId: user._id }, "conchimlahet", { expiresIn: '1h' });
           res.json({ token, role: user.role });
        } catch (error) {
           res.status(500).json({ message: 'Lỗi máy chủ' });
        }
    }
}
module.exports = new SitesController;