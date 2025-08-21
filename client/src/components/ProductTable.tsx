import { useEffect, useState } from "react";

type Product = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  createdAt: string;
};

const ProductTable = () => {
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

  const subtotal = rows.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const gst = subtotal * 0.18;
  const grandTotal = subtotal + gst;

  return (
    <div className="overflow-x-auto border border-[#424647] rounded-lg">
      <table className="min-w-full text-left">
        <thead className="bg-[#202020] text-white">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Quantity</th>
            <th className="px-6 py-3">Created</th>
            <th className="px-6 py-3">Total</th>
          </tr>
        </thead>
        <tbody className="text-[#E5E5E5]">
          {rows.map((p, idx) => (
            <tr
              key={p._id}
              className={`border-t border-[#424647] ${
                idx % 2 === 0 ? "bg-[#1b1b1b]" : ""
              } hover:bg-[#2a2a2a] transition-colors`}
            >
              <td className="px-6 py-3">{p.name}</td>
              <td className="px-6 py-3">₹{p.price}</td>
              <td className="px-6 py-3">{p.quantity}</td>
              <td className="px-6 py-3">{new Date(p.createdAt).toLocaleString()}</td>
              <td className="px-6 py-3">₹{p.price * p.quantity}</td>
            </tr>
          ))}

          {rows.length > 0 && (
            <>
              <tr className="border-t border-[#424647] font-semibold">
                <td colSpan={4} className="px-6 py-3 text-right">
                  Subtotal
                </td>
                <td className="px-6 py-3">₹{subtotal.toFixed(2)}</td>
              </tr>
              <tr className="border-t border-[#424647] font-semibold">
                <td colSpan={4} className="px-6 py-3 text-right">
                  GST (18%)
                </td>
                <td className="px-6 py-3">₹{gst.toFixed(2)}</td>
              </tr>
              <tr className="border-t border-[#424647] font-bold">
                <td colSpan={4} className="px-6 py-3 text-right">
                  Grand Total
                </td>
                <td className="px-6 py-3">₹{grandTotal.toFixed(2)}</td>
              </tr>
            </>
          )}

          {rows.length === 0 && (
            <tr>
              <td className="px-6 py-6 text-[#A7A7A7] text-center" colSpan={5}>
                No products yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
