import { X } from "lucide-react";

export interface Product {
  name: string;
  qty: number;
  rate: number;
  total: string;
}

export interface InvoiceData {
  name: string;
  date: string;
  email: string;
  products: Product[];
  totalCharges: string;
  gst: string;
  totalAmount: string;
}

interface InvoicePreviewProps {
  data: InvoiceData;
  onClose: () => void;
}

const InvoicePreview = ({ data, onClose }: InvoicePreviewProps) => {
  const { name, date, email, products, totalCharges, gst, totalAmount } = data;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-2/5 h-full overflow-auto relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-red-500 transition"
        >
          <X size={22} />
        </button>

        <div className="p-8 font-poppins text-black">
          {/* Header */}
          <div className="flex justify-between items-end mb-4">
            <div className="flex items-center gap-2">
              <span className="text-[#303661] font-bold text-2xl">Levitation</span>
              <span className="text-gray-500 text-sm">Invoice</span>
            </div>
            <h2 className="text-[#303661] text-lg m-0">INVOICE GENERATOR</h2>
          </div>
          <hr className="border-0 h-1 bg-[#303661] my-5" />

          {/* Person Info */}
          <div className="bg-[#141414] text-white p-5 rounded-lg mb-7 flex justify-between">
            <div>
              <p className="text-[#CCF575] uppercase text-xs tracking-wide m-0">Name</p>
              <p className="text-white text-base font-medium mt-1">{name}</p>
            </div>
            <div className="text-right">
              <p className="text-white font-medium text-sm m-0">Date: {date}</p>
              <p className="inline-block bg-white text-black px-3 py-1 rounded-full text-xs mt-1">
                {email}
              </p>
            </div>
          </div>

          {/* Product Table */}
          <table className="w-full border-collapse mb-7 rounded-lg overflow-hidden shadow-sm">
            <thead>
              <tr className="bg-gradient-to-r from-[#303661] to-[#263406] text-white">
                <th className="text-left p-3 font-semibold text-sm">Product</th>
                <th className="text-center p-3 font-semibold text-sm">Qty</th>
                <th className="text-right p-3 font-semibold text-sm">Rate</th>
                <th className="text-right p-3 font-semibold text-sm">Total</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, idx) => (
                <tr key={idx} className="border-b border-gray-200">
                  <td className="p-3 text-sm">{p.name}</td>
                  <td className="p-3 text-center text-sm">{p.qty}</td>
                  <td className="p-3 text-right text-sm">{p.rate}</td>
                  <td className="p-3 text-right text-sm">{p.total}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="bg-gray-100 p-5 rounded-lg w-max ml-auto shadow-inner">
            <div className="flex justify-between mb-2 min-w-[240px]">
              <span>Total Charges</span>
              <span>{totalCharges}</span>
            </div>
            <div className="flex justify-between mb-2 min-w-[240px]">
              <span>GST (18%)</span>
              <span>{gst}</span>
            </div>
            <div className="flex justify-between font-bold text-base min-w-[240px]">
              <span>Total Amount</span>
              <span className="text-[#303661]">{totalAmount}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-7 text-center text-gray-500 text-xs leading-relaxed">
            <p className="m-0">{date}</p>
            <p className="mt-2">
              We are pleased to provide any further information you may require and look forward to
              assisting with your next order. Best wishes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;
