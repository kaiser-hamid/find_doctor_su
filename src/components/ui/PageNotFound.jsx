import {
  Fa4,
  FaFaceFrown,
  FaFaceGrimace,
  FaFaceRollingEyes,
  FaRegFaceFrown,
  FaRegFaceSadCry,
} from "react-icons/fa6";

const PageNotFound = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div>
        <div className="flex items-center">
          <div className="flex px-4">
            <Fa4 className="text-6xl text-meta-1" />
            <FaRegFaceFrown className="text-6xl text-meta-1" />
            <Fa4 className="text-6xl text-meta-1" />
          </div>
          <h4 className="text-bodydark1 text-3xl border-l-2 border-l-bodydark1 px-5 py-1 font-semibold drop-shadow-1">
            Page not found
          </h4>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
