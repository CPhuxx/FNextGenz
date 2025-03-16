import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AdminAddProductPage = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    quantity: 0, // เพิ่มจำนวนสินค้า
    category: 'netflix', // หมวดหมู่สินค้าคือ Netflix, YouTube, HBO
    email: '', // เพิ่มฟิลด์อีเมล
    password: '' // เพิ่มฟิลด์รหัสผ่าน
  });

  const [products, setProducts] = useState([]);  // State สำหรับเก็บรายการสินค้า

  // ฟังก์ชันเพื่อดึงข้อมูลสินค้าจากหลังบ้าน
  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/admin/get-products");
      const data = await response.json();
      if (response.ok) {
        setProducts(data);  // อัปเดต state ของสินค้า
      } else {
        alert("ไม่สามารถดึงข้อมูลสินค้าได้");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();  // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลสินค้าตอนที่โหลดหน้า
  }, []);

  // ฟังก์ชันเพิ่มสินค้าใหม่
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/admin/add-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        setProduct({ name: '', price: '', description: '', image: '', quantity: 0, category: 'netflix', email: '', password: '' });
        fetchProducts();  // หลังจากเพิ่มสินค้าแล้วให้ดึงข้อมูลสินค้าตอนนี้ใหม่
      } else {
        alert("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // ฟังก์ชันเลือกสินค้าเพื่อเพิ่ม
  const handleAddProduct = (productToAdd) => {
    setProduct({
      name: productToAdd.name,
      price: productToAdd.price,
      description: productToAdd.details.join(', '),
      image: productToAdd.img,
      quantity: 1,
      category: productToAdd.category,
      email: '',
      password: ''
    });
  };

  return (
    <div className="admin-add-product p-6 bg-gray-800 min-h-screen text-white">
      <Navbar />
      <main className="container mx-auto py-20 px-4 text-center">
        <h2 className="text-3xl font-semibold text-blue-400 mb-8">เพิ่มสินค้าลงในร้านค้า</h2>

        {/* Product Selection Dropdown */}
        <div className="space-y-4 mb-8">
          <label className="block text-gray-300">เลือกหมวดหมู่สินค้า:</label>
          <select
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600"
            value={product.category}
            onChange={(e) => setProduct({ ...product, category: e.target.value })}
          >
            <option value="netflix">Netflix</option>
            <option value="youtube">YouTube</option>
            <option value="hbo">HBO Max</option>
          </select>
        </div>

        {/* Product List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((app) => (
            <div key={app.id} className="bg-gray-700 rounded-lg p-4 shadow-lg text-white">
              <img src={app.img} alt={app.name} className="w-full h-32 object-cover rounded-lg mb-4" />
              <h4 className="font-bold text-lg">{app.name}</h4>
              <p className="text-gray-300">{app.description}</p>
              <p className="text-gray-500">ราคา: {app.price} บาท</p>
              <button
                onClick={() => handleAddProduct(app)}
                className="bg-blue-600 text-white p-2 mt-4 rounded-lg hover:bg-blue-700"
              >
                เพิ่มสินค้า
              </button>
            </div>
          ))}
        </div>

        {/* Product Form */}
        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
          <div>
            <label className="block text-gray-300">ชื่อสินค้า</label>
            <input
              type="text"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600"
              placeholder="ชื่อสินค้า"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300">ราคา</label>
            <input
              type="number"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600"
              placeholder="ราคา"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300">รายละเอียด</label>
            <textarea
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600"
              placeholder="รายละเอียดสินค้า"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300">ลิงค์รูปภาพสินค้า</label>
            <input
              type="text"
              value={product.image}
              onChange={(e) => setProduct({ ...product, image: e.target.value })}
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600"
              placeholder="ลิงค์รูปภาพ"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300">อีเมล</label>
            <input
              type="email"
              value={product.email}
              onChange={(e) => setProduct({ ...product, email: e.target.value })}
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600"
              placeholder="อีเมล"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300">รหัสผ่าน</label>
            <input
              type="password"
              value={product.password}
              onChange={(e) => setProduct({ ...product, password: e.target.value })}
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600"
              placeholder="รหัสผ่าน"
              required
            />
          </div>

          <button type="submit" className="w-full p-3 mt-4 bg-blue-600 text-white rounded-lg">
            เพิ่มสินค้า
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default AdminAddProductPage;
