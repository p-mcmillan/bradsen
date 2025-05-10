import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { navLinks } from "../../constants/index";

let timer;

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY) {
          // Scroll down
          setShow(false);
        } else {
          // Scroll up
          setShow(true);
        }

        setLastScrollY(currentScrollY);

        clearTimeout(timer);
        timer = setTimeout(() => setShow(true), 1500); // re-show after inactivity
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [lastScrollY]);

  const toggleMobileMenu = () => {
    if (hydrated) setOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    if (hydrated) setOpen(false);
  };

  return (
    <nav
      className={`bg-[#030201] bg-opacity-75 h-[80px] fixed w-full top-0 z-50 text-white transition-transform duration-300 ${
        hydrated && !show ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex items-center font-medium justify-around">
        <div className="z-50 py-3 px-6 md:w-auto w-full flex justify-between items-center text-white">
          <Link to="/">
            <img
              src="https://westmar.ca/_media/custom/Vector.svg"
              alt="logo"
              className="md:cursor-pointer h-9 text-white mx-auto"
            />
          </Link>

          <div
            className="text-[40px] md:hidden flex justify-center items-center"
            onClick={toggleMobileMenu}
          >
            {hydrated && (
              <ion-icon
                className="mx-auto"
                name={open ? "close" : "menu"}
              ></ion-icon>
            )}
          </div>
        </div>

        {/* Desktop Nav Links */}
        <ul className="md:flex hidden uppercase items-center gap-8 font-bold">
          {Array.isArray(navLinks) &&
            navLinks.map((nav) => (
              <li key={nav.id}>
                <Link
                  to={nav.to}
                  className="py-7 px-3 inline-block tracking-[2px]"
                  onClick={closeMobileMenu}
                >
                  {nav.title}
                </Link>
              </li>
            ))}
        </ul>

        {/* Mobile Nav Links */}
        <ul
          className={`
          md:hidden bg-[#030201] fixed w-full h-screen top-0 overflow-y-auto bottom-0 py-24 pl-4
          duration-500 z-40 ${open ? "left-0" : "left-[-100%]"}
        `}
        >
          {Array.isArray(navLinks) &&
            navLinks.map((nav) => (
              <li key={nav.id}>
                <Link
                  to={nav.to}
                  className="py-7 px-3 inline-block text-xl tracking-[2px]"
                  onClick={closeMobileMenu}
                >
                  {nav.title}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
