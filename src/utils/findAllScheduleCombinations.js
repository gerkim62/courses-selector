function findAllScheduleCombinations(courseData, { minCoursesCount = 2 } = {}) {
  const creditHoursCache = {};
  let skipCreditHoursPrompt = false;
  function hasTimeConflict(courseA, courseB) {
    if (!courseA || !courseB) {
      console.log("hasTimeConflict received invalid input:", courseA, courseB);
      return false;
    }
    return (
      courseA.days.some((dayA) => courseB.days.includes(dayA)) &&
      ((courseA.startTime >= courseB.startTime &&
        courseA.startTime < courseB.endTime) ||
        (courseB.startTime >= courseA.startTime &&
          courseB.startTime < courseA.endTime))
    );
  }

  const sortedCourseData = [...courseData].sort((a, b) =>
    a.startTime.localeCompare(b.startTime)
  );

  const allScheduleCombinations = [];
  const uniqueCourseCodes = new Set();

  function exploreSchedules(currentIndex, currentSchedule) {
    if (currentIndex >= sortedCourseData.length) {
      if (currentSchedule.length >= minCoursesCount) {
        allScheduleCombinations.push([...currentSchedule]);
      }
      return;
    }

    const course = sortedCourseData[currentIndex];
    const hasConflict = currentSchedule.some((scheduledCourse) =>
      hasTimeConflict(course, scheduledCourse)
    );

    if (!hasConflict && !uniqueCourseCodes.has(course.courseCode)) {
      if (
        typeof creditHoursCache[course.courseCode] === "undefined" &&
        !skipCreditHoursPrompt
      ) {
        console.log("creditHoursCache:", creditHoursCache);
        const creditHours = parseFloat(
          prompt(
            `Enter credit hours for ${course.courseCode} (Cancel to Skip):`
          )
        );
        if (isNaN(creditHours)) {
          skipCreditHoursPrompt = true;
        }
        course.creditHours = creditHours; // Store credit hours in the course object
        creditHoursCache[course.courseCode] = creditHours; // Store credit hours in the cache
      } else {
        course.creditHours = creditHoursCache[course.courseCode]; // Retrieve credit hours from the cache
      }
      currentSchedule.push(course);
      uniqueCourseCodes.add(course.courseCode);

      exploreSchedules(currentIndex + 1, currentSchedule);

      currentSchedule.pop();
      uniqueCourseCodes.delete(course.courseCode);
    }

    exploreSchedules(currentIndex + 1, currentSchedule);
  }

  exploreSchedules(0, []);

  // Sort schedules in descending order based on the number of courses
  allScheduleCombinations.sort((a, b) => b.length - a.length);

  const withoutSubsets = removeSubsets(allScheduleCombinations);

  return sortCombinationsByCreditHours(withoutSubsets);
}

function removeSubsets(scheduleCombinations) {
  const nonSubsets = [];

  for (const combination of scheduleCombinations) {
    let isSubset = false;

    for (const existingCombination of nonSubsets) {
      if (
        combination.every((courseA) =>
          existingCombination.some(
            (courseB) =>
              courseA.courseCode === courseB.courseCode &&
              courseA.option === courseB.option
          )
        )
      ) {
        isSubset = true;
        break;
      }
    }

    if (!isSubset) {
      nonSubsets.push(combination);
    }
  }

  return nonSubsets;
}

