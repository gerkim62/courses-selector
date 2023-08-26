function findBestSchedule(courseData) {
  function hasTimeConflict(courseA, courseB) {
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

  let bestSchedule = [];
  let uniqueCourseCodes = new Set();

  function exploreSchedule(currentIndex, currentSchedule) {
    if (currentIndex >= sortedCourseData.length) {
      if (currentSchedule.length > bestSchedule.length) {
        bestSchedule = [...currentSchedule];
      }
      return;
    }

    const course = sortedCourseData[currentIndex];
    const hasConflict = currentSchedule.some((scheduledCourse) =>
      hasTimeConflict(course, scheduledCourse)
    );

    if (!hasConflict && !uniqueCourseCodes.has(course.courseCode)) {
      currentSchedule.push(course);
      uniqueCourseCodes.add(course.courseCode);

      exploreSchedule(currentIndex + 1, currentSchedule);

      currentSchedule.pop();
      uniqueCourseCodes.delete(course.courseCode);
    }

    exploreSchedule(currentIndex + 1, currentSchedule);
  }

  exploreSchedule(0, []);

  return bestSchedule;
}

export default findBestSchedule;
