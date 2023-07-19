import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateCarHandler } from "../Redux/Auth_Reducer/action";

export const UpdateCar = () => {
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
  const id = useParams();
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
    dispatch(updateCarHandler({formData, id}));
    console.log(formData, id);

    setFormData({
      car_model: "",
      car_image: "",
      kms_on_odometer: "",
      major_scratches: false,
      original_paint: false,
      num_accidents_reported: 0,
      num_previous_buyers: 0,
      registration_number: "",
    });
  };

  return (
    <div>
      <h3>Update Car Details</h3>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5em",
          width: "40%",
          margin: "auto",
          border: "1px solid black",
          borderRadius: "8px",
          padding: "1em",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="car_model">Car Model:</label>
        <input
          type="text"
          id="car_model"
          name="car_model"
          value={formData.car_model}
          onChange={handleChange}
        />

        <label htmlFor="car_image">Car Image URL:</label>
        <input
          type="text"
          id="car_image"
          name="car_image"
          value={formData.car_image}
          onChange={handleChange}
        />

        <label htmlFor="kms_on_odometer">KMs on Odometer:</label>
        <input
          type="number"
          id="kms_on_odometer"
          name="kms_on_odometer"
          value={formData.kms_on_odometer}
          onChange={handleChange}
        />

        <div>
          <label htmlFor="major_scratches">Major Scratches:</label>
          <input
            type="checkbox"
            id="major_scratches"
            name="major_scratches"
            checked={formData.major_scratches}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="original_paint">Original Paint:</label>
          <input
            type="checkbox"
            id="original_paint"
            name="original_paint"
            checked={formData.original_paint}
            onChange={handleChange}
          />
        </div>

        <label htmlFor="num_accidents_reported">
          Number of Accidents Reported:
        </label>
        <input
          type="number"
          id="num_accidents_reported"
          name="num_accidents_reported"
          value={formData.num_accidents_reported}
          onChange={handleChange}
        />

        <label htmlFor="num_previous_buyers">Number of Previous Buyers:</label>
        <input
          type="number"
          id="num_previous_buyers"
          name="num_previous_buyers"
          value={formData.num_previous_buyers}
          onChange={handleChange}
        />

        <label htmlFor="registration_number">Registration Number:</label>
        <input
          type="text"
          id="registration_number"
          name="registration_number"
          value={formData.registration_number}
          onChange={handleChange}
        />

        <input type="submit" value="Update Car" />
      </form>
    </div>
  );
};
