import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

export default function SubmitNotification({ notification }) {
  if (!notification.msg) {
    return null;
  }
  return (
    <div className="px-2 py-4">
      <p className={`text-${notification.type}`}>
        {notification.type === "danger" ? (
          <FaExclamationTriangle className="inline" />
        ) : (
          <FaCheckCircle className="inline" />
        )}{" "}
        {notification.msg}
      </p>
    </div>
  );
}
