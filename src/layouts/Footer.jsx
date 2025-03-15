import React from "react";

const Footer = () => {
    return (
        <footer className="bg-[#17211f] text-[#f5f5f8] py-3 text-center text-sm">
            © {new Date().getFullYear()} FinanceAdmin - Todos los derechos reservados.
        </footer>
    );
};

export default Footer;
