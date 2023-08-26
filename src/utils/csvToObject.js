function parseCSVToScheduleArray(csv) {
  ////console.log("parseCSVToScheduleArray received input:", csv);
  csv = csv.replaceAll(`"`, "");

  //remove empty lines
  const lines = csv.split("\n").filter((line) => line.trim() !== "");

  
  const headers = lines[0]
    .split(",")


  const scheduleArray = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",");
    const scheduleObject = createScheduleObject(headers, values);
    scheduleArray.push(scheduleObject);
  }

  ////console.log("parseCSVToScheduleArray output:", scheduleArray);

  return scheduleArray;
}

function createScheduleObject(headers, values) {
  //console.log("createScheduleObject received input:", headers, values);

  const scheduleObject = {};

  for (let j = 0; j < headers.length; j++) {
    const header = headers[j];
    const value = values[j] ?? "";

    if (header === "Start") {
      scheduleObject.startTime = value;
    } else if (header === "End") {
      scheduleObject.endTime = value;
    } else if (isDayHeader(header)) {
      if (value.trim() === "true") {
        if (!scheduleObject.days) {
          scheduleObject.days = [];
        }
        scheduleObject.days.push(header);
      }
    } else if (header === "Option") {
      scheduleObject.option = value;
    } else if (header === "Course Title") {
      scheduleObject.courseTitle = value;
    } else if (header === "Course Code") {
      scheduleObject.courseCode = value;
    } else if (header === "Instructor") {
      scheduleObject.instructor = value;
    }
  }

  ////console.log("createScheduleObject output:", scheduleObject);

  return scheduleObject;
}

function isDayHeader(header) {
  const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  //   console.log("isDayHeader received input:", header);

  const isDay = daysOfWeek.includes(header);

  //   console.log("isDayHeader output:", isDay);

  return isDay;
}

export default parseCSVToScheduleArray;
