import { NavLink } from "react-router-dom";

const Footer = () => {
  const links = [
    {
      label: "About Us",
      to: "about-us",
    },
    {
      label: "Contact Us",
      to: "/contact-us",
    },
    {
      label: "Terms and Conditions",
      to: "/terms-and-conditions",
    },
    {
      label: "Privacy",
      to: "/privacy",
    },
  ];
  return (
    <footer className="space-y-4 py-4">
      <div className="max-w-3xl flex items-center gap-4 justify-between mx-auto">
        {links.map((link, index) => (
          <NavLink key={index} to={link.to} target="_self">
            {link.label}
          </NavLink>
        ))}
      </div>
      <p className="text-center">
        Copyright &copy; {new Date().getFullYear()}. All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
