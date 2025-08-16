import React from "react";
import { AddressContainer, AddressText } from "./styles";

interface AddressProps {
  name: string;
  address: string;
  cityStateZip: string;
  phone: string;
}

const ShippingAddress: React.FC<AddressProps> = ({
  name,
  address,
  cityStateZip,
  phone,
}) => {
  return (
    <AddressContainer>
      <span>Shipping Address</span>
      <AddressText>
        <span>{name}</span>
        <span>{address}</span>
        <span>{cityStateZip}</span>
        <span>{phone}</span>
      </AddressText>
    </AddressContainer>
  );
};

export default ShippingAddress;
