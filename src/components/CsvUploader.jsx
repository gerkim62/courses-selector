import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CourseUploader({ handleUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedFileName, setSelectedFileName] = useState(""); // [1]
  const navigate = useNavigate();

  const validateCSVFile = async (file) => {
    const validationResults = {
      isValid: false,
      reason: "",
    };

    if (!file.name.endsWith(".csv")) {
      validationResults.reason = "Selected file is not a CSV file.";
      return validationResults;
    }

    try {
      const fileContent = await readFileAsText(file);
      const lines = fileContent.trim().split("\n");

      const expectedHeader = `"Start","End","Mo","Tu","We","Th","Fr","Su","Lab","Lab","Course Code","Course Title","Instructor","Option","Venue","Location","Building"`;

      console.log(JSON.stringify({ header: lines[0], expectedHeader }));

      if (lines[0].trim() !== expectedHeader) {
        validationResults.reason =
          "CSV file doesn't match the expected format as per UMIS portal.";
        return validationResults;
      }

      if (lines.length < 2) {
        validationResults.reason = "CSV file is empty.";
        return validationResults;
      }

      validationResults.isValid = true;
      validationResults.reason = "CSV file is in the required format.";
      return validationResults;
    } catch (error) {
      validationResults.reason =
        "Error reading or processing the file. Please try again.";
      console.log(error);
      return validationResults;
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    setSelectedFileName(file?.name);
    setIsError(false);
    setErrorMessage("");

    if (file) {
      const validationResults = await validateCSVFile(file);
      console.log(validationResults.reason);

      if (validationResults.isValid) {
        setSelectedFile(file);
      } else {
        setIsError(true);
        // alert(validationResults.reason);
        setErrorMessage(validationResults.reason);
      }
    } else {
      setErrorMessage("You didn't select any file.");
      setIsError(true);
      setSelectedFile(null);
    }
  };

  const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const content = event.target.result;
        resolve(content);
      };

      reader.onerror = (event) => {
        reject(event.target.error);
      };

      reader.readAsText(file);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center my-10 min-h-[50vh]">
      <h1 className="text-2xl font-semibold mb-4">Upload Courses CSV</h1>

      <label
        htmlFor="uploadFile"
        className="block font-medium mb-2 text-gray-700"
      ></label>
      <div className="flex items-center border rounded-lg overflow-hidden mb-5 max-w-[80%]">
        <label
          htmlFor="fileInput"
          className="px-4 py-2 bg-emerald-500 text-white cursor-pointer whitespace-nowrap"
        >
          Choose File
        </label>
        <input
          id="fileInput"
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFileChange}
        />
        <a
          href="#"
          onClick={() => {
            const fileInput = document.getElementById("fileInput");
            if (fileInput) {
              fileInput.click();
            }
          }}
          className="px-2 py-2 text-gray-600 text-ellipsis overflow-clip whitespace-nowrap cursor-pointer"
        >
          {selectedFileName || "No file selected"}
        </a>
      </div>

      {isError && <p className="text-red-500 text-sm my-2">{errorMessage}</p>}
      <button
        className={`py-2 px-4 rounded font-semibold ${
          selectedFile
            ? "bg-blue-500 hover:bg-blue-700 text-white"
            : "bg-gray-300 cursor-not-allowed text-gray-500"
        }`}
        onClick={() => handleUpload(selectedFile)}
        disabled={!selectedFile}
      >
        {selectedFile ? "Upload CSV Now" : "Choose a CSV File"}
      </button>

      {/* how to use */}

      <a
        onClick={() => navigate("/help")}
        className="text-blue-500 mt-4 hover:underline hover:text-blue-700 capitalize font-semibold transition duration-300"
      >
        How to use
      </a>
    </div>
  );
}

export default CourseUploader;
