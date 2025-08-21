import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  link: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, link }) => {
  if (!isOpen) return null;

  const [text, setText] = useState("Copy Link");

  const handleCopyLink = () => {
    navigator.clipboard.writeText(link);
    setText("Link Copied!");
    setTimeout(() => setText("Copy Link"), 2000);
  };

  return ReactDOM.createPortal(
    <div className="oc-share-modal">
      <div className="oc-share-modal__content">
        <button className="oc-share-modal__close" onClick={onClose}>
          ×
        </button>
        <div className="oc-share-modal__title">Share</div>
        <div className="oc-share-modal__link-box">{link}</div>
        <p className="oc-share-modal__text">
          Copy this link and paste the link in your story or in your profile
          bio.
        </p>
        <button className="oc-share-modal__button" onClick={handleCopyLink}>
          {text}
        </button>
      </div>
    </div>,
    document.body
  );
};

export default ShareModal;
