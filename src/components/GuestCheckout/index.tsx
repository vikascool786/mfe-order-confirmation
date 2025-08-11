import React from "react";
import SectionCard from "../../layout/SectionCard";

interface IGuestCheckout {
  email: string;
}
export const GuestCheckout: React.FC<IGuestCheckout> = ({ email }) => {
  return (
    <SectionCard title="Finish Creating your Account">
      <label>{email}</label>
      <div>
        <span>Create Password*</span>
        <input></input>
      </div>
    </SectionCard>
  );
};
