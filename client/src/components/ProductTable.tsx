import React from "react";

const ProductTable = () => {
  return (
    <div className="overflow-x-auto w-full rounded-md border border-[#424647]">
      <table className="min-w-[600px] sm:min-w-full text-white text-sm font-poppins">
        <thead className="bg-white">
          <tr>
            <th className="px-6 py-3 border-b border-[#424647] text-black font-medium text-left">
              Product Name
            </th>
            <th className="px-6 py-3 border-b border-[#424647] text-black font-medium text-left">
              Price
            </th>
            <th className="px-6 py-3 border-b border-[#424647] text-black font-medium text-left">
              Quantity
            </th>
            <th className="px-6 py-3 border-b border-[#424647] text-black font-medium text-left">
              Total Price
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-6 py-3 border-b border-[#424647]">(Productname-1)</td>
            <td className="px-6 py-3 border-b border-[#424647]">5</td>
            <td className="px-6 py-3 border-b border-[#424647]">10</td>
            <td className="px-6 py-3 border-b border-[#424647]">INR 50</td>
          </tr>
          <tr>
            <td className="px-6 py-3 border-b border-[#424647]">(Productname-2)</td>
            <td className="px-6 py-3 border-b border-[#424647]">2</td>
            <td className="px-6 py-3 border-b border-[#424647]">10</td>
            <td className="px-6 py-3 border-b border-[#424647]">INR 20</td>
          </tr>
        </tbody>
        <tfoot className="bg-[#202020] font-semibold">
          <tr>
            <td colSpan={3} className="px-6 py-3 text-right border-t border-[#424647]">
              Sub-Total
            </td>
            <td className="px-6 py-3 border-t border-[#424647]">INR 82.6</td>
          </tr>
          <tr>
            <td colSpan={3} className="px-6 py-3 text-right border-t border-[#424647]">
              Incl + GST 18%
            </td>
            <td className="px-6 py-3 border-t border-[#424647]">INR 82.6</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ProductTable;
