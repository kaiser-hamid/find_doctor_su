import {FaTrash} from "react-icons/fa";

export default function Table() {
    return (
        <div
            className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
        >
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                        <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                            Package
                        </th>
                        <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                            Invoice date
                        </th>
                        <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                            Status
                        </th>
                        <th className="py-4 px-4 font-medium text-black dark:text-white">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                            <h5 className="font-medium text-black dark:text-white">Free Package</h5>
                            <p className="text-sm">$0.00</p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <p className="text-black dark:text-white">Jan 13,2023</p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                                Paid
                            </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <div className="flex items-center space-x-3.5">
                                <FaTrash />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                            <h5 className="font-medium text-black dark:text-white">
                                Standard Package
                            </h5>
                            <p className="text-sm">$59.00</p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <p className="text-black dark:text-white">Jan 13,2023</p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                                Paid
                            </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <div className="flex items-center space-x-3.5">
                                <FaTrash />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                            <h5 className="font-medium text-black dark:text-white">
                                Business Package
                            </h5>
                            <p className="text-sm">$99.00</p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <p className="text-black dark:text-white">Jan 13,2023</p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <p className="inline-flex rounded-full bg-danger bg-opacity-10 py-1 px-3 text-sm font-medium text-danger">
                                Unpaid
                            </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <div className="flex items-center space-x-3.5">
                                <FaTrash />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="py-5 px-4 pl-9 xl:pl-11">
                            <h5 className="font-medium text-black dark:text-white">
                                Standard Package
                            </h5>
                            <p className="text-sm">$59.00</p>
                        </td>
                        <td className="py-5 px-4">
                            <p className="text-black dark:text-white">Jan 13,2023</p>
                        </td>
                        <td className="py-5 px-4">
                            <p className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
                                Pending
                            </p>
                        </td>
                        <td className="py-5 px-4">
                            <div className="flex items-center space-x-3.5">
                                <button className="hover:text-primary">
                                    <FaTrash />
                                </button>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}