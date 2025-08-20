import React from "react";
import "./styles.scss";
import FeedbackForm from "./index";

export type IFeedback = {
  sessionId: string;
  siteId: string;
  pcId: string;
  contentStrings?: any;
};

const Feedback: React.FC<IFeedback> = ({ pcId, sessionId, siteId, contentStrings }) => {
  const [isFormDisplayed, setFromDisplayed] = React.useState<boolean>(false);
  return (
    <>
      <div className="oc-feedback-container">
        <h2>{contentStrings?.response?.wantToProvideFeedback}</h2>
        <p>{contentStrings?.response?.constantlyLookingToImprove}</p>
        <button
          className="feedback-button"
          onClick={() => setFromDisplayed(true)}
        >
          {contentStrings?.response?.giveFeedback}
        </button>
      </div>
      {isFormDisplayed && (
        <FeedbackForm pcId={pcId} siteId={siteId} sessionId={sessionId} />
      )}
    </>
  );
};

export default Feedback;
