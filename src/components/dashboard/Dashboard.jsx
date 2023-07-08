import {FaArrowDown, FaArrowUp, FaCartPlus, FaEye, FaShoppingBag, FaUsers} from "react-icons/fa";

export default function Dashboard() {
    return (
        <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                    <div
                        className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div
                            className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                            <FaEye className="text-primary"/>
                        </div>

                        <div className="mt-4 flex items-end justify-between">
                            <div>
                                <h4 className="text-title-md font-bold text-black dark:text-white">
                                    $3.456K
                                </h4>
                                <span className="text-sm font-medium">Total views</span>
                            </div>

                            <span className="flex items-center gap-1 text-sm font-medium text-meta-3">
                                      0.43%
                                      <FaArrowUp />
                                    </span>
                        </div>
                    </div>

                    <div
                        className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div
                            className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                            <FaCartPlus className="text-primary" />
                        </div>

                        <div className="mt-4 flex items-end justify-between">
                            <div>
                                <h4 className="text-title-md font-bold text-black dark:text-white">
                                    $45,2K
                                </h4>
                                <span className="text-sm font-medium">Total Profit</span>
                            </div>

                            <span className="flex items-center gap-1 text-sm font-medium text-meta-3">
                                      4.35%
                                      <FaArrowUp />
                                    </span>
                        </div>
                    </div>

                    <div
                        className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div
                            className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                            <FaShoppingBag className="text-primary" />
                        </div>

                        <div className="mt-4 flex items-end justify-between">
                            <div>
                                <h4 className="text-title-md font-bold text-black dark:text-white">
                                    2.450
                                </h4>
                                <span className="text-sm font-medium">Total Product</span>
                            </div>

                            <span className="flex items-center gap-1 text-sm font-medium text-meta-3">
                                      2.59%
                                      <FaArrowUp />
                                    </span>
                        </div>
                    </div>

                    <div
                        className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div
                            className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                            <FaUsers className="text-primary" />
                        </div>

                        <div className="mt-4 flex items-end justify-between">
                            <div>
                                <h4 className="text-title-md font-bold text-black dark:text-white">
                                    3.456
                                </h4>
                                <span className="text-sm font-medium">Total Users</span>
                            </div>

                            <span className="flex items-center gap-1 text-sm font-medium text-meta-5">
                                      0.95%
                                      <FaArrowDown />
                                    </span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}