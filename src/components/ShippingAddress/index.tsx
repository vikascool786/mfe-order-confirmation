import React from "react";
import "./styles.css";

interface AddressProps {
  name: string;
  address: string;
  cityStateZip: string;
  phone: string;
  contentStrings?: any;
}

const ShippingAddress: React.FC<AddressProps> = ({
  name,
  address,
  cityStateZip,
  phone,
  contentStrings,
}) => {
  return (
    <div className="oc-shipping-address-container">
      <span>{contentStrings?.response?.shippingAddress || "Shipping Address"}</span>
      <div className="oc-shipping-address-text">
        <span>{name}</span>
        <span>{address}</span>
        <span>{cityStateZip}</span>
      </div>
      <span className="oc-shipping-address-text">{phone}</span>
    </div>
  );
};

export default ShippingAddress;
