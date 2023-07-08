import {Link} from "react-router-dom"
const MobileNav = () => {
    return (
        <div className="bg-white px-4 pb-2 lg:hidden">
            <div className="pb-1 pt-2">
                <h3 className="py-2 text-lg font-medium text-bodydark2">Stock Management</h3>
                <ul>
                    <li>
                        <Link
                            className="group relative flex items-center gap-2.5 rounded-sm py-1 px-4 font-medium text-black dark:text-textdark2 transition-colors"
                            to="/login"
                        >
                            <span>Login</span>
                        </Link>
                    </li>
                    <li>
                        <a
                            className="group relative flex items-center gap-2.5 rounded-sm py-1 px-4 font-medium text-black dark:text-textdark2 transition-colors"
                            href="#"
                        >
                            <span>Products</span>
                        </a>
                    </li>
                    <li>
                        <a
                            className="group relative flex items-center gap-2.5 rounded-sm py-1 px-4 font-medium text-black dark:text-textdark2 transition-colors"
                            href="#"
                        >
                            <span>Products</span>
                        </a>
                    </li>
                    <li>
                        <a
                            className="group relative flex items-center gap-2.5 rounded-sm py-1 px-4 font-medium text-black dark:text-textdark2 transition-colors"
                            href="#"
                        >
                            <span>Products</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="pb-1 pt-2">
                <h3 className="py-2 text-lg font-medium text-bodydark2">Stock Management</h3>
                <ul>
                    <li>
                        <a
                            className="group relative flex items-center gap-2.5 rounded-sm py-1 px-4 font-medium text-black dark:text-textdark2 transition-colors"
                            href="#"
                        >
                            <span>Products</span>
                        </a>
                    </li>
                    <li>
                        <a
                            className="group relative flex items-center gap-2.5 rounded-sm py-1 px-4 font-medium text-black dark:text-textdark2 transition-colors"
                            href="#"
                        >
                            <span>Products</span>
                        </a>
                    </li>
                    <li>
                        <a
                            className="group relative flex items-center gap-2.5 rounded-sm py-1 px-4 font-medium text-black dark:text-textdark2 transition-colors"
                            href="#"
                        >
                            <span>Products</span>
                        </a>
                    </li>
                    <li>
                        <a
                            className="group relative flex items-center gap-2.5 rounded-sm py-1 px-4 font-medium text-black dark:text-textdark2 transition-colors"
                            href="#"
                        >
                            <span>Products</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="pb-1 pt-2">
                <h3 className="py-2 text-lg font-medium text-bodydark2">Stock Management</h3>
                <ul>
                    <li>
                        <a
                            className="group relative flex items-center gap-2.5 rounded-sm py-1 px-4 font-medium text-black dark:text-textdark2 transition-colors"
                            href="#"
                        >
                            <span>Products</span>
                        </a>
                    </li>
                    <li>
                        <a
                            className="group relative flex items-center gap-2.5 rounded-sm py-1 px-4 font-medium text-black dark:text-textdark2 transition-colors"
                            href="#"
                        >
                            <span>Products</span>
                        </a>
                    </li>
                    <li>
                        <a
                            className="group relative flex items-center gap-2.5 rounded-sm py-1 px-4 font-medium text-black dark:text-textdark2 transition-colors"
                            href="#"
                        >
                            <span>Products</span>
                        </a>
                    </li>
                    <li>
                        <a
                            className="group relative flex items-center gap-2.5 rounded-sm py-1 px-4 font-medium text-black dark:text-textdark2 transition-colors"
                            href="#"
                        >
                            <span>Products</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default MobileNav;