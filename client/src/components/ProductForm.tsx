import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CirclePlus } from "lucide-react";

const ProductForm = () => {
  const [product, setProduct] = useState({ name: "", price: "", quantity: "1" });
  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.id.replace("product-", "")]: e.target.value }));
  };

  const handleAddProduct = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login again");

    const name = product.name.trim();
    const price = Number(product.price);
    const quantity = Number(product.quantity || "1");

    if (!name) return alert("Product name required");
    if (isNaN(price) || price < 0) return alert("Invalid price");
    if (isNaN(quantity) || quantity < 1) return alert("Invalid quantity");

    try {
      const res = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, price, quantity }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Product added");
        setProduct({ name: "", price: "", quantity: "1" });
        window.location.reload();
      } else {
        alert(data.message || "Failed to add");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
      <div>
        <p className="mb-2">Product Name</p>
        <Input
          id="product-name"
          type="text"
          value={product.name}
          onChange={handleChange}
          placeholder="Enter product name"
          className="w-full h-[56px] bg-[#202020] border border-[#424647] text-white placeholder:text-[#7C7C7C] rounded-[4px] px-4 focus:ring-2 focus:ring-[#CCF575] focus:border-[#CCF575]"
        />
      </div>
      <div>
        <p className="mb-2">Product Price</p>
        <Input
          id="product-price"
          type="number"
          value={product.price}
          onChange={handleChange}
          placeholder="Enter product price"
          className="w-full h-[56px] bg-[#202020] border border-[#424647] text-white placeholder:text-[#7C7C7C] rounded-[4px] px-4 focus:ring-2 focus:ring-[#CCF575] focus:border-[#CCF575]"
        />
      </div>
      <div>
        <p className="mb-2">Quantity</p>
        <Input
          id="product-quantity"
          type="number"
          value={product.quantity}
          onChange={handleChange}
          placeholder="Enter quantity"
          className="w-full h-[56px] bg-[#202020] border border-[#424647] text-white placeholder:text-[#7C7C7C] rounded-[4px] px-4 focus:ring-2 focus:ring-[#CCF575] focus:border-[#CCF575]"
        />
      </div>
      <div className="flex justify-center md:col-span-3 mt-6">
        <Button
          onClick={handleAddProduct}
          className="text-[#CCF575] bg-[#303030] w-full sm:w-[156px] h-[45px] rounded-sm flex items-center gap-2 hover:bg-[#CCF575] hover:text-[#141414] transition-all duration-300"
        >
          Add Product <CirclePlus size={18} />
        </Button>
      </div>
    </div>
  );
};

export default ProductForm;
