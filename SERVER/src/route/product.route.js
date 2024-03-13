import { Router } from "express";
import Product from "../models/Products";
const router = Router();

//get all products
router.get("/", async (req, res) => {
  const products = await Product.find(req.query);
  res.json({ products: products, total: 100, skip: 0, limit: 30 }); // trả về dữ liệu json
  // console.log("abc");
}); //get gồm route và callback function, truyền vào 2 tham số request và response

// Create
router.post("/add", async (req, res) => {
  // const product = new Product(req.body);
  // await product.save()
  const product = await Product.create(req.body);
  // const newProduct = { id: products.length + 1, ...req.body };
  // //   console.log(req.body);
  // products.push(newProduct);
  //   console.log(products);
  res.json(product);
});

//get all products by category
router.get("/category", async (req, res) => {
  // console.log(req);
  const product = await Product.distinct("category");
  res.json(product);
});

// Search products
router.get("/search", async (req, res) => {
  // console.log(req.query);
  const products = await Product.find({
    title: { $regex: req.query.q, $options: "i" },
  });
  res.json({ products: products, limit: 10, skip: 0 });
});

// read, get product by Id
router.get("/:productId", async (req, res) => {
  const product = await Product.findById(req.params.productId);
  // const product = products.find(
  //   (item) => item.id === parseInt(req.params.productId)
  // );
  if (!product)
    res.json({ Mes: `Product with Id '${req.params.productId}' Not found` });
  res.json(product);
}); // cách viết rút gọn của if else

//Update product by id
router.put("/:productId", async (req, res) => {
  const updateProduct = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    { new: true }
  );
  // //req.params.products -> productId
  // console.log(req);
  // const productId = parseInt(req.params.productId);
  // ///req.body -> update product
  // const updateProduct = { id: productId, ...req.body };
  // //Find index
  // const idx = products.findIndex((item) => item.id === productId);
  // //Array[0] = {...}
  // products[idx] = updateProduct;
  // console.log(products);
  res.json(updateProduct); // sau khi update trả về thông tin cũ, mún trả về cái mới đã update thì thêm object new:true vì default của nó là false
});
//delete
router.delete("/:productId", async (req, res) => {
  const deleteProduct = await Product.findByIdAndDelete(req.params.productId);
  // const productId = parseInt(req.params.productId);
  // const deleteProduct = products.find((item) => item.id === productId);
  // products = products.filter((item) => item.id !== productId);
  // console.log(products);
  res.json(deleteProduct);
});

//get product of category
router.get("/category/:category", async (req, res) => {
  const products = await Product.find({ category: req.params.category });
  res.json({ products: products, total: 5, skip: 0, limit: 5 });
});

export default router;
