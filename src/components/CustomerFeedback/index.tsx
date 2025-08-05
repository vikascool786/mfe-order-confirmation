import React, { useState, useMemo, useRef, useEffect } from "react";
import "./styles.scss";
import { GET_API_ENDPOINT_BASE_URL, GET_API_MODE } from "../../utils/urlResolver";
import { Spinner } from "../../layout/Spinner";
import { postFeedback } from "../../config/api";

export type IFeedback = {
  sessionId: string;
  siteId: string;
  pcId: string;
};



const FeedbackForm: React.FC<IFeedback> = ({ pcId, sessionId, siteId }) => {
  const [isloading, setLoading] = useState(false);
  const [isFeebbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const feedbackFormRef = useRef<HTMLDivElement>(null);

  const apiMode = useMemo(() => GET_API_MODE(), []);
  const apiBaseUrl = useMemo(() => {
    return GET_API_ENDPOINT_BASE_URL(apiMode);
  }, []);

  useEffect(() => {
    if (feedbackFormRef.current) {
      feedbackFormRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, []);

  if (isloading) return <Spinner />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) {
      const errorString = 'Please enter comment';
      setError(errorString);
    } else {
      setLoading(true);
      try {
        await postFeedback(
          apiBaseUrl,
          feedback,
          pcId == "" ? null : pcId,
          sessionId,
          siteId
        );
      } catch (err) {
        setLoading(false);
        setFeedbackSubmitted(true);
      } finally {
        setLoading(false);
        setFeedbackSubmitted(true);
      }
    }
  };

  return (
    <div className="feedback-form" ref={feedbackFormRef}>
      {!isFeebbackSubmitted ? (
        <>
          <p className="feedback-form__text">
            We constantly strive to improve the customer experience and greatly appreciate your feedback.
          </p>
          <p className="feedback-form__email-prompt">
            Please provide your email if you would like to be contacted.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="feedback-form__input-group">
              <label className="feedback_label">Feedback</label>
              <textarea
                id="feedback"
                className={"feedback-form__textarea"}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Enter feedback here."
              />
              {error && <p className="feedback-form__error">{error}</p>}
            </div>
            <button className="feedback-form__submit-button" type="submit">
              Submit Feedback
            </button>
          </form>
        </>
      ) : (
        <>
          <p className="feedback-form__thanks">
            Thanks for Feedback
          </p>
        </>
      )}
    </div>
  );
};

export default FeedbackForm;
