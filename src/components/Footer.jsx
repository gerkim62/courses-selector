import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col justify-center items-center">
        <p className="text-sm opacity-75 mb-3">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
        <p className="text-base mb-3">
          Contact Me:{" "}
          <a
            href="https://wa.me/254715870654"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:underline"
          >
            +254 715 870 654
          </a>
        </p>
        <p className="text-gray-400 text-center">
          Designed and Developed by developer.gerison
        </p>
      </div>
    </footer>
  );
}

export default Footer;
