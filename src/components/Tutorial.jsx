import React from "react";
import { Link } from "react-router-dom";

const Tutorial = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="p-8 bg-gray-100 shadow-lg rounded-sm md:px-20 md:tracking-wide max-w-3xl xl:max-w-4xl">
        <h1 className="text-3xl font-bold mb-4">How to Use this Tool</h1>
        <p className="mb-4">
          Welcome! Follow these steps for how to use our course selection tool:
        </p>
        <div className="pl-6 space-y-3">
          <div className="flex items-start">
            <div className="mr-3 text-blue-600 font-bold">1.</div>
            <div>
              Start by visiting the UMIS registration website. Then{" "}
              <span className="font-bold underline">
                select all available options for each course
              </span>{" "}
              (like Group A, Group B, Group C etc). This smart tool will
              automatically pick one option among all those options later.
            </div>
          </div>
          <div className="flex items-start">
            <div className="mr-3 text-blue-600 font-bold">2.</div>
            <div>
              After you've made your selections for each course, head over to
              the "Selected Timetable" section.
            </div>
          </div>
          <div className="flex items-start">
            <div className="mr-3 text-blue-600 font-bold">3.</div>
            <div>
              In the "Selected Timetable" section, at the top-right corner of
              the timetable, find the "Export" button. Click it to save the
              timetable as a CSV file on your device. You'll need to upload this
              CSV to our app.
            </div>
          </div>
          <div className="flex items-start">
            <div className="mr-3 text-blue-600 font-bold">4.</div>
            <div>
              Return to our app and use the "Upload CSV" button to upload the
              CSV file you downloaded earlier. Our app will analyze the file and
              identify options that won't overlap. We'll present you with a list
              of clash-free course combinations. Choose the one that suits you
              best!
            </div>
          </div>
          <div className="flex items-start">
            <div className="mr-3 text-blue-600 font-bold">5.</div>
            <div>
              After choosing your favorite combination, remember these steps.
              Return to the UMIS registration website. For each course, select
              the option that matches the option in your combination. Remove the
              other options (e.g., if the app picked Group A, remove Groups B
              and C). This way, you'll have only compatible choices for each
              course.
            </div>
          </div>
        </div>
        <Link to="/" className="mt-6 inline-block text-blue-500 hover:underline">
          Go Back to Upload
        </Link>
      </div>
    </div>
  );
};

export default Tutorial;
