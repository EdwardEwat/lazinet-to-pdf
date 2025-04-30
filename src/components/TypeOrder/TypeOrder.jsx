import React, { useState, useContext, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import "./TypeOrder.css";
import Order from "./Order";
import ShowData from "../ShowData/ShowData";
import { AuthContext } from "../AuthContext/AuthContext";
import { fetchGetAllOrder } from "../../redux/OrderSlice/OrderSlice";

const TypeOrder = () => {
  const [value, setValue] = useState(0);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);
  const { ordersItem } = useSelector((state) => state.orders);
  const { dataGot, setDataGot } = useState(false);

  const params = {
    page: 0,
    size: 10,
    status: "DELIVERED",
    token: "Bearer " + token,
  };

  const getOrders = async () => {
    try {
      const res = await dispatch(
        fetchGetAllOrder({
          page: params.page,
          size: params.size,
          status: params.status,
          token: params.token,
        })
      ).unwrap();
      setData(res.ordersItem);
      setDataGot(true);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (value !== 0 && !dataGot) {
      getOrders();
    }
  }, [value]);


  return (
    <div className="TypeOrder">
      <Select
        showSearch
        style={{ width: 200, marginBottom: 20 }}
        placeholder="Search to Select"
        optionFilterProp="label"
        options={[
          {
            value: "1",
            label: "All Order",
          },
          {
            value: "2",
            label: "One Order",
          },
        ]}
        onChange={(value) => setValue(value)}
      />
      {value === "2" && <Order data={ordersItem} />}
      {value === "1" && <ShowData data={ordersItem} />}
    </div>
  );
};

export default TypeOrder;
