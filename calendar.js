// calendar.js
let currentYear = 2026;
let currentMonth = 9; // Октябрь (0-11)

const monthNames = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];

function renderCalendar() {
  const grid = document.getElementById('calendar-grid');
  if (!grid) return;
  grid.innerHTML = '';

  document.getElementById('current-month-year').textContent = `${monthNames[currentMonth]} ${currentYear}`;

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDayIndex = (firstDay === 0) ? 6 : firstDay - 1;

  for (let i = 0; i < startDayIndex; i++) {
    grid.appendChild(Object.assign(document.createElement('div'), { className: 'day-cell other-month' }));
  }

  const today = new Date();
  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement('div');
    cell.className = 'day-cell';
    cell.textContent = day;
    cell.dataset.day = day;

    if (today.getDate() === day && today.getMonth() === currentMonth && today.getFullYear() === currentYear) {
      cell.classList.add('today');
    }

    // КЛИК: только выделение и показ события. Настроение НЕ меняется.
    cell.addEventListener('click', () => {
        document.querySelectorAll('.day-cell').forEach(el => el.classList.remove('selected'));
        cell.classList.add('selected');
        if (typeof window.showEventForDate === 'function') {
            window.showEventForDate(day, currentMonth, currentYear);
        }
    });
    grid.appendChild(cell);
  }

  // Сразу после отрисовки расставляем маркеры праздников
  if (typeof window.applyHolidays === 'function') window.applyHolidays();
}

document.getElementById('prev-month')?.addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) { currentMonth = 11; currentYear--; }
  renderCalendar();
});

document.getElementById('next-month')?.addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) { currentMonth = 0; currentYear++; }
  renderCalendar();
});

document.addEventListener('DOMContentLoaded', renderCalendar);
