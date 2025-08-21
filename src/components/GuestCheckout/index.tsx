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
  contentStrings?: any;
}

const PASSWORD_RULES = [
  { text: "• 1 Uppercase", regex: /[A-Z]/ },
  { text: "• 1 Lowercase", regex: /[a-z]/ },
  { text: "• 1 Number", regex: /\d/ },
  { text: "• 7-25 Characters", regex: /^.{7,25}$/ },
  {
    text: "• Optional: Special characters except for >, <, %, @, and $",
    regex: /^[A-Za-z\d@%<>$]*$/,
    exclude: /[><%@\$]/,
  },
];
export const GuestCheckout: React.FC<IGuestCheckout> = ({
  email,
  customerDetails,
  orderDetails,
  sessionId,
  setCustomerDetails,
  contentStrings,
}) => {
  const [isAccountCreated, setIsAccountCreated] = useState(true);
  const [hasSubmitted, setHasSubmitted] = useState(false);

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
      const errors: { password?: string } = {};
      const PASSWORD_REGEX =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@%<>$]{7,25}$/;

      if (!values.password) {
        errors.password = "Password is required";
      } else if (!PASSWORD_REGEX.test(values.password)) {
        errors.password =
          "Password must be 7-25 characters, include uppercase, lowercase, a number, and only allowed special characters: >, <, %, @, $";
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

  const onSubmitClick = () => {
    setHasSubmitted(true);
    submitForm();
  };

  const isRuleValid = (rule: { regex: RegExp; exclude?: RegExp }) => {
    if (rule.exclude) {
      return (
        rule.regex.test(values.password) && !rule.exclude.test(values.password)
      );
    }
    return rule.regex.test(values.password);
  };

  return (
    <SectionCard title={contentStrings?.response?.finishAccount}>
      {isAccountCreated ? (
        <form onSubmit={handleSubmit}>
          <div className="oc-updates-text-updates-content">
            <label className="oc-updates-email-label">{email}</label>
            <label className="oc-updates-mobile-label" htmlFor="password">
              {contentStrings?.response?.createPassword}
              <span>*</span>
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

            <div className="oc-password-rules">
              Password Rules:
              {PASSWORD_RULES.map((rule, index) => (
                <div
                  key={index}
                  className={`oc-password-rule ${hasSubmitted && !isRuleValid(rule)
                      ? "oc-password-rule--invalid"
                      : ""
                    }`}
                >
                  {rule.text}
                </div>
              ))}
            </div>

            <RoundedButton
              onClick={onSubmitClick}
              text={contentStrings?.response?.createAccount}
            />
          </div>
        </form>
      ) : (
        <div className="oc-guest-account-container">
          <div>
            <Checked />
          </div>
          <div className="oc-guest-account-created">
            <p className="oc-guest-account-p-title">
              {" "}
              {contentStrings?.response?.accountCreated ? contentStrings?.response?.accountCreated : 'Account Created'}
            </p>
            <p className="oc-guest-account-p-subtitle">
              {contentStrings?.response?.welcomeMessage ? contentStrings?.response?.welcomeMessage : 'Welcome to Shop.com!'}
            </p>
          </div>
        </div>
      )}
    </SectionCard>
  );
};
