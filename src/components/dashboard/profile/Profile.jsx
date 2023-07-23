import Table from "../../layout/Table";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Profile() {
  const { role, user } = useSelector((state) => state.auth);
  return (
    <main>
      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-title-md2 font-bold text-black dark:text-white">
            Admin Profile
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark text-black py-8">
                <div className="flex items-center justify-center">
                  <FaUserCircle className="text-6xl text-bodydark2" />
                </div>
                <h4 className="text-center pt-2 text-2xl font-semibold">
                  {user.first_name} {user.last_name}
                </h4>
              </div>
              <form action="#">
                <div className="p-6.5">
                  <div className="mb-4.5">
                    <div className="flex gap-4 mb-2.5 block text-black dark:text-white">
                      <p>Email: </p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                    <div className="flex gap-4 mb-2.5 block text-black dark:text-white">
                      <p>Gender: </p>
                      <p className="font-medium">{user.gender}</p>
                    </div>
                    <div className="flex gap-4 mb-2.5 block text-black dark:text-white">
                      <p>Role: </p>
                      <p className="font-medium">{role}</p>
                    </div>
                  </div>
                  <Link
                    to="/dashboard/profile/edit"
                    className="inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 my-8 w-full"
                  >
                    <span className="px-2">Change Password</span>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
