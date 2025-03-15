import React from "react";
import logo from "../assets/FinanceAdminLogo.png";

const Header = () => {
    return (
        <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-20" />
        </div>
    );
};

export default Header;