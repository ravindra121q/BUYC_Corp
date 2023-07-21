import { useDispatch, useSelector } from "react-redux";
import { deleteCard, getDealerData } from "../Redux/Dealer_Reducer/action";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const OldCarsPage = () => {
  const dispatch = useDispatch();

  const dealerCarData = useSelector((store) => store.DealerReducer.data);
  const isLoading = useSelector((store) => store.DealerReducer.isLoading);
  const navigate = useNavigate();
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [selectedColor, setSelectedColor] = useState("all");
  const [selectedMileage, setSelectedMileage] = useState("all");

  useEffect(() => {
    dispatch(getDealerData(selectedPriceRange, selectedColor, selectedMileage));
  }, [dispatch, selectedPriceRange, selectedColor, selectedMileage]);

  const deleteHandler = (id) => {
    dispatch(deleteCard(id));
    setTimeout(() => {
      alert("Car Deleted Successfully");
    }, 1000);
  };

  const updateHandler = (id) => {
    navigate(`/updateCar/${id}`);
  };

  const handleMileageFilterChange = (e) => {
    setSelectedMileage(e.target.value);
  };

  const handleColorFilterChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const filteredDealerCarData = dealerCarData.filter((car) => {
    if (selectedPriceRange === "all") {
      return true;
    } else if (selectedPriceRange === "low to high") {
      return car.car_price <= 10000;
    } else if (selectedPriceRange === "high to low") {
      return car.car_price > 10000;
    }

    if (selectedColor === "all") {
      return true;
    } else {
      return car.car_color.toLowerCase() === selectedColor.toLowerCase();
    }

    if (selectedMileage === "all") {
      return true;
    } else if (selectedMileage === "low") {
      return car.kms_on_odometer <= 50000;
    } else if (selectedMileage === "medium") {
      return car.kms_on_odometer > 50000 && car.kms_on_odometer <= 100000;
    } else if (selectedMileage === "high") {
      return car.kms_on_odometer > 100000;
    }

    return false;
  });
  const handlePriceFilterChange = (e) => {
    setSelectedPriceRange(e.target.value);
  };

  return (
    <div>
      <h2 style={{ textDecoration: "underline" }}>Dealer's Car Page</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2.5em",
          lineHeight: "0.1em",
        }}
      >
        <div>
          <h4>Filter</h4>
          <h4> By Price</h4>
          <select value={selectedPriceRange} onChange={handlePriceFilterChange}>
            <option value="all">All</option>
            <option value="low to high">Less then 10000</option>
            <option value="high to low">Higher then 10000</option>
          </select>
        </div>
        <div>
          {" "}
          <h4>Filter</h4>
          <h4>By Color</h4>
          <select value={selectedColor} onChange={handleColorFilterChange}>
            <option value="all">All</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
          </select>
        </div>
        <div>
          {" "}
          <h4>Filter</h4>
          <h4>By Mileage</h4>
          <select value={selectedMileage} onChange={handleMileageFilterChange}>
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
      <div>
        {isLoading ? (
          <h3>...Loading</h3>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              padding: "0.5em",
              justifyContent: "space-between",
              gap: "2em",
              height: "auto",
              width: "85%",
              margin: "auto",
              marginTop: "3em",
            }}
            mt={5}
          >
            {filteredDealerCarData.length > 0 ? (
              filteredDealerCarData.map((car) => {
                const {
                  _id,
                  car_model,
                  car_color,
                  car_price,
                  car_image,
                  kms_on_odometer,
                  major_scratches,
                  original_paint,
                  num_accidents_reported,
                  num_previous_buyers,
                  registration_number,
                } = car;
                return (
                  <div
                    key={_id}
                    style={{
                      boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px",

                      margin: "auto",
                      borderRadius: "8px",
                      width: "16em",
                      paddingBottom: "0.3em",
                      lineHeight: "0.5em",
                    }}
                  >
                    <img
                      style={{
                        width: "100%",

                        borderRadius: "8px",
                      }}
                      src={car_image}
                      alt={car_model}
                    />
                    <h3>{car_model}</h3>
                    <h4>{registration_number}</h4>
                    <p>{"Kms :" + kms_on_odometer}</p>
                    <p>{"Major Scratches: " + major_scratches}</p>
                    <p>
                      {"Original Paint: " + (original_paint ? "YES" : "NO")}
                    </p>
                    <p>{"Price: " + car_price}</p>
                    <p>{"color: " + car_color}</p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "1em",
                      }}
                    >
                      <input type="checkbox" />
                      <button
                        style={{ borderRadius: "8px" }}
                        onClick={() => deleteHandler(_id)}
                      >
                        Delete
                      </button>
                      <button
                        style={{ borderRadius: "8px" }}
                        onClick={() => updateHandler(_id)}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>
                <h3>No Car Details Found</h3>
                <h3>Please Add Car Details in Add Cars Page</h3>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OldCarsPage;
