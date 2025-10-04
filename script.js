const date = new Date();

const MIN_YEAR = date.getFullYear();
const MAX_YEAR = MIN_YEAR + 50;

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

  // Adjust to make Monday the first day of week
  const firstDayIndex = (date.getDay() + 6) % 7;
  const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
  const nextDays = 7 - ((lastDayIndex + 6) % 7) - 1;

  document.getElementById("month-name").textContent = months[date.getMonth()];
  document.getElementById("full-date").textContent = new Date().toDateString();
  document.getElementById("year-display").textContent = date.getFullYear();

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="previous-days">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (date.getMonth() === 9 && i === 4) {
      days += `<div></div>`; // Blank space for 4th October every year
    } else if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth() &&
      date.getFullYear() === new Date().getFullYear()
    ) {
      days += `<div class="today">${i}</div>`;
    } else {
      days += `<div>${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-days">${j}</div>`;
  }

  monthDays.innerHTML = days;
};

// Month navigation buttons
document.querySelector(".prev").addEventListener("click", () => {
  if (date.getMonth() === 0) {
    if (date.getFullYear() > MIN_YEAR) {
      date.setFullYear(date.getFullYear() - 1);
      date.setMonth(11);
    }
  } else {
    date.setMonth(date.getMonth() - 1);
  }
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  if (date.getMonth() === 11) {
    if (date.getFullYear() < MAX_YEAR) {
      date.setFullYear(date.getFullYear() + 1);
      date.setMonth(0);
    }
  } else {
    date.setMonth(date.getMonth() + 1);
  }
  renderCalendar();
});

// Year navigation buttons
document.getElementById("prev-year").addEventListener("click", () => {
  if (date.getFullYear() > MIN_YEAR) {
    date.setFullYear(date.getFullYear() - 1);
    renderCalendar();
  }
});

document.getElementById("next-year").addEventListener("click", () => {
  if (date.getFullYear() < MAX_YEAR) {
    date.setFullYear(date.getFullYear() + 1);
    renderCalendar();
  }
});

// Initial render
renderCalendar();

