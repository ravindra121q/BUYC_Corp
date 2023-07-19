import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewCar } from "../Redux/Auth_Reducer/action";

export const AddCarPage = () => {
  const [formData, setFormData] = useState({
    car_model: "",
    car_image: "",
    kms_on_odometer: "",
    major_scratches: false,
    original_paint: false,
    num_accidents_reported: 0,
    num_previous_buyers: 0,
    registration_number: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const updatedValue = type === "checkbox" ? checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      car_image,
      kms_on_odometer,
      registration_number,
      original_paint,
      num_accidents_reported,
      num_previous_buyers,
      major_scratches,
      car_price,
      car_color,
    } = formData;

    if (
      car_image === "" ||
      kms_on_odometer === "" ||
      registration_number === "" ||
      car_price === "" ||
      car_color === "" 
    ) {
      return alert("Please Fill All the Details");
    }

    const obj = {
      car_image,
      kms_on_odometer,
      registration_number,
      original_paint,
      num_accidents_reported,
      num_previous_buyers,
      major_scratches,
      car_price,
      car_color,
    };

    dispatch(addNewCar(obj));

    setFormData({
      car_image: "",
      kms_on_odometer: "",
      major_scratches: false,
      original_paint: false,
      num_accidents_reported: 0,
      num_previous_buyers: 0,
      registration_number: "",
      car_price: "",
      car_color: "",
    });
  };

  return (
    <div>
      <h3>Add Car Details</h3>
      <div
        style={{
          border: "1px solid black",
          width: "40%",
          padding: "1em",
          borderRadius: "8px",
          margin: "auto",
          textAlign: "left",
          justifyContent: "space-between",
          gap: "1em",
          padding: "1em",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1em",
            width: "100%",
            margin: "auto",
          }}
        >
          <div>
            <label style={{ marginRight: "3em" }} htmlFor="car_model">
              Car Model:
            </label>
            <input
              type="text"
              id="car_model"
              value={formData.car_model}
              name="car_model"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="car_price">Car Price:</label>
            <input
              type="Number"
              id="car_price"
              value={formData.car_price}
              name="car_price"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="car_color">Car Color:</label>
            <input
              type="text"
              id="car_color"
              value={formData.car_color}
              name="car_color"
              onChange={handleChange}
            />
          </div>
          <div>
            <label style={{ marginRight: "1em" }} htmlFor="car_image">
              Car Image URL:
            </label>
            <input
              type="text"
              id="car_image"
              value={formData.car_image}
              name="car_image"
              onChange={handleChange}
            />
          </div>
          <div>
            <label style={{ marginRight: "1em" }} htmlFor="kms_on_odometer">
              KMs on Odometer:
            </label>
            <input
              type="number"
              id="kms_on_odometer"
              value={formData.kms_on_odometer}
              name="kms_on_odometer"
              onChange={handleChange}
            />
            <div>
              <label htmlFor="major_scratches">Major Scratches:</label>
              <input
                style={{ marginRight: "3em" }}
                type="checkbox"
                id="major_scratches"
                checked={formData.major_scratches}
                name="major_scratches"
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label htmlFor="original_paint">Original Paint:</label>
            <input
              type="checkbox"
              id="original_paint"
              checked={formData.original_paint}
              name="original_paint"
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              style={{ marginRight: "1em" }}
              htmlFor="num_accidents_reported"
            >
              No. of Accidents:
            </label>
            <input
              type="number"
              id="num_accidents_reported"
              value={formData.num_accidents_reported}
              name="num_accidents_reported"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="num_previous_buyers">
              Number of Previous Buyers:
            </label>
            <input
              type="number"
              id="num_previous_buyers"
              value={formData.num_previous_buyers}
              name="num_previous_buyers"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="registration_number">Registration Number:</label>
            <input
              type="text"
              id="registration_number"
              value={formData.registration_number}
              name="registration_number"
              onChange={handleChange}
            />
          </div>

          <input type="submit" value="Add Car" />
        </form>
      </div>
    </div>
  );
};
