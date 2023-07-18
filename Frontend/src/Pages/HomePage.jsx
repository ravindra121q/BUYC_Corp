import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../Redux/Data_Reducer/action";
import { Card1 } from "../Components/Card";

export const HomePage = () => {
  const dispatch = useDispatch();
  const [oem1, setOem1] = useState([]);
  const data = useSelector((store) => store.DataReducer.data);
  const loading = useSelector((store) => store.DataReducer.isLoading);

  useEffect(() => {
    dispatch(getData());
  }, []);

  return (
    <div>
      <h1>OEM Cars</h1>
      <div>
        {loading && <h1>....Loading</h1>}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "3em",
            width: "95%",
            margin: "auto",
          }}
        >
          {data.length > 0 &&
            data.map((e) => {
              return (
                <div key={e._id}>
                  <Card1  {...e} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
