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
      <h3>Filter</h3>
      <div style={{ display: "flex", justifyContent: "center", gap: "1em" }}>
        <div>
          <h3> By Price</h3>
          <select value={selectedPriceRange} onChange={handlePriceFilterChange}>
            <option value="all">All</option>
            <option value="low to high">Less then 10000</option>
            <option value="high to low">Higher then 10000</option>
          </select>
        </div>
        <div>
          <h3>By Color</h3>
          <select value={selectedColor} onChange={handleColorFilterChange}>
            <option value="all">All</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
          </select>
        </div>
        <div>
          <h3>By Mileage</h3>
          <select value={selectedMileage} onChange={handleMileageFilterChange}>
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
      <hr />
      <div>
        {isLoading ? (
          <h3>...Loading</h3>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              marginTop: "3em",
              padding: "1em",
              justifyContent: "space-between",
              gap: "2em",
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
                  <div key={_id}>
                    <div
                      style={{
                        border: "1px solid black",
                        borderRadius: "8px",
                        padding: "0.5em",
                      }}
                    >
                      <img src={car_image} alt={car_model} />
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
                        <button onClick={() => deleteHandler(_id)}>
                          Delete
                        </button>
                        <button onClick={() => updateHandler(_id)}>
                          Update
                        </button>
                      </div>
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
