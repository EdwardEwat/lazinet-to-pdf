import React from "react";
import "./ShowData.css";

const ShowData = ({ data }) => {
  return (
    <div className="showArea">
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : "No data to display"}
    </div>
  );
};

export default ShowData;
