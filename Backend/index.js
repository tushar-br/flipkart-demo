const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const cors = require('cors')
const path = require('path')
const multer = require('multer')
const Product = require('./models/Product')
const categoryRoutes = require("./routes/category");
const authRoutes = require("./routes/auth");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");
const contactRoutes = require("./routes/contact");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"))


mongoose.connect('Enter you mongodb url')
  .then(() => console.log("MongoDB connection is done"))
  .catch(() => console.log("Connection fail"))


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
})

const upload = multer({ storage })

app.get('/api', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/add/product', upload.single("image"), async (req, res) => {

  const { name, price, des, category } = req.body;

  const product = new Product({
    name,
    price,
    description: des,
    image: req.file?.filename,
    category
  })
  await product.save()
  console.log("req.body ====>", req.body)
  res.json(product)
})

app.put('/api/edit/product/:id', upload.single("image"), async (req, res) => {

  const { name, price, des, category } = req.body;

  const updateData = { name, price, des, category };
  if (req.file) updateData.image = req.file.filename;
  const updated = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true })

  res.json(updated)
})


app.get('/api/add/product', async (req, res) => {
  const product = await Product.find().populate("category");

  res.json(product);
})

app.delete('/api/delete/product/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true })
})

app.get('/api/products/:id', async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");
  res.json(product)
})
app.use('/api/categories', categoryRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/contact',contactRoutes)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



