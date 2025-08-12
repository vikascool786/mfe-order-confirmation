import React from "react";
import { useFormik } from "formik";
import SectionCard from "../../layout/SectionCard";
import "../OrderUpdates/styles.css";
import RoundedButton from "../../layout/Button";
import { updatePrePC } from "../../config/api";
import { CustomerDetails } from "../../types";

interface IGuestCheckout {
  email: string;
  sessionId: string;
  customerDetails: CustomerDetails;
  setCustomerDetails: (details: CustomerDetails) => void;
}
export const GuestCheckout: React.FC<IGuestCheckout> = ({
  email,
  customerDetails,
  sessionId,
  setCustomerDetails,
}) => {
  const { values, touched, errors, setErrors, handleChange, submitForm, handleSubmit } =
    useFormik({
      initialValues: {
        password: "",
      },
      validate: (values) => {
        // Formik expects errors to be of type { password?: string }
        const errors: { password?: string } = {};
        const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,25}$/;
        const PASSWORD_REGEX_EXCLUDE_CHARS = /^[^/@/%/</>/$]{7,25}$/;
        if (!values.password) {
          errors.password = "Password is required";
        } else if (!PASSWORD_REGEX.test(values.password)) {
          errors.password = "Password must be 7-25 characters and include uppercase, lowercase, and a number";
        } else if (!PASSWORD_REGEX_EXCLUDE_CHARS.test(values.password)) {
          errors.password = "Password contains invalid special characters";
        }
        return errors;
      },
      onSubmit: async (values) => {
        try {
          const response = await updatePrePC({
            firstName: customerDetails.data.first_name,
            lastName: customerDetails.data.last_name,
            referrer: "",
            password: values.password,
            mobilePhone: "",
            passwordConfirm: values.password,
            portalname: customerDetails.data.shop_portal_id,
            optInIds: "5,0",
            userSessionId: sessionId,
            email: email,
          });

          setCustomerDetails(response.data);
        } catch (error) {
            setErrors({ password: "Failed to create account. Please try again." });
            console.error(error)
        }
      },
    });

  return (
    <SectionCard title="Finish Creating your Account">
      <form onSubmit={handleSubmit}>
        <div className="text-updates-content">
          <label className="mobile-label">{email}</label>
          <label className="mobile-label" htmlFor="password">
            Create Password<span>*</span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="mobile-input"
            value={values.password}
            required
            onChange={handleChange}
          />
          {touched.password && typeof errors.password === "string" && (
            <div className="error">{errors.password}</div>
          )}

          <RoundedButton onClick={handleSubmit} text="Create Account" />
        </div>
      </form>
    </SectionCard>
  );
};
