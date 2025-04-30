import React, { useContext, useState } from "react";
import "./TemplateToPDF.css";
import { SelectedDataContext } from "../SelectedDataContext/SelectedDataContext";
import { Button, Select } from "antd";
import ShowPrint from "./ShowPrint";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const TemplateToPDF = () => {
  const { selectedData } = useContext(SelectedDataContext);
  const [paper, setPaper] = useState("");
  const maxItemsByPaper = {
    "Giấy in nhiệt": 2,
    A4: 20,
    Fort: 20,
    K80: 3,
    K57: 2,
    Carbonless: 20,
    Couche: 20,
    Ivory: 20,
  };

  const maxItems = maxItemsByPaper[paper] || 2;

  const paperOptions = [
    { label: "Giấy in nhiệt", value: "Giấy in nhiệt" },
    { label: "A4", value: "A4" },
    { label: "Fort", value: "Fort" },
    { label: "K80", value: "K80" },
    { label: "K57", value: "K57" },
    { label: "Carbonless", value: "Carbonless" },
    { label: "Couche", value: "Couche" },
    { label: "Ivory", value: "Ivory" },
  ];

  const paperSizes = {
    "Giấy in nhiệt": { width: 100, height: 150 },
    A4: { width: 210, height: 297 },
    Fort: { width: 210, height: 297 },
    K80: { width: 80, height: 150 },
    K57: { width: 57, height: 100 },
    Carbonless: { width: 210, height: 297 },
    Couche: { width: 210, height: 297 },
    Ivory: { width: 210, height: 297 },
  };

  const handleChange = (value) => {
    setPaper(value);
  };

  const waitForImages = (element) => {
    const images = element.getElementsByTagName("img");
    const promises = Array.from(images).map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    });
    return Promise.all(promises);
  };

  const handlePrint = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 100));

      const element = document.getElementById("pdf-content");
      if (!element) {
        throw new Error("Không tìm thấy phần tử với id 'pdf-content'");
      }

      await waitForImages(element);

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const size = paperSizes[paper] || paperSizes["Giấy in nhiệt"];
      const pdf = new jsPDF("p", "mm", [size.width, size.height]);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`mau_${paper || "mac-dinh"}.pdf`);
    } catch (error) {
      console.error("Lỗi khi tạo PDF:", error);
      alert("Không thể tạo PDF. Vui lòng thử lại.");
    }
  };

  return (
    <div className="template-to-pdf">
      <h1>Chuyển mẫu thành PDF</h1>
      <div style={{ marginBottom: 20 }}>
        <Select
          defaultValue=""
          placeholder="Chọn loại giấy"
          onChange={handleChange}
          style={{ width: 200 }}
          options={paperOptions}
        />
        <Button
          type="primary"
          onClick={handlePrint}
          style={{ marginLeft: 10 }}
          disabled={!paper}
        >
          Tạo PDF
        </Button>
      </div>
      {paper && (
        <div
          className={`show ${paper.toLowerCase().replace(/\s+/g, "-")}`}
          id="pdf-content"
          style={{
            width: `${paperSizes[paper]?.width || 100}mm`,
            height: `${paperSizes[paper]?.height || 150}mm`,
          }}
        >
          <ShowPrint paper={paper} data={selectedData} maxItems={maxItems} />
        </div>
      )}
    </div>
  );
};

export default TemplateToPDF;
