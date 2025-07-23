import React from "react";
import { useFormik } from "formik";
import "./styles.css";

interface OrderUpdatesProps {
  updates: string[];
}

export const OrderUpdates: React.FC<OrderUpdatesProps> = ({ updates }) => {
  const formik = useFormik({
    initialValues: {
      boxChecked: false,
      phone: "",
    },
    onSubmit: () => {},
  });

  const { values, touched, errors, handleChange, handleBlur, setFieldValue } =
    formik;

  const showOrderUpdates = values.boxChecked;

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue("boxChecked", e.target.checked);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue("phone", e.target.value);
  };

  return (
    <form className="order-updates-container" onSubmit={formik.handleSubmit}>
      <div className="text-updates-header">
        <input
          type="checkbox"
          name="boxChecked"
          className="checkbox"
          checked={values.boxChecked}
          onChange={handleCheckboxChange}
        />
        <div className="text-updates-instructions">
          <span className="m-heading">
            Want to receive text messages on this order?
          </span>
          <span className="s-heading">Message and data rates may apply.</span>
        </div>
      </div>

      {showOrderUpdates && (
        <div className="text-updates-content">
          <label className="mobile-label" htmlFor="phone">
            Mobile Phone<span>*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            maxLength={14}
            className="mobile-input"
            value={values.phone}
            required
            onChange={handlePhoneChange}
            onBlur={handleBlur}
          />
          {touched.phone && typeof errors.phone === "string" && (
            <div className="error">{errors.phone}</div>
          )}
          <div className="extra-label">10 digits</div>
        </div>
      )}
    </form>
  );
};
