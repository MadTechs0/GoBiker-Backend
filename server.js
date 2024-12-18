const express = require('express');
const mongoose  = require('mongoose');
const dotenv  = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      console.log(middleware.route);
    }
  });
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDb Connected"))
    .catch((err) => console.log(err));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});