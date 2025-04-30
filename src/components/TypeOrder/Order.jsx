import { Select } from "antd";
import React, { useContext, useState } from "react";
import ShowData from "../ShowData/ShowData";
import { SelectedDataContext } from "../SelectedDataContext/SelectedDataContext";

const Order = ({ data }) => {
  const [datas, setData] = useState(data);
  const [selectedData, setSelectedData1] = useState({});
  const { setSelectedData } = useContext(SelectedDataContext);

  const handleChange = (value) => {
    const foundData = datas.find((item) => item.orderCode === value);
    if (foundData) {
      setSelectedData1(foundData);
      setSelectedData(foundData);
    } else {
      setSelectedData1({});
      setSelectedData({});
    }
  };

  return (
    <div>
      <Select
        defaultValue=""
        placeholder="Select an order"
        onChange={handleChange}
        style={{ width: 200 }}
        options={datas.map((item) => ({
          value: item.orderCode,
          label: item.orderCode,
        }))}
      />
      <ShowData data={selectedData} />
    </div>
  );
};

export default Order;
