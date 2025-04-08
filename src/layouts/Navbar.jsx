import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="rounded-full py-3 px-8 shadow-md bg-gray-100">
            <ul className="flex space-x-8 text-[#17211f] font-medium">
                <li>
                    <Link to="/goals" className="hover:text-gray-600">Goals</Link>
                </li>
                <li>
                    <Link to="/budget" className="hover:text-gray-600">Budget</Link>
                </li>
                <li>
                    <Link to="/train" className="hover:text-gray-600">Train</Link>
                </li>
                <li>
                    <Link to="/forum" className="hover:text-gray-600">Forum</Link>
                </li>
                <li>
                    <Link to="/setup-mfa" className="hover:text-gray-600">Verification</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;