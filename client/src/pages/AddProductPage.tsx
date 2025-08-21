import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import ProductForm from "@/components/ProductForm";
import ProductTable from "@/components/ProductTable";
import InvoicePreview from "@/components/InvoicePreview";
import { Button } from "@/components/ui/button";

const AddProductPage = () => {
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_URL}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data.user);
        } else {
          toast.error(data.message || "Failed to fetch user");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        toast.error("Error fetching user");
      }
    };

    if (token) fetchUser();
  }, [API_URL, token]);

  const handleGeneratePDF = async () => {
    try {
      const res = await fetch(`${API_URL}/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok || !data.products) {
        toast.error(data.message || "No products found");
        return;
      }

      const products = data.products.map((p: any) => ({
        name: p.name,
        qty: p.quantity,
        rate: p.price,
        total: `₹${(p.price * p.quantity).toFixed(2)}`,
      }));

      const subtotal = products.reduce((sum, p) => sum + p.rate * p.qty, 0);
      const gst = subtotal * 0.18;
      const grandTotal = subtotal + gst;

      const invoice = {
        name: user?.username || "Unknown User",
        date: new Date().toLocaleDateString("en-GB"),
        email: user?.email || "N/A",
        products,
        totalCharges: `₹${subtotal.toFixed(2)}`,
        gst: `₹${gst.toFixed(2)}`,
        totalAmount: `₹${grandTotal.toFixed(2)}`,
      };

      setInvoiceData(invoice);
      setShowInvoice(true);

      const pdfRes = await fetch(`${API_URL}/generate-invoice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ invoiceData: invoice }),
      });

      if (pdfRes.ok) {
        const pdfBlob = await pdfRes.blob();
        const url = window.URL.createObjectURL(pdfBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "invoice.pdf";
        a.click();
        window.URL.revokeObjectURL(url);
        toast.success("Invoice PDF generated successfully!");
      } else {
        const errorData = await pdfRes.json();
        toast.error(errorData.error || "Failed to generate PDF");
      }
    } catch (err) {
      console.error("Error generating PDF:", err);
      toast.error("Something went wrong while generating PDF.");
    }
  };

  return (
    <div className="h-screen overflow-auto bg-[#141414] flex flex-col font-poppins relative px-4 lg:px-40 pt-10">
      <div className="absolute inset-0 left-[600px] top-[33.55px] z-10 hidden lg:block">
        <div className="w-[420px] h-[120px] bg-[#4F59A8] rounded-full blur-[100px] opacity-40"></div>
      </div>

      <div className="relative z-20 md:mt-20">
        <div className="mb-8">
          <h2 className="text-3xl text-white font-semibold">Add Products</h2>
          <p className="text-[#A7A7A7]">Fill the details below to add a new product.</p>
        </div>

        <ProductForm />
        <div className="mt-10 overflow-auto">
          <ProductTable />
        </div>

        <div className="flex justify-center mt-10 mb-20">
          <Button
            onClick={handleGeneratePDF}
            className="text-[#CCF575] bg-[#303030] w-full sm:w-[436px] h-[45px] rounded-sm flex items-center gap-2 hover:bg-[#CCF575] hover:text-[#141414] transition-all duration-300"
          >
            Generate PDF Invoice
          </Button>
        </div>

        {showInvoice && invoiceData && (
          <InvoicePreview data={invoiceData} onClose={() => setShowInvoice(false)} />
        )}
      </div>
    </div>
  );
};

export default AddProductPage;
