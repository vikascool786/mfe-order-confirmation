import React from "react";
import "./styles.css";

interface NotificationProps {
  icon: "Person" | "ChangeCircle";
  title: string;
  email?: string;
  link?: string;
  message: string;
}

const Notification: React.FC<NotificationProps> = ({
  icon,
  title,
  link,
  email,
  message,
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
        <span>{title}</span>
        <span className="oc-notification-content-underline">{message}</span>
      </div>
    </div>
  );
};

export default Notification;
