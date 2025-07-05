import React from "react";
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
        <div className="button-container">
          <div className="button-text">Take Quiz</div>
        </div>
      </div>
      <div className="image-container">
        <img
          className="image"
          src="https://thumbs.dreamstime.com/z/fitness-nature-couple-walking-mountain-training-race-marathon-competition-sports-exercise-african-athletes-runners-277883113.jpg"
          alt="Health Quiz"
        />
      </div>
    </div>
  );
};

export default HealthQuiz;
