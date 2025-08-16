import React from "react";
import HealthQuizImage from "../../assets/images/HealthQuiz.png";
import "./styles.css";

interface HealthQuizProps {}

const HealthQuiz: React.FC<HealthQuizProps> = ({}) => {
  return (
    <div className="oc-health-quiz-container">
      <div className="oc-health-container">
        <div className="oc-health-heading">
          CHANGE your health
          <div className="oc-health-subheading">in 60 seconds</div>
        </div>
        <div
        className="oc-health-button-text"
          onClick={() =>
            (window.location.href =
              "https://www.shop.com/assessment/health?hsh=4")
          }
        >
          Take Quiz
        </div>
      </div>
      <div className="oc-health-image-container">
        <img className="oc-health-img" src={HealthQuizImage} alt="Health Quiz" />
      </div>
    </div>
  );
};

export default HealthQuiz;
