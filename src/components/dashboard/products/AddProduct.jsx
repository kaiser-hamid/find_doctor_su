import { FaSave, FaSpinner } from "react-icons/fa";
import SelectWithSearch from "../../ui/SelectWithSearch";
import { useEffect, useState } from "react";
import { productAddFormHelperData, productSave } from "../../../api/api.js";
import SubmitNotification from "../../ui/SubmitNotification.jsx";
import HOC from "../../hoc/HOC.jsx";
import { useNavigate } from "react-router-dom";
import { UNITOPTIONS } from "../../../helpers/form-helper.jsx";
import { openPopupAction } from "../../../store/uiSlice";

export function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initFormData = {
    company_id: "",
    title: "",
    unit: "",
    price: "",
    sku: "",
    code: "",
  };
  const [formData, setFormData] = useState(initFormData);
  const [actionButtonLoading, setActionButtonLoading] = useState(false);
  const [notification, setNotification] = useState({ msg: null, type: null }); //[danger,success]
  const [pageLoaded, setPageLoaded] = useState(false);

  //dropdowns
  const [companyOptions, setCompanyOptions] = useState([]);

  useEffect(() => {
    const fetchForHelperData = async () => {
      try {
        const {
          data: { status, data, msg },
        } = await productAddFormHelperData();
        if (status) {
          setCompanyOptions(data.companyOptions);
        } else {
          dispatch(
            openPopupAction({
              type: "danger",
              title: "Failed!",
              text: msg,
            })
          );
        }
      } catch (e) {
        console.log(e.message);
        dispatch(
          openPopupAction({
            type: "danger",
            title: "Failed!",
            text: "Cannot load data",
          })
        );
      } finally {
        setPageLoaded(true);
      }
    };
    fetchForHelperData();
  }, []);

  const handleInput = ({ target: { name, value } }) => {
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = async () => {
    setActionButtonLoading(true);
    try {
      const form_data = new FormData();
      for (const item in formData) {
        form_data.append(`${item}`, formData[item]);
      }
      const {
        data: { status, msg },
      } = await productSave(form_data);
      if (status) {
        setNotification({ msg, type: "success" });
        setTimeout(() => {
          navigate("/dashboard/products");
        }, 3000);
      } else {
        setNotification({ msg, type: "danger" });
      }
    } catch (e) {
      console.log(e.message);
      alertMe({ icon: "error", title: "Failed!", text: e.message });
    } finally {
      setActionButtonLoading(false);
    }
  };

  return (
    <HOC isLoaded={pageLoaded} hasData={!!companyOptions}>
      <main>
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-title-md2 font-bold text-black dark:text-white">
              Add Product
            </h2>
          </div>
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-semibold text-black dark:text-white">
                  Product Form
                </h3>
              </div>
              <form action="#">
                <div className="p-6.5">
                  <div className="grid md:grid-cols-2 grid-cols-1  gap-x-8 gap-y-2">
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Name
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInput}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Company
                      </label>
                      <SelectWithSearch
                        name="company_id"
                        value={formData.company_id}
                        onChange={handleInput}
                        options={companyOptions}
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Product Code
                      </label>
                      <input
                        type="text"
                        name="code"
                        value={formData.code}
                        onChange={handleInput}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        SKU
                      </label>
                      <input
                        type="text"
                        name="sku"
                        value={formData.sku}
                        onChange={handleInput}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Unit
                      </label>
                      <SelectWithSearch
                        name="unit"
                        value={formData.unit}
                        onChange={handleInput}
                        options={UNITOPTIONS}
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Price <span className="text-meta-6">(per unit)</span>
                      </label>
                      <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleInput}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="">
                    <SubmitNotification notification={notification} />
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={actionButtonLoading}
                      className="inline-flex items-center justify-center rounded-md bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 my-2"
                    >
                      {actionButtonLoading ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaSave />
                      )}
                      <span className="px-2">Save</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </HOC>
  );
}
