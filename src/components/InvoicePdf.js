import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';

const InvoicePdf = () => {
  const invoiceRef = useRef();

  const downloadPDF = () => {
    const element = invoiceRef.current;
    const options = {
      margin:       0.5,
      filename:     'invoice.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(options).from(element).save();
  };

  return (
    <div>
      <div ref={invoiceRef} className="invoice p-6 bg-white text-black">
        <h1>Invoice</h1>
        <p>Customer: John Doe</p>
        <p>Date: 2025-07-29</p>
        <table>
          <thead>
            <tr><th>Item</th><th>Qty</th><th>Price</th></tr>
          </thead>
          <tbody>
            <tr><td>Product A</td><td>2</td><td>$100</td></tr>
            <tr><td>Product B</td><td>1</td><td>$50</td></tr>
          </tbody>
        </table>
        <p>Total: $250</p>
      </div>

      <button onClick={downloadPDF} className="mt-4 bg-blue-500 text-white p-2 rounded">Download PDF</button>
    </div>
  );
};

export default InvoicePdf;
