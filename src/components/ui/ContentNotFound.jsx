import { FaInfoCircle } from "react-icons/fa";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

const ContentNotFound = () => {
  return (
    <div
      className="flex items-center justify-center"
      style={{ height: "calc(100vh - 15vh)" }}
    >
      <div>
        <div className="">
          <h4 className="text-lg lg:text-2xl font-semibold text-bodydark">
            <HiOutlineExclamationTriangle className="inline text-2xl lg:text-4xl" />{" "}
            No data found..
          </h4>
        </div>
      </div>
    </div>
  );
};

export default ContentNotFound;