// Given array of course data
// const courseData = [
//   {
//     startTime: "08:00:00",
//     endTime: "09:30:00",
//     days: ["Mo", "We"],
//     courseCode: "COSC220",
//     courseTitle: " Fundamentals of Software Engineering ",
//     instructor: "Dennis Gichuki",
//     option: "Main",
//   },
//   {
//     startTime: "08:00:00",
//     endTime: "09:00:00",
//     days: ["Mo", "We"],
//     courseCode: "EDUC215",
//     courseTitle: "Introduction to Philosophy Of Christian Education",
//     instructor: "Mwangi Petronila ",
//     option: "Group B",
//   },
//   {
//     startTime: "09:00:00",
//     endTime: "10:00:00",
//     days: ["Mo", "We", "Fr"],
//     courseCode: "COSC221",
//     courseTitle: "Software Process Definition And Modeling",
//     instructor: "Omari Dickson Mogaka ",
//     option: "Main",
//   },
//   {
//     startTime: "09:00:00",
//     endTime: "12:00:00",
//     days: ["Fr"],
//     courseCode: "HLED110",
//     courseTitle: "Health Principles",
//     instructor: "Sammy Lagatt",
//     option: "Main",
//   },
//   {
//     startTime: "09:30:00",
//     endTime: "11:00:00",
//     days: ["Tu", "Th"],
//     courseCode: "COSC162",
//     courseTitle: "Data Structure And  Algorithms",
//     instructor: "Omari Dickson Mogaka ",
//     option: "Group A",
//   },
//   {
//     startTime: "12:00:00",
//     endTime: "13:00:00",
//     days: ["Tu", "Th"],
//     courseCode: "BIOL105",
//     courseTitle: "Human Biology",
//     instructor: "Anthony Otengo",
//     option: "Group C",
//   },
//   {
//     startTime: "12:00:00",
//     endTime: "13:00:00",
//     days: ["Mo", "We"],
//     courseCode: "BIOL105",
//     courseTitle: "Human Biology",
//     instructor: "Prof. Ramesh Francis",
//     option: "Group B",
//   },
//   {
//     startTime: "12:00:00",
//     endTime: "13:00:00",
//     days: ["Mo", "We"],
//     courseCode: "BIOL105",
//     courseTitle: "Human Biology",
//     instructor: "Ojunga Michaiah Ogola ",
//     option: "Group A",
//   },
//   {
//     startTime: "12:00:00",
//     endTime: "13:00:00",
//     days: ["We"],
//     courseCode: "HLED110",
//     courseTitle: "Health Principles",
//     instructor: "Dr. L C Villagomez",
//     option: "Group A",
//   },
//   {
//     startTime: "14:00:00",
//     endTime: "15:30:00",
//     days: ["Tu", "Th"],
//     courseCode: "COSC237",
//     courseTitle: "Networks and Telecommunication",
//     instructor: "Omambia Andrew",
//     option: "Main",
//   },
//   {
//     startTime: "14:00:00",
//     endTime: "15:30:00",
//     days: ["Tu", "Th"],
//     courseCode: "COSC162",
//     courseTitle: "Data Structure And  Algorithms",
//     instructor: "Omari Dickson Mogaka ",
//     option: "Group B",
//   },
//   {
//     startTime: "17:00:00",
//     endTime: "18:00:00",
//     days: ["Tu", "Th"],
//     courseCode: "EDUC215",
//     courseTitle: "Introduction to Philosophy Of Christian Education",
//     instructor: "Dr. Kinuthia Benson Ngigi ",
//     option: "Group A",
//   },
//   {
//     startTime: "17:00:00",
//     endTime: "18:00:00",
//     days: ["Mo", "We"],
//     courseCode: "RELB220",
//     courseTitle: "Life And Teachings Of Jesus-General",
//     instructor: "Dr. Matte Daniel",
//     option: "Group A",
//   },
// ];

// findAllScheduleCombinations(courseData, { minCoursesCount: 2 });

function sortCombinationsByCreditHours(scheduleCombinations) {
  // Calculate the sum of credit hours for each combination
  const combinationsWithCreditSum = scheduleCombinations.map((combination) => {
    const creditSum = combination.reduce(
      (sum, course) => sum + course.creditHours,
      0
    );
    return { combination, creditSum };
  });

  console.log(combinationsWithCreditSum);

  // Sort the combinations based on the credit sum in descending order
  combinationsWithCreditSum.sort((a, b) => b.creditSum - a.creditSum);

  // Extract the sorted combinations without the credit sum
  const sortedCombinations = combinationsWithCreditSum.map(
    (item) => item.combination
  );

  return sortedCombinations;
}

export default findAllScheduleCombinations;
