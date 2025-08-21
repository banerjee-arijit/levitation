import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CirclePlus } from "lucide-react";
import { toast } from "react-hot-toast";

interface Product {
  name: string;
  price: string;
  quantity: string;
}

interface ProductFormProps {
  onProductAdded?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onProductAdded }) => {
  const [product, setProduct] = useState<Product>({ name: "", price: "", quantity: "1" });
  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.id.replace("product-", "");
    setProduct((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleAddProduct = async () => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Please login again");

    const name = product.name.trim();
    const price = Number(product.price);
    const quantity = Number(product.quantity || "1");

    if (!name) return toast.error("Product name required");
    if (isNaN(price) || price < 0) return toast.error("Product price required");
    if (isNaN(quantity) || quantity < 1) return toast.error("Product quantity required");

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
        toast.success("Product added successfully");
        setProduct({ name: "", price: "", quantity: "1" });
        if (onProductAdded) onProductAdded();
      } else {
        toast.error(data.message || "Failed to add product");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-white w-full">
      <div>
        <p className="mb-2 text-sm font-medium">Product Name</p>
        <Input
          id="product-name"
          type="text"
          value={product.name}
          onChange={handleChange}
          placeholder="Enter product name"
          className="w-full h-[50px] bg-[#202020] border border-[#424647] text-white placeholder:text-[#7C7C7C] rounded-md px-4 focus:ring-2 focus:ring-[#CCF575] focus:border-[#CCF575] transition"
        />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Product Price</p>
        <Input
          id="product-price"
          type="number"
          value={product.price}
          onChange={handleChange}
          placeholder="Enter product price"
          className="w-full h-[50px] bg-[#202020] border border-[#424647] text-white placeholder:text-[#7C7C7C] rounded-md px-4 focus:ring-2 focus:ring-[#CCF575] focus:border-[#CCF575] transition"
        />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Quantity</p>
        <Input
          id="product-quantity"
          type="number"
          value={product.quantity}
          onChange={handleChange}
          placeholder="Enter quantity"
          className="w-full h-[50px] bg-[#202020] border border-[#424647] text-white placeholder:text-[#7C7C7C] rounded-md px-4 focus:ring-2 focus:ring-[#CCF575] focus:border-[#CCF575] transition"
        />
      </div>

      <div className="flex justify-center sm:col-span-2 md:col-span-3 mt-4">
        <Button
          onClick={handleAddProduct}
          className="text-[#CCF575] bg-[#2A2A2A] w-full sm:w-[180px] h-[48px] rounded-md flex items-center gap-2 font-medium hover:bg-[#CCF575] hover:text-[#141414] shadow-md transition-all duration-300"
        >
          Add Product <CirclePlus size={18} />
        </Button>
      </div>
    </div>
  );
};

export default ProductForm;
