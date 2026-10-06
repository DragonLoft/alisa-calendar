// script.js
// Данные вшиты для надёжности
const holidaysData = [
    { "month": 10, "day": 6,  "title": "День рождения Алисы",        "type": "birthday", "emoji": "" },
    { "month": 12, "day": 4,  "title": "День рождения Даши",         "type": "birthday", "emoji": "" },
    { "month": 11, "day": 20, "title": "День рождения Вани",         "type": "birthday", "emoji": "" },
    { "month": 4,  "day": 21, "title": "День рождения Егора",        "type": "birthday", "emoji": "" },
    { "month": 2,  "day": 7,  "title": "День рождения Папы",         "type": "birthday", "emoji": "" },
    { "month": 5,  "day": 6,  "title": "День рождения Мамы",         "type": "birthday", "emoji": "" },
    { "month": 5,  "day": 29, "title": "День рождения Бабушки Лены", "type": "birthday", "emoji": "" },
    { "month": 9,  "day": 23, "title": "День рождения Дедушки Вити", "type": "birthday", "emoji": "" },
    { "month": 7,  "day": 14, "title": "День рождения Бабушки Зои",  "type": "birthday", "emoji": "" },
    { "month": 11, "day": 16, "title": "День рождения Бабушки Вали", "type": "birthday", "emoji": "" },
    { "month": 10, "day": 20, "title": "День рождения тёти Лены",    "type": "birthday", "emoji": "" },
    { "month": 10, "day": 13, "title": "День рождения тёти Оли",     "type": "birthday", "emoji": "" }
];

 //{ "month": 6, "day": 66, "title": "День рождения перри утконоса", "type": "birthday", "emoji": "я пример" },



const moodsData = {
    "default": { "text": "Просто хороший день! Наслаждайся моментом ", "img": "" },
    "1006": { "text": "С Днём Рождения, Лис-Алис! Желаем хороших оценок, тебе это нужно как никому)))", "img": "tort.png" }                       
};

        //"1332": { "text": "Я фуфелшмерц~~~", "img": "" },


// 3. ЛОГИКА: Обновление настроения (работает и при старте, и при клике)
function updateMoodForDay(day, month, year) {
    const now = new Date();
    // month в JS от 0 до 11. Если передан (из клика), прибавляем 1. Если нет, берем текущий + 1.
    const m = (month !== undefined) ? (month + 1) : (now.getMonth() + 1);
    // day: если передан, используем его. Добавляем "0" в начало, если число.
    const d = String(day !== undefined ? day : now.getDate()).padStart(2, '0');

    // Формируем код строго в формате "МесяцДень" (например: "1006", "0229", "0101")
    const moodCode = `${m}${d}`;

    // Ищем запись. Если нет, берем 'default'. Это страховка от падения.
    const mood = (moodsData && moodsData[moodCode]) ? moodsData[moodCode] : moodsData['default'];

    // Обновляем текст
    const textEl = document.getElementById('mood-text');
    if (textEl) {
        textEl.textContent = mood.text;
        // Золотой текст для ДР Алисы (можно расширить логику при желании)
        if (moodCode === "1006") {
            textEl.style.color = "#f5c518";
            textEl.style.fontWeight = "bold";
        } else {
            textEl.style.color = "";
            textEl.style.fontWeight = "normal";
        }
    }

    // Обновляем картинку
    const imgEl = document.getElementById('mood-img');
    if (imgEl) {
        if (mood.img && mood.img.trim() !== "") {
            imgEl.src = mood.img;
            imgEl.classList.remove('hidden');
        } else {
            imgEl.classList.add('hidden');
        }
    }
}

// 4. ЛОГИКА: Показ карточки события при клике
window.showEventForDate = function(day, month, year) {
    const panel = document.getElementById('event-panel');
    const content = document.getElementById('event-content');

    // Ищем праздник в выбранном месяце (month + 1) и дне
    const event = holidaysData.find(h => h.month === (month + 1) && h.day === day);

    if (event) {
        panel.classList.remove('hidden');
        content.innerHTML = `
            <div class="event-card">
                <div class="event-emoji">${event.emoji}</div>
                <h4>${event.title}</h4>
                <p>${day} ${getMonthName(month)}</p>
            </div>
        `;
    } else {
        panel.classList.add('hidden');
    }
};

function getMonthName(m) {
    return ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"][m];
}

// 5. ЛОГИКА: Расстановка точек/рамок на календаре
window.applyHolidays = function() {
    const displayMonth = (typeof currentMonth !== 'undefined') ? currentMonth + 1 : new Date().getMonth() + 1;

    document.querySelectorAll('.day-cell').forEach(cell => {
        cell.classList.remove('has-event', 'birthday');
    });

    const monthHolidays = holidaysData.filter(h => h.month === displayMonth);

    document.querySelectorAll('.day-cell').forEach(cell => {
        const day = parseInt(cell.dataset.day);
        if (!day) return;
        const event = monthHolidays.find(h => h.day === day);
        if (event) {
            cell.classList.add('has-event');
            if (event.type === 'birthday') cell.classList.add('birthday');
        }
    });
};

// 6. ЗАПУСК ПРИ ЗАГРУЗКЕ
document.addEventListener('DOMContentLoaded', () => {
    // Показываем настроение на СЕГОДНЯ
    updateMoodForDay();
    // Рисуем праздники (точки на календаре)
    if (typeof window.applyHolidays === 'function') {
        window.applyHolidays();
    }
});
