import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  colorMode: boolean;
  navigationHandler: (target: string) => void;
}

const MobileMenu = ({
  isOpen,
  setIsOpen,
  colorMode,
  navigationHandler,
}: MobileMenuProps) => {
  const menuRef = useRef(null);
  const menuItemsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useGSAP(() => {
    if (isOpen) {
      // Animate menu background
      gsap.to(menuRef.current, {
        x: "0%",
        duration: 0.5,
        ease: "power3.inOut",
      });

      // Animate menu items
      menuItemsRef.current.forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.1 * index,
            ease: "power3.out",
          },
        );
      });
    } else {
      // Animate menu background out
      gsap.to(menuRef.current, {
        x: "100%",
        duration: 0.5,
        ease: "power3.inOut",
      });

      // Reset menu items
      menuItemsRef.current.forEach((item) => {
        gsap.set(item, {
          opacity: 0,
          y: 50,
        });
      });
    }
  }, [isOpen]);

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`md:hidden z-50 relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 ${
          colorMode ? "text-white" : "text-black"
        }`}
      >
        <span
          className={`block w-6 h-0.5 transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
          style={{ backgroundColor: colorMode ? "white" : "black" }}
        />
        <span
          className={`block w-6 h-0.5 transition-all duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
          style={{ backgroundColor: colorMode ? "white" : "black" }}
        />
        <span
          className={`block w-6 h-0.5 transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
          style={{ backgroundColor: colorMode ? "white" : "black" }}
        />
      </button>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 w-full h-screen ${
          colorMode ? "bg-black" : "bg-white"
        } transform translate-x-full z-40 md:hidden`}
      >
        <div className="w-full h-full flex flex-col items-center justify-center gap-8">
          {["About", "Services", "Projects", "Contact", "Blog"].map(
            (item, index) => (
              <button
                key={item}
                ref={(el) => {
                  menuItemsRef.current[index] = el;
                }}
                className={`text-4xl font-medium ${
                  colorMode ? "text-white" : "text-black"
                } uppercase tracking-wider`}
                onClick={() => {
                  navigationHandler(item.toLowerCase());
                  setIsOpen(false);
                }}
              >
                {item}
              </button>
            ),
          )}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
