
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-sm py-4 fixed w-full z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">
            <a href="#" className="flex items-center">
              PilMedia
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </a>
            <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">
              Services
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </a>
          </div>

          <div className="hidden md:block">
            <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-700 rounded-md outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 flex flex-col space-y-4 py-4">
            <a 
              href="#home" 
              className="text-gray-700 hover:text-blue-600 transition-colors px-2 py-1"
              onClick={() => setIsOpen(false)}
            >
              Home
            </a>
            <a 
              href="#services" 
              className="text-gray-700 hover:text-blue-600 transition-colors px-2 py-1"
              onClick={() => setIsOpen(false)}
            >
              Services
            </a>
            <a 
              href="#about" 
              className="text-gray-700 hover:text-blue-600 transition-colors px-2 py-1"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <a 
              href="#contact" 
              className="text-gray-700 hover:text-blue-600 transition-colors px-2 py-1"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
            <Button className="bg-blue-600 hover:bg-blue-700 w-full">Get Started</Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
