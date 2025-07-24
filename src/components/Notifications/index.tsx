import React from "react";
import "./styles.css";

interface NotificationProps {
  icon: "Person" | "ChangeCircle";
  title: string;
  email?: string;
  message: string;
}

const Notification: React.FC<NotificationProps> = ({
  icon,
  title,
  email,
  message,
}) => {
  const IconComponent = React.lazy(() =>
    import(`../../assets/svgs/${icon}`).then((module) => ({
      default: module.ReactComponent || module.default,
    }))
  );

  return (
    <div className="notification-container">
      <div className="notification-border">
        <React.Suspense fallback={<span />}>
          <IconComponent />
        </React.Suspense>
      </div>
      <div
        className="notification-content"
        onClick={() => {
          if (email) {
            window.location.href = `mailto:${email}`;
          }
        }}
      >
        <span>{title}</span>
        <span className="notification-content-underline">{message}</span>
      </div>
    </div>
  );
};

export default Notification;
