import React from "react";

function Header() {
  return (
    <header className="bg-blue-500 py-2">
      <div className="container mx-auto text-center">
        <div className="mb-2">
          <h1 className="text-3xl font-bold text-white">Courses Picker</h1>
        </div>
        <p className="text-white">Select courses without clashes by simply uploading your CSV</p>
      </div>
    </header>
  );
}

export default Header;
