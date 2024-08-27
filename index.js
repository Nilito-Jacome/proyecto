const express = require('express');
const app = express();
const emailRoutes = require('./routes/emailRoutes');
const userRoutes = require('./routes/userRoutes');
const folderRoutes = require('./routes/folderRoutes');
const labelRoutes = require('./routes/labelRoutes');
require('dotenv').config();

app.use(express.json());

app.use('/emails', emailRoutes);
app.use('/users', userRoutes);
app.use('/folders', folderRoutes);
app.use('/labels', labelRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
