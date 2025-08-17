import React, { useState } from "react";
import { useFormik } from "formik";
import SectionCard from "../../layout/SectionCard";
import "../OrderUpdates/styles.css";
import RoundedButton from "../../layout/Button";
import { updatePrePC } from "../../config/api";
import { CustomerDetails, IOrder } from "../../types";
import Checked from "../../assets/svgs/Checked";

interface IGuestCheckout {
  email: string;
  sessionId: string;
  orderDetails: IOrder;
  customerDetails: CustomerDetails;
  setCustomerDetails: (details: CustomerDetails) => void;
}

const PASSWORD_RULES = [
  "• 1 Uppercase",
  "• 1 Lowercase",
  "• 1 Number",
  "• 7-25 Characters",
  "• Optional: Special characters except for >, <, %, @, and $",
];
export const GuestCheckout: React.FC<IGuestCheckout> = ({
  email,
  customerDetails,
  orderDetails,
  sessionId,
  setCustomerDetails,
}) => {
  const [isAccountCreated, setIsAccountCreated] = useState(true);

  const firstName =
    customerDetails.data?.first_name?.length > 0
      ? customerDetails.data.first_name
      : orderDetails.invoices.at(0)?.billingAddress.first ?? "";

  const lastName =
    customerDetails.data?.last_name?.length > 0
      ? customerDetails.data.last_name
      : orderDetails.invoices.at(0)?.billingAddress.last ?? "";
  const {
    values,
    touched,
    errors,
    setErrors,
    handleChange,
    submitForm,
    handleSubmit,
  } = useFormik({
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
        errors.password =
          "Password must be 7-25 characters and include uppercase, lowercase, and a number";
      } else if (!PASSWORD_REGEX_EXCLUDE_CHARS.test(values.password)) {
        errors.password = "Password contains invalid special characters";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const response = await updatePrePC({
          firstName,
          lastName,
          referrer: "",
          password: values.password,
          mobilePhone: "",
          passwordConfirm: values.password,
          portalname: customerDetails.data.shop_portal_id,
          optInIds: "5,0",
          userSessionId: sessionId,
          email: email,
        });

        setIsAccountCreated(false);
      } catch (error) {
        setErrors({ password: "Failed to create account. Please try again." });
        console.error(error);
      }
    },
  });

  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,25}$/;
  const hasUpper = /[A-Z]/.test(values.password);
  const hasLower = /[a-z]/.test(values.password);
  const hasNumber = /\d/.test(values.password);
  const validLength = /^.{7,25}$/.test(values.password);
  const invalidChars = /[@%<>$]/.test(values.password);

  return (
    <SectionCard title="Finish Creating your Account">
      {isAccountCreated ? (
        <form onSubmit={handleSubmit}>
          <div className="oc-updates-text-updates-content">
            <label className="oc-updates-email-label">{email}</label>
            <label className="oc-updates-mobile-label" htmlFor="password">
              Create Password<span>*</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="oc-updates-mobile-input "
              value={values.password}
              required
              onChange={handleChange}
            />

            {
              <div className="oc-password-rules">
                Password Rules:
                <div style={{ color: hasUpper ? "inherit" : "red" }}>
                  • 1 Uppercase
                </div>
                <div style={{ color: hasLower ? "inherit" : "red" }}>
                  • 1 Lowercase
                </div>
                <div style={{ color: hasNumber ? "inherit" : "red" }}>
                  • 1 Number
                </div>
                <div style={{ color: validLength ? "inherit" : "red" }}>
                  • 7-25 Characters
                </div>
                <div style={{ color: !invalidChars ? "inherit" : "red" }}>
                  • Optional: Special characters except for &gt;, &lt;, %, @,
                  and $
                </div>
              </div>
            }

            <RoundedButton onClick={handleSubmit} text="Create Account" />
          </div>
        </form>
      ) : (
        <div className="oc-guest-account-container">
          <div>
            <Checked />
          </div>
          <div className="oc-guest-account-text">
            <p className="oc-guest-account-text"> Account Created</p>
            <p className="oc-guest-account-text-subtitle">
              Welcome to Shop.com!
            </p>
          </div>
        </div>
      )}
    </SectionCard>
  );
};
