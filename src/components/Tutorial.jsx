import React from "react";

const Tutorial = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        How to Use the Course Scheduler
      </h1>
      <ol className="list-decimal list-inside space-y-2">
        <li>
          Go to the registration website and select the courses you want to
          take.
          <ul className="list-disc list-inside ml-4">
            <li>
              Select ALL the available options you're interested in (e.g.,Group
              A, B etc).
            </li>
            <li>Make sure to choose different OPTIONS for each course.</li>
          </ul>
        </li>
        <li>
          Once you've selected all your courses and options, go to the "Selected
          Timetable" section.
        </li>
        <li>
          In the "Selected Timetable" section, you'll find an option to export
          your schedule as a CSV file.
          <ul className="list-disc list-inside ml-4">
            <li>Click on the "CSV" button to save the file to your device.</li>
          </ul>
        </li>
        <li>Come back to this app and go to the upload section.</li>
        <li>
          Upload the downloaded CSV file by clicking the "Upload CSV" button.
          <ul className="list-disc list-inside ml-4">
            <li>
              The app will process the file and choose onlyu the options that
              don't clash.
            </li>
          </ul>
        </li>
      </ol>

      <a href="/" className="py-2 px-4 rounded font-semibold bg-blue-500 hover:bg-blue-700 text-white mx-auto my-4">
        Go to App
      </a>
    </div>
  );
};

export default Tutorial;
