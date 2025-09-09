import React, { useState, useMemo, useRef, useEffect } from "react";
import "./styles.scss";
import {
  GET_API_ENDPOINT_BASE_URL,
  GET_API_MODE,
} from "../../utils/urlResolver";
import { Spinner } from "../../layout/Spinner";
import { postFeedback } from "../../config/api";

export type IFeedback = {
  sessionId: string;
  siteId: string;
  pcId: string;
  contentStrings?: any;
  setFromDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
};

const FeedbackForm: React.FC<IFeedback> = ({
  pcId,
  sessionId,
  siteId,
  contentStrings,
  setFromDisplayed,
}) => {
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

  //reset form after submission after 3 seconds
  useEffect(() => {
    if (isFeebbackSubmitted) {
      const timer = setTimeout(() => {
        setFeedback("");
        setFeedbackSubmitted(false);
        setFromDisplayed(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isFeebbackSubmitted]);

  if (isloading) return <Spinner />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) {
      const errorString = contentStrings?.response?.pleaseEnterComment;
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
    <div className="qa-feedback-form oc-feedback-form" ref={feedbackFormRef}>
      {!isFeebbackSubmitted ? (
        <>
          <p className="oc-feedback-form__text">
            {contentStrings?.response?.weConstantlyStriveAndGreatly}
          </p>
          <p className="oc-feedback-form__email-prompt">
            {contentStrings?.response?.provideEmailForContact}
          </p>
          <form onSubmit={handleSubmit}>
            <div className="oc-feedback-form__input-group">
              <label className="qa-label feedback_label">
                {contentStrings?.response?.feedback}
              </label>
              <textarea
                id="feedback"
                className={"qa-textarea oc-feedback-form__textarea"}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder={
                  contentStrings?.response?.["enterFeedbackHere-placeholder"]
                }
              />
              {error && (
                <p className="qa-error oc-feedback-form__error">{error}</p>
              )}
            </div>
            <button
              className="qa-button oc-feedback-form__submit-button"
              type="submit"
            >
              {contentStrings?.response?.submitFeedback}
            </button>
          </form>
        </>
      ) : (
        <>
          <p className="oc-feedback-form__thanks">
            {contentStrings?.response?.giveFeedback}
          </p>
        </>
      )}
    </div>
  );
};

export default FeedbackForm;
