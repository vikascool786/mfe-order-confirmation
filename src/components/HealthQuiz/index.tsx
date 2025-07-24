import React from "react";
import HealthQuizImage from "../../assets/images/HealthQuiz.png";
import "./styles.css";

interface HealthQuizProps {}

const HealthQuiz: React.FC<HealthQuizProps> = ({}) => {
  return (
    <div className="health-quiz-container">
      <div className="health-container">
        <div className="heading">
          CHANGE your health
          <div className="subheading">in 60 seconds</div>
        </div>
        <div
        className="button-text"
          onClick={() =>
            (window.location.href =
              "https://www.shop.com/assessment/health?hsh=4")
          }
        >
          Take Quiz
        </div>
      </div>
      <div className="health-image-container">
        <img className="img" src={HealthQuizImage} alt="Health Quiz" />
      </div>
    </div>
  );
};

export default HealthQuiz;
