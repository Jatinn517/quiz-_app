import React, { useEffect, useState } from "react";
import { getServerData } from "../helper/helper";

export default function ResultTable() {
  const [Data, setData] = useState([]);
  const [data, setdata] = useState([]);

  useEffect(() => {
    getServerData("http://localhost:5000/api/result", (res) => {
      setData(res);
      setdata([...Data].sort((a, b) => b.points - a.points));
    });
  });
  return (
    <div>
      <table>
        <thead className="table-header">
          <tr className="table-row">
            <td>Name</td>
            <td>Attemps</td>
            <td>Earn Points</td>
            <td>Result</td>
          </tr>
        </thead>
        <tbody>
          {!data ?? <div>No Data Found </div>}
          {/* {console.log(Data.length)} */}
          {data.map((v, i) => (
            <tr className="table-body" key={i}>
              <td>{v?.username || ""}</td>
              <td>{v?.attempts || 0}</td>
              <td>{v?.points || 0}</td>
              <td>{v?.achieved || ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
