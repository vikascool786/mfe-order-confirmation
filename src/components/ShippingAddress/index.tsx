import React from 'react';
import './styles.css';

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
    <div className='address-container'>
      <span>Shipping Address</span>
      <div className='address-text'>
      <span>{name}</span>
      <span>{address}</span>
      <span>{cityStateZip}</span>
      <span>{phone}</span>
      </div>
    </div>
  );
};

export default ShippingAddress;