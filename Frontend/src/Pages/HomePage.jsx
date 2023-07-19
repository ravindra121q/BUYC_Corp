import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../Redux/Data_Reducer/action";
import { Card1 } from "../Components/Card";

const HomePage = () => {
  const dispatch = useDispatch();
  const [oem1, setOem1] = useState([]);
  const data = useSelector((store) => store.DataReducer.data);
  const loading = useSelector((store) => store.DataReducer.isLoading);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const searchHandler = async () => {
    const searchTerm = search.trim().toLowerCase();
    if (!searchTerm) {
      setOem1([]);
      return;
    }

    try {
      console.log(searchTerm);
      const response = await fetch(
        `https://silly-deer-slacks.cyclic.app/oem?model_name=${encodeURIComponent(
          searchTerm
        )}`
      );
      if (response.ok) {
        const searchData = await response.json();
        setOem1(searchData);
      } else {
        console.error("Failed to fetch data from the backend");
      }
    } catch (error) {
      console.error("Error fetching data from the backend:", error);
    }
  };

  const resetSearch = () => {
    setSearch("");
    setOem1([]);
  };

  return (
    <div>
      <h1>OEM Cars</h1>
      <div style={{ marginBottom: "4em" }}>
        <div>
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="text"
          />
          <button onClick={searchHandler}>Search</button>
          <button onClick={resetSearch}>Reset</button>
        </div>
        <div></div>
      </div>

      <div style={{ width: "95%", margin: "auto", marginLeft: "7em" }}>
        {loading ? (
          <h1 style={{ marginRight: "6em" }}>....Loading</h1>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: "3em",
              width: "95%",
              margin: "auto",
            }}
          >
            {oem1.length > 0
              ? oem1.map((e) => (
                  <div key={e._id}>
                    <Card1 {...e} />
                  </div>
                ))
              : data.map((e) => (
                  <div key={e._id}>
                    <Card1 {...e} />
                  </div>
                ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
