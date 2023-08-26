import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CourseUploader({ handleUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="flex flex-col items-center my-10">
      <h1 className="text-2xl font-semibold mb-4">Upload Courses CSV</h1>
      <input
        type="file"
        accept=".csv"
        className="mb-2 p-2 border border-gray-300 rounded-lg"
        onChange={handleFileChange}
      />
      {isError && (
        <p className="text-red-500 text-sm">Please upload a valid CSV file.</p>
      )}
      <button
        className={`py-2 px-4 rounded font-semibold ${
          selectedFile
            ? "bg-blue-500 hover:bg-blue-700 text-white"
            : "bg-gray-300 cursor-not-allowed text-gray-500"
        }`}
        onClick={() => handleUpload(selectedFile)}
        disabled={!selectedFile}
      >
        {selectedFile ? "Upload CSV Now" : "Choose CSV to Upload"}
      </button>

      {/* how to use */}
      <a
        onClick={navigate("/how-to-use")}
        className="text-blue-500 mt-4 hover:underline"
      >
        How to use
      </a>
    </div>
  );
}

export default CourseUploader;
