import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateCarHandler } from "../Redux/Auth_Reducer/action";
import axios from "axios";

export const UpdateCar = () => {
  let [carData, setCarData] = useState({});
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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const id = useParams();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === "checkbox" ? checked : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: updatedValue,
    }));
  };
  const myfun = () => {
    setIsLoading(true);
    const newToken = token.replace(/"/g, "");
    axios
      .get(`https://silly-deer-slacks.cyclic.app/dealer/car/update/${id.id}`, {
        headers: {
          Authorization: `Bearer ${newToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setCarData(res.data);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    myfun();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.car_image === "") {
      formData.car_image = carData.car_image;
    }
    if (formData.kms_on_odometer === "") {
      formData.kms_on_odometer = carData.kms_on_odometer;
    }
    if (formData.registration_number === "") {
      formData.registration_number = carData.registration_number;
    }
    if (formData.car_price === "") {
      formData.car_price = carData.car_price;
    }
    if (formData.car_color === "") {
      formData.car_color = carData.car_color;
    }
    if (formData.num_accidents_reported === "") {
      formData.num_accidents_reported = carData.num_accidents_reported;
    }
    if (formData.num_previous_buyers === "") {
      formData.num_previous_buyers = carData.num_previous_buyers;
    }
    if (formData.major_scratches === "") {
      formData.major_scratches = carData.major_scratches;
    }
    if (formData.original_paint === "") {
      formData.original_paint = carData.original_paint;
    }

    dispatch(updateCarHandler({ formData, id }));

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
    alert("Car Details Updated Successfully");
    navigate("/dealer");
  };

  return (
    <div>
      <h3>Update Car Details</h3>
      {!isLoading && (
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5em",
            width: "25%",
            margin: "auto",
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
            borderRadius: "8px",
            padding: "1em",
          }}
          onSubmit={handleSubmit}
        >
          <label htmlFor="car_model">Car Model:</label>
          <input
            type="text"
            id="registration_number"
            name="registration_number"
            value={formData.registration_number}
            onChange={handleChange}
            placeholder={carData.registration_number}
          />

          <label htmlFor="car_image">Car Image URL:</label>
          <input
            type="text"
            id="car_image"
            name="car_image"
            value={formData.car_image}
            onChange={handleChange}
            placeholder={carData.car_image}
          />

          <label htmlFor="kms_on_odometer">KMs on Odometer:</label>
          <input
            type="number"
            id="kms_on_odometer"
            name="kms_on_odometer"
            value={formData.kms_on_odometer}
            onChange={handleChange}
            placeholder={carData.kms_on_odometer}
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
            placeholder={carData.num_accidents_reported}
          />

          <label htmlFor="num_previous_buyers">
            Number of Previous Buyers:
          </label>
          <input
            type="number"
            id="num_previous_buyers"
            name="num_previous_buyers"
            value={formData.num_previous_buyers}
            onChange={handleChange}
            placeholder={carData.num_previous_buyers}
          />

          <input
            style={{
              width: "40%",
              margin: "auto",
              borderRadius: "8px",
              padding: "0.5em",
            }}
            type="submit"
            value="Update Car"
          />
        </form>
      )}
    </div>
  );
};
