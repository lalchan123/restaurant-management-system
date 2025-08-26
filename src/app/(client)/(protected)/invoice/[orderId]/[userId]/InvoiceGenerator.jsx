"use client"; // only in Next.js if using app router

import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const InvoiceGenerator = () => {
  const invoiceRef = useRef();

  const handleDownload = async () => {
    const element = invoiceRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("invoice.pdf");
  };

  return (
    <div className="p-8">
      <div ref={invoiceRef} className="max-w-xl mx-auto bg-white p-6 border rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Invoice</h1>
        <div className="mb-4">
          <p><strong>Invoice #: </strong>#001</p>
          <p><strong>Date: </strong>{new Date().toLocaleDateString()}</p>
        </div>

        <div className="mb-4">
          <h2 className="font-semibold mb-2">Bill To:</h2>
          <p>John Doe</p>
          <p>123 Main Street</p>
          <p>City, Country</p>
        </div>

        <table className="w-full border mt-4 text-left text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Item</th>
              <th className="border px-2 py-1">Qty</th>
              <th className="border px-2 py-1">Price</th>
              <th className="border px-2 py-1">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 py-1">Product A</td>
              <td className="border px-2 py-1">2</td>
              <td className="border px-2 py-1">$50</td>
              <td className="border px-2 py-1">$100</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Product B</td>
              <td className="border px-2 py-1">1</td>
              <td className="border px-2 py-1">$80</td>
              <td className="border px-2 py-1">$80</td>
            </tr>
          </tbody>
        </table>

        <div className="text-right mt-4">
          <p className="font-semibold">Total: $180</p>
        </div>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={handleDownload}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default InvoiceGenerator;
