import React from "react";
import "./ShowPrint.css";
import logo from "../../images/logo.png";
import Barcode from "react-barcode";
import { QRCodeCanvas } from "qrcode.react";

const ShowPrint = ({ data, maxItems }) => {
  const qrData = JSON.stringify({
    orderCode: data.orderCode,
    totalPrice: data.totalPrice,
    shippingId: data.shipingId,
    customerName: data.customerName,
    customerPhone: data.customerPhone,
    customerAddress: data.customerAddress,
    orderItems: data.orderItems?.map((item) => ({
      productTitle: item.productTitle,
      skuCode: item.skuCode,
      quantity: item.quantity,
      productPrice: item.productPrice,
    })),
  });

  return (
    <div className="show-print">
      <div className="header">
        <div className="logo">
          <img
            src={data.merchant?.logo || logo}
            alt="logo"
            crossOrigin="anonymous"
            onError={(e) => {
              e.target.src = logo;
            }}
          />
        </div>
        <div className="carrier">
          <h3>J&T Express</h3>
        </div>
      </div>

      <div className="infomations">
        <div className="barcode">
          <Barcode
            value={data.orderCode || ""}
            width={1.5}
            height={60}
            fontSize={12}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid black",
          }}
        >
          <div className="info">
            <p>
              <strong>Người gửi: </strong>
              {data.merchant?.fullName
                ? "*".repeat(data.merchant.fullName.lastIndexOf(" ")) +
                  data.merchant.fullName.slice(
                    data.merchant.fullName.lastIndexOf(" ")
                  )
                : ""}
            </p>
            <p>
              <strong>Địa chỉ:</strong>{" "}
              {data.merchant?.address +
                ", " +
                data.merchant?.ward +
                ", " +
                data.merchant?.district +
                ", " +
                data.merchant?.city || ""}
            </p>
            <div className="infoGuest">
              <p style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <strong>Người nhận: </strong>
                  {data.customerName || ""}
                </div>
                <div style={{ float: "right", paddingRight: "5px" }}>
                  <strong>SĐT:</strong>
                  {data.customerPhone
                    ? "*".repeat(data.customerPhone.length - 4) +
                      data.customerPhone.slice(-4)
                    : ""}
                </div>
              </p>
              <p style={{ borderTop: "1px solid black" }}>
                <strong>Địa chỉ:</strong> {data.customerAddress || ""}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderTop: "1px solid black",
              }}
            >
              <span>
                <strong>Mã đơn hàng: </strong>
                {data.orderCode || ""}
              </span>
              <span
                style={{
                  float: "right",
                  borderLeft: "1px solid black",
                  paddingLeft: "5px",
                }}
              >
                <strong>Ngày đặt: </strong>
                {data.createdAt
                  ? new Date(data.createdAt).toLocaleString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""}
              </span>
            </div>
          </div>

          <div className="cod">
            <p style={{ margin: "5px 0" }}>{data.id || ""}</p>
            <p
              style={{
                backgroundColor: "black",
                color: "white",
                margin: "5px 0",
                marginBottom: "0",
              }}
            >
              COD
            </p>
            <p
              style={{
                borderTop: "1px solid black",
                borderBottom: "1px solid black",
                margin: "5px 0",
                marginTop: "0",
              }}
            >
              {data.shipingId || ""}
            </p>
            <p style={{ margin: "5px 0" }}>
              <QRCodeCanvas value={qrData} size={80} />
            </p>
          </div>
        </div>
      </div>

      <div className="product-info">
        <table>
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
              <th>SKU</th>
              <th>Số lượng</th>
            </tr>
          </thead>
          <tbody>
            {data.orderItems?.slice(0, maxItems).map((item, index) => (
              <tr key={item.skuCode || index}>
                <td>{item.productTitle}</td>
                <td>{item.skuCode}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ margin: "5px 0", border: "1px solid #000" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid #000",
          }}
        >
          <span style={{ padding: "0 5px" }}>
            <strong>Giá sản phẩm: </strong>
            {data.productsPrice || ""}
          </span>
          <span style={{ padding: "0 5px", borderLeft: "1px solid #000" }}>
            <strong>Phí vận chuyển: </strong> {data.shippingFee || ""}
          </span>
        </div>
        <span style={{ padding: "0 5px" }}>
          <strong>Tổng tiền: </strong> {data.totalPrice || ""}
        </span>
      </div>
    </div>
  );
};

export default ShowPrint;
