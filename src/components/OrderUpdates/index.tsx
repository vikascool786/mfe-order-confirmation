import React from "react";
import { useFormik } from "formik";
import "./styles.css";
import { postOrderSMSPhone } from "../../config/api";
import { Attribute } from "../../types";

export const OrderUpdates = (appConfig: {
  orderId: Attribute[][];
  shopperId: string;
  siteId: number;
  pcid: string;
  sessionId: string;
  languagecode: string;
  sitetype: string;
  countrycode: string;
  portalid: string;
  contentStrings?: any;
}) => {
  const formik = useFormik({
    initialValues: {
      boxChecked: false,
      phone: "",
    },
    validate: (values) => {
      const errors: { phone?: string } = {};
      const phoneRegex = /^(\d{10}|\d{3}-\d{3}-\d{4}|\d{3}-\d{3}-\d{5})$/;
      if (!values.phone) {
        errors.phone = "Phone is required";
      } else if (!phoneRegex.test(values.phone)) {
        errors.phone = "Invalid phone format";
      }
      return errors;
    },
    onSubmit: () => {

      const typeId = appConfig.orderId.find(attr => attr.find(att => att.typeId == 16));
      const payload = {
        site_type: appConfig.sitetype,
        siteCountry: appConfig.countrycode,
        langCode: appConfig.languagecode,
        temp_order_id: typeId?.find(t => t.value)?.value ?? "",
        sms_phone: formik.values.phone.replace(/-/g, ""),
      };
      postOrderSMSPhone(payload).then(() => {
        setIsSubmitted(true);
      });
    },
  });

  const [isSubmitted, setIsSubmitted] = React.useState(false);

  React.useEffect(() => {
    const phoneRegex = /^(\d{10}|\d{3}-\d{3}-\d{4}|\d{3}-\d{3}-\d{5})$/;
    if (
      phoneRegex.test(formik.values.phone) &&
      formik.values.boxChecked &&
      !formik.errors.phone &&
      !isSubmitted
    ) {
      const typeId = appConfig.orderId.find(attr => attr.find(att => att.typeId == 16));
      const payload = {
        site_type: appConfig.sitetype,
        siteCountry: appConfig.countrycode,
        langCode: appConfig.languagecode,
        temp_order_id: typeId?.find(t => t.typeId == 16)?.value ?? "",
        sms_phone: formik.values.phone.replace(/-/g, ""),
      };
      postOrderSMSPhone(payload).then(() => {
        setIsSubmitted(true);
      });
    }
  }, [formik.values.phone, formik.values.boxChecked, formik.errors.phone, isSubmitted]);

  const { values, touched, errors, handleChange, handleBlur, setFieldValue } =
    formik;

  const showOrderUpdates = values.boxChecked;

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue("boxChecked", e.target.checked);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let raw = e.target.value.replace(/\D/g, ""); // Remove non-digits

      if (raw.length > 11) raw = raw.slice(0, 11);

      let formatted = raw;
      if (raw.length > 6) {
        formatted = `${raw.slice(0, 3)}-${raw.slice(3, 6)}-${raw.slice(6)}`;
      } else if (raw.length > 3) {
        formatted = `${raw.slice(0, 3)}-${raw.slice(3)}`;
      }

      setFieldValue("phone", formatted);
  };

  if (isSubmitted) {
    return (
      <div className="oc-updates-confirmation-message">
        {appConfig.contentStrings?.response?.willReceiveUpdatesAt?.replace("{{0}}", values.phone) || `You will receive updates at ${values.phone}`}
      </div>
    );
  }

  return (
    <form className="oc-updates-order-updates-container" onSubmit={formik.handleSubmit}>
      <div className="oc-updates-text-updates-header">
        <input
          type="checkbox"
          name="boxChecked"
          className="oc-updates-checkbox"
          checked={values.boxChecked}
          onChange={handleCheckboxChange}
        />
        <div className="oc-updates-text-updates-instructions">
          <span className="oc-updates-m-heading">
            {appConfig.contentStrings?.response?.wantToReceiveTextMessage || "Want to receive text messages on this order?"}
          </span>
          <span className="oc-updates-s-heading">{appConfig.contentStrings?.response?.dataRatesApply || "Message and data rates may apply."}</span>
        </div>
      </div>

      {showOrderUpdates && (
        <div className="oc-updates-text-updates-content">
          <label className="oc-updates-mobile-label" htmlFor="phone">
            {appConfig.contentStrings?.response?.mobilePhone || "Mobile Phone"}<span>*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            maxLength={14}
            className="oc-updates-mobile-input"
            value={values.phone}
            required
            onChange={handlePhoneChange}
          />
          {touched.phone && typeof errors.phone === "string" && (
            <div className="oc-updates-error">{errors.phone}</div>
          )}
          <div className="oc-updates-extra-label">{appConfig.contentStrings?.response?.tenDigits || "10 digits"}</div>
        </div>
      )}
    </form>
  );
};
