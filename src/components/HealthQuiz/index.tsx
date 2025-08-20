import React from "react";
import HealthQuizImage from "../../assets/images/HealthQuiz.png";
import "./styles.css";

interface HealthQuizProps {
  contentStrings?: any;
}

const HealthQuiz: React.FC<HealthQuizProps> = ({ contentStrings }) => {
  return (
    <div className="oc-health-quiz-container">
      <div className="oc-health-container">
        <div className="oc-health-heading">
          {contentStrings?.response?.changeYourHealth}
          <div className="oc-health-subheading">{contentStrings?.response?.in60Seconds}</div>
        </div>
        <div
        className="oc-health-button-text"
          onClick={() =>
            (window.location.href =
              "https://www.shop.com/assessment/health?hsh=4")
          }
        >
          {contentStrings?.response?.takeQuiz}
        </div>
      </div>
      <div className="oc-health-image-container">
        <img className="oc-health-img" src={HealthQuizImage} alt="Health Quiz" />
      </div>
    </div>
  );
};

export default HealthQuiz;
