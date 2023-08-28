// Given array of course data
const courseData = [
  {
    startTime: "08:00:00",
    endTime: "09:30:00",
    days: ["Mo", "We"],
    courseCode: "COSC220",
    courseTitle: " Fundamentals of Software Engineering ",
    instructor: "Dennis Gichuki",
    option: "Main",
  },
  {
    startTime: "08:00:00",
    endTime: "09:00:00",
    days: ["Mo", "We"],
    courseCode: "EDUC215",
    courseTitle: "Introduction to Philosophy Of Christian Education",
    instructor: "Mwangi Petronila ",
    option: "Group B",
  },
  {
    startTime: "09:00:00",
    endTime: "10:00:00",
    days: ["Mo", "We", "Fr"],
    courseCode: "COSC221",
    courseTitle: "Software Process Definition And Modeling",
    instructor: "Omari Dickson Mogaka ",
    option: "Main",
  },
  {
    startTime: "09:00:00",
    endTime: "12:00:00",
    days: ["Fr"],
    courseCode: "HLED110",
    courseTitle: "Health Principles",
    instructor: "Sammy Lagatt",
    option: "Main",
  },
  {
    startTime: "09:30:00",
    endTime: "11:00:00",
    days: ["Tu", "Th"],
    courseCode: "COSC162",
    courseTitle: "Data Structure And  Algorithms",
    instructor: "Omari Dickson Mogaka ",
    option: "Group A",
  },
  {
    startTime: "12:00:00",
    endTime: "13:00:00",
    days: ["Tu", "Th"],
    courseCode: "BIOL105",
    courseTitle: "Human Biology",
    instructor: "Anthony Otengo",
    option: "Group C",
  },
  {
    startTime: "12:00:00",
    endTime: "13:00:00",
    days: ["Mo", "We"],
    courseCode: "BIOL105",
    courseTitle: "Human Biology",
    instructor: "Prof. Ramesh Francis",
    option: "Group B",
  },
  {
    startTime: "12:00:00",
    endTime: "13:00:00",
    days: ["Mo", "We"],
    courseCode: "BIOL105",
    courseTitle: "Human Biology",
    instructor: "Ojunga Michaiah Ogola ",
    option: "Group A",
  },
  {
    startTime: "12:00:00",
    endTime: "13:00:00",
    days: ["We"],
    courseCode: "HLED110",
    courseTitle: "Health Principles",
    instructor: "Dr. L C Villagomez",
    option: "Group A",
  },
  {
    startTime: "14:00:00",
    endTime: "15:30:00",
    days: ["Tu", "Th"],
    courseCode: "COSC237",
    courseTitle: "Networks and Telecommunication",
    instructor: "Omambia Andrew",
    option: "Main",
  },
  {
    startTime: "14:00:00",
    endTime: "15:30:00",
    days: ["Tu", "Th"],
    courseCode: "COSC162",
    courseTitle: "Data Structure And  Algorithms",
    instructor: "Omari Dickson Mogaka ",
    option: "Group B",
  },
  {
    startTime: "17:00:00",
    endTime: "18:00:00",
    days: ["Tu", "Th"],
    courseCode: "EDUC215",
    courseTitle: "Introduction to Philosophy Of Christian Education",
    instructor: "Dr. Kinuthia Benson Ngigi ",
    option: "Group A",
  },
  {
    startTime: "17:00:00",
    endTime: "18:00:00",
    days: ["Mo", "We"],
    courseCode: "RELB220",
    courseTitle: "Life And Teachings Of Jesus-General",
    instructor: "Dr. Matte Daniel",
    option: "Group A",
  },
];

// Create a function to check for time conflicts
function hasTimeConflict(courseA, courseB) {
  return (
    courseA.days.some((dayA) => courseB.days.includes(dayA)) &&
    ((courseA.startTime >= courseB.startTime &&
      courseA.startTime < courseB.endTime) ||
      (courseB.startTime >= courseA.startTime &&
        courseB.startTime < courseA.endTime))
  );
}

// Sort the course data by start time
courseData.sort((a, b) => a.startTime.localeCompare(b.startTime));

// Initialize variables to track the best schedule and course codes
let bestSchedule = [];
let uniqueCourseCodes = new Set();

function exploreSchedule(currentIndex, currentSchedule) {
  // Base case: All courses have been considered
  if (currentIndex >= courseData.length) {
    // Check if the current schedule is better than the best schedule found so far
    if (currentSchedule.length > bestSchedule.length) {
      // Update the best schedule with the current schedule
      bestSchedule = [...currentSchedule];
    }
    return; // Exit the function
  }

  // Get the course at the current index
  const course = courseData[currentIndex];

  // Check if adding the current course would cause a time conflict with any already scheduled courses
  const hasConflict = currentSchedule.some((scheduledCourse) =>
    hasTimeConflict(course, scheduledCourse)
  );

  // Check if the current course can be added without conflict and without duplication
  if (!hasConflict && !uniqueCourseCodes.has(course.courseCode)) {
    // Add the current course to the schedule and mark its course code as used
    currentSchedule.push(course);
    uniqueCourseCodes.add(course.courseCode);

    // Explore further by considering the next course (recursive call)
    exploreSchedule(currentIndex + 1, currentSchedule);

    // Remove the current course from the schedule and mark its course code as available
    currentSchedule.pop();
    uniqueCourseCodes.delete(course.courseCode);
  }

  // Explore further by skipping the current course (recursive call)
  exploreSchedule(currentIndex + 1, currentSchedule);
}

// Start the backtracking process
exploreSchedule(0, []);

// Display the final schedule
console.log(bestSchedule);
