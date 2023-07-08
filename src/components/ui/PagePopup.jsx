import { useDispatch, useSelector } from "react-redux";
import Popup from "reactjs-popup";
import { closePopupAction, openPopupAction } from "../../store/uiSlice";
import {
  FaCheckCircle,
  FaExclamation,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";

const PagePopup = () => {
  const popup = useSelector((state) => state.ui.pagePopup);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closePopupAction());
  };

  return (
    <div>
      <Popup
        open={popup.status}
        closeOnDocumentClick
        onClose={handleCloseModal}
      >
        <div className="modal">
          <div
            className={`bg-teal-100 border-l-4 rounded-b text-teal-900 px-2 py-3 shadow-md rounded-md border-${popup.type}`}
            role="alert"
          >
            <div className="flex justify-between items-center ">
              <div className="py-1 px-4 flex-none">
                {popup.type === "success" && (
                  <FaCheckCircle className="text-3xl text-success" />
                )}
                {popup.type === "danger" && (
                  <FaInfoCircle className="text-3xl text-danger" />
                )}
                {popup.type === "warning" && (
                  <FaExclamation className="text-3xl text-meta-6" />
                )}
              </div>
              <div className="flex-auto">
                <p className="font-bold">{popup.title}</p>
                <p className="text-sm">{popup.text}</p>
              </div>
              <div className="text-right flex-none">
                <button className="close" onClick={handleCloseModal}>
                  <FaTimes className="inline text-lg" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default PagePopup;
