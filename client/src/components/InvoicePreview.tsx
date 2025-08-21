import { X } from "lucide-react";
import { Button } from "./ui/button";

export interface Product {
  name: string;
  qty: number;
  rate: string;
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

  const API_URL = import.meta.env.VITE_API_URL;

  //get the token from the localstorage
  const token = localStorage.getItem("token");

  // Here is the handle PDF downloding function
  const handleDownload = async () => {
    try {
      const invoiceElement = document.getElementById("invoice");
      if (!invoiceElement) return;

      const html = invoiceElement.outerHTML;

      const res = await fetch(`${API_URL}/generate-invoice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ html }),
      });

      if (res.ok) {
        const pdfBlob = await res.blob();
        const url = window.URL.createObjectURL(pdfBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "invoice.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else {
        const err = await res.json();
        alert(err.message || "Failed to download invoice");
      }
    } catch (error) {
      console.error("Download error:", error);
      alert("Something went wrong while downloading PDF");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl h-full md:h-[90vh] overflow-auto relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
        >
          <X size={22} />
        </button>

        <div id="invoice" className="p-6 sm:p-8 font-poppins text-black">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-4 gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[#303661] font-bold text-2xl">Levitation</span>
              <span className="text-gray-500 text-sm">Invoice</span>
            </div>
            <h2 className="text-[#303661] text-lg text-center sm:text-right">INVOICE GENERATOR</h2>
          </div>

          <hr className="border-0 h-1 bg-[#303661] my-5" />

          <div className="bg-[#141414] text-white p-5 rounded-lg mb-7 flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <p className="text-[#CCF575] uppercase text-xs tracking-wide m-0">Name</p>
              <p className="text-white text-base font-medium mt-1 break-all">{name}</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-white font-medium text-sm m-0">Date: {date}</p>
              <p className="inline-block bg-white text-black px-3 py-1 rounded-full text-xs mt-1 break-all">
                {email}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse mb-7 rounded-lg overflow-hidden shadow-sm min-w-[500px]">
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
          </div>

          <div className="bg-gray-100 p-5 rounded-lg w-full sm:w-max ml-auto shadow-inner">
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

          <div className="mt-7 text-center text-gray-500 text-xs leading-relaxed">
            <p className="m-0">{date}</p>
            <p className="mt-2">
              We are pleased to provide any further information you may require and look forward to
              assisting with your next order. Best wishes.
            </p>
            <Button
              className="mt-8 bg-[#303661] text-white hover:bg-[#1f244d] w-full sm:w-auto"
              onClick={handleDownload}
            >
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;
