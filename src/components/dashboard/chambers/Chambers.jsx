import { Link } from "react-router-dom";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import HOC from "../../hoc/HOC.jsx";
import { chambers, doctors, removeChamber } from "../../../api/api.js";
import Swal from "sweetalert2";

export default function Chambers() {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const {
          data: { status, data },
        } = await chambers();
        if (status) {
          setPageData(data);
        }
      } catch (e) {
        console.log(e.message);
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Cannot laod data right now",
        });
      } finally {
        setPageLoaded(true);
      }
    };
    fetchPageData();
  }, []);

  const handleRemoveItem = async (e) => {
    const tempPageData = [...pageData];
    try {
      const { chamber_id } = e.currentTarget.dataset;
      const popupResult = await Swal.fire({
        icon: "warning",
        title: "Do you want to Delete this item?",
        showCancelButton: true,
        confirmButtonText: "Delete",
        confirmButtonColor: "#dc3545",
      });
      if (!popupResult.isConfirmed) {
        return null;
      }

      const restPageData = tempPageData.filter(
        (item) => item._id !== chamber_id
      );
      setPageData(restPageData);
      const {
        data: { status },
      } = await removeChamber(chamber_id);
      if (!status) {
        setPageData(tempPageData);
      } else {
        Swal.fire("Item deleted!", "", "success");
      }
    } catch (e) {
      console.log(e.message);
      setPageData(tempPageData);
      Swal.fire({
        icon: "error",
        title: "Ops! Cannot remove the item!",
        showConfirmButton: false,
      });
    }
  };

  return (
    <HOC isLoaded={pageLoaded} hasData={!!pageData}>
      <main>
        <div className="max-w-screen-2xl mx-auto p-4 md:p-6 2xl:p-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <h2 className="font-semibold text-title-md2 text-black dark:text-white">
              Center List
            </h2>

            <div>
              <Link
                to="add"
                className="inline-flex items-center justify-center rounded-md bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              >
                <FaPlus /> Add a Center
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
                        Center
                      </th>
                      <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                        Contact Details
                      </th>
                      <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                        Operating Time
                      </th>
                      <th className="py-4 px-4 font-medium text-black text-center dark:text-white">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageData?.map((chamber) => (
                      <tr key={chamber._id}>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-xl text-black dark:text-white font-semibold">
                            {chamber.name} <br />
                            <p className="text-sm text-bodydark2">
                              Email:{" "}
                              <span className="text-black font-normal">
                                {chamber.email}
                              </span>
                            </p>
                            <p className="text-sm text-bodydark2">
                              Phone:{" "}
                              <span className="text-black font-normal">
                                {chamber.phone}
                              </span>
                            </p>
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            <span className="text-bodydark2 font-semibold">
                              Address:
                            </span>{" "}
                            {chamber.address}
                            <br />
                            <span className="text-bodydark2 font-semibold">
                              Website:
                            </span>{" "}
                            <a
                              href={chamber.website}
                              className="text-primary"
                              target="_blank"
                            >
                              {" "}
                              {chamber.website}
                            </a>
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <ul className="flex flex-wrap gap-2 text-xs font-semibold">
                            {chamber.week_days?.map((item) => (
                              <li className="capitalize bg-meta-3 text-white rounded-xl px-2 py-[2px]">
                                {item}
                              </li>
                            ))}
                          </ul>
                          <p className="text-black dark:text-white font-semibold">
                            {chamber.operating_hours}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <div className="flex items-center justify-center space-x-3.5">
                            <Link
                              to={`${chamber._id}/edit`}
                              className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2 text-center font-medium text-white hover:bg-opacity-90"
                            >
                              <FaEdit className="inline" /> Edit
                            </Link>
                            <button
                              type="button"
                              data-chamber_id={chamber._id}
                              onClick={handleRemoveItem}
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
