import React from "react";
import "./styles.css";

interface NotificationProps {
  icon: "Person" | "ChangeCircle";
  title?: string;
  email?: string;
  link?: string;
  message?: string;
  contentStrings?: any;
}

const Notification: React.FC<NotificationProps> = ({
  icon,
  title,
  link,
  email,
  message,
  contentStrings,
}) => {
  const IconComponent = React.lazy(() =>
    import(`../../assets/svgs/${icon}`).then((module) => ({
      default: module.ReactComponent || module.default,
    }))
  );

  return (
    <div className="oc-notification-container">
      <div className="oc-notification-border">
        <React.Suspense fallback={<span />}>
          <IconComponent />
        </React.Suspense>
      </div>
      <div
        className="oc-notification-content"
        onClick={() => {
          if (email) {
            window.location.href = `mailto:${email}`;
          }

          if (link) {
            window.open(link, "_blank");
          }
        }}
      >
        <span>{title || contentStrings?.response?.subscribeAndSave}</span>
        <span className="oc-notification-content-underline">{message || contentStrings?.response?.explore}</span>
      </div>
    </div>
  );
};

export default Notification;
