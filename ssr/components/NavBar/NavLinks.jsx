import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { links } from "./Mylinks";
import PropTypes from "prop-types";

const NavLinks = ({ closeMobileMenu }) => {
  const [hydrated, setHydrated] = useState(false);
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <>
      {links.map((link, index) => (
        <div key={index}>
          {/* Desktop & Mobile Top-Level Links */}
          <div className="px-3 text-left md:cursor-pointer group relative z-20">
            <h1
              className="py-7 flex justify-between items-center md:pr-0 pr-5"
              onClick={() => {
                setHeading(heading !== link.name ? link.name : "");
                setSubHeading("");
              }}
            >
              {link.name}
              <span className="md:hidden inline">
                {hydrated && (
                  <ion-icon
                    name={heading === link.name ? "chevron-up" : "chevron-down"}
                  ></ion-icon>
                )}
              </span>
            </h1>

            {/* Desktop Submenu */}
            {hydrated && link.submenu && (
              <div className="absolute top-20 hidden group-hover:block md:group-hover:block">
                <div className="py-3">
                  <div className="w-4 h-4 left-3 absolute mt-1 bg-black bg-opacity-75 rotate-45"></div>
                </div>
                <div className="bg-white p-3.5 grid grid-cols-3 gap-10 shadow-lg rounded-lg">
                  {link.sublink.map((sublink, subIndex) => (
                    <div key={subIndex}>
                      <h1 className="font-medium text-sm">
                        <Link
                          to={sublink.to}
                          onClick={closeMobileMenu}
                          className="hover:underline"
                        >
                          {sublink.Head}
                        </Link>
                      </h1>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Submenu */}
          {hydrated && (
            <div
              className={`${heading === link.name ? "md:hidden" : "hidden"}`}
            >
              {link.sublink?.map((sublink, subIndex) => (
                <div key={subIndex}>
                  <div>
                    <h1
                      onClick={() =>
                        setSubHeading(
                          subHeading !== sublink.Head ? sublink.Head : ""
                        )
                      }
                      className="py-4 pl-7 pr-5 flex justify-between items-center"
                    >
                      <Link
                        to={sublink.to}
                        onClick={closeMobileMenu}
                        className="hover:underline"
                      >
                        {sublink.Head}
                      </Link>
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

NavLinks.propTypes = {
  closeMobileMenu: PropTypes.func.isRequired,
};

export default NavLinks;
