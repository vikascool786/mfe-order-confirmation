import React from "react";

interface ThankYouMessageProps {
  name: string;
  email: string;
  contentStrings?: any;
}

const ThankYouMessage: React.FC<ThankYouMessageProps> = ({ name, email, contentStrings }) => {
  return (
    <section>
      <p>
        {name}, {contentStrings?.response?.["orders-thankYouForShoppingWithUs"] || "thank you for shopping with us"}
        <br />
        {contentStrings?.response?.confirmationEmailSentTo || "We sent a confirmation email to"} {email}
      </p>
    </section>
  );
};

export default ThankYouMessage;
