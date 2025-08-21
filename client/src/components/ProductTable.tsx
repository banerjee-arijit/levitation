import { useEffect, useState } from "react";

type Product = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  createdAt: string;
};

export default function ProductTable() {
  const [rows, setRows] = useState<Product[]>([]);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch(`${API_URL}/products`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (res.ok) setRows(data.products || []);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="overflow-x-auto border border-[#424647] rounded">
      <table className="min-w-full text-left">
        <thead className="bg-[#202020] text-white">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Quantity</th>
            <th className="px-4 py-3">Created</th>
          </tr>
        </thead>
        <tbody className="text-[#E5E5E5]">
          {rows.map((p) => (
            <tr key={p._id} className="border-t border-[#424647]">
              <td className="px-4 py-3">{p.name}</td>
              <td className="px-4 py-3">₹{p.price}</td>
              <td className="px-4 py-3">{p.quantity}</td>
              <td className="px-4 py-3">{new Date(p.createdAt).toLocaleString()}</td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td className="px-4 py-6 text-[#A7A7A7]" colSpan={4}>
                No products yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
