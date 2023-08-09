import Table from "../../layout/Table";
import { Link } from "react-router-dom";
import {
  FaEdit,
  FaHandPointRight,
  FaPlus,
  FaRegHandPointRight,
  FaTrashAlt,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import HOC from "../../hoc/HOC.jsx";
import {
  chambers,
  doctors,
  removeChamber,
  removeDoctor,
} from "../../../api/api.js";
import { openPopupAction } from "../../../store/uiSlice";
import { useDispatch } from "react-redux";

export default function Doctors() {
  const dispatch = useDispatch();
  const [pageLoaded, setPageLoaded] = useState(false);
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const {
          data: { status, data },
        } = await doctors();
        if (status) {
          setPageData(data);
        }
      } catch (e) {
        console.log(e.message);
        dispatch(
          openPopupAction({
            type: "danger",
            title: "Failed!",
            text: "Data can't be loaded right now",
          })
        );
      } finally {
        setPageLoaded(true);
      }
    };
    fetchPageData();
  }, []);

  const handleRemoveItem = async (id) => {
    const tempPageData = [...pageData];
    try {
      const restPageData = tempPageData.filter((item) => item._id !== id);
      setPageData(restPageData);
      const {
        data: { status },
      } = await removeDoctor(id);
      if (!status) {
        setPageData(tempPageData);
      }
    } catch (e) {
      console.log(e.message);
      setPageData(tempPageData);
      dispatch(
        openPopupAction({
          type: "danger",
          title: "Failed!",
          text: "Cannot remove the item right now",
        })
      );
    }
  };

  return (
    <HOC isLoaded={pageLoaded} hasData={!!pageData}>
      <main>
        <div className="max-w-screen-2xl mx-auto p-4 md:p-6 2xl:p-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <h2 className="font-semibold text-title-md2 text-black dark:text-white">
              Doctor List
            </h2>

            <div>
              <Link
                to="add"
                className="inline-flex items-center justify-center rounded-md bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              >
                <FaPlus /> Add a Doctor
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
              <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                      <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                        Avatar
                      </th>
                      <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                        Name
                      </th>
                      <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                        Speciality
                      </th>
                      <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                        Contact Info
                      </th>
                      <th className="py-4 px-4 font-medium text-black text-center dark:text-white">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageData?.map((doctor) => (
                      <tr key={doctor._id}>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <img
                            src={doctor.profile_picture}
                            alt="Profile picture"
                            className="h-18 rounded-md"
                          />
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white font-semibold">
                            {doctor.name}
                            <br />
                            <span className="text-bodydark2 text-xs">
                              BMDC: {doctor.bmdc_reg_no}
                            </span>
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <ul className="text-black dark:text-white font-semibold">
                            {doctor.speciality?.map((sp) => (
                              <li className="flex items-center gap-1">
                                <FaRegHandPointRight /> {sp}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            Address: {doctor.address}
                            <br />
                            Email: {doctor.email}
                            <br />
                            Phone:{" "}
                            <a
                              href={`tel:${doctor.phone}`}
                              className="text-primary"
                            >
                              {doctor.phone}
                            </a>
                          </p>
                        </td>

                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <div className="flex items-center justify-center space-x-3.5">
                            <Link
                              to={`${doctor._id}/edit`}
                              className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2 text-center font-medium text-white hover:bg-opacity-90"
                            >
                              <FaEdit className="inline" /> Edit
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(doctor._id)}
                              className="inline-flex items-center justify-center rounded-md bg-meta-1 px-5 py-3 text-center font-medium text-white hover:bg-opacity-90"
                            >
                              <FaTrashAlt className="inline" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </HOC>
  );
}
