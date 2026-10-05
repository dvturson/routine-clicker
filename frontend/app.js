import { db, ref, set, onValue } from './firebase.js';

const weeksEl = document.getElementById('weeks');
const monthLabelsEl = document.getElementById('monthLabels');
const checkInBtn = document.getElementById('checkInBtn');

const year = new Date().getFullYear();
let checkedDays = {};

// format date as year/month/day
function formatDate(date) {
    return date.toISOString().split('T')[0];
}

// compare the strings of dates
function isToday(date) {
    return formatDate(date) === formatDate(new Date());
}

// build calendar grid
function buildCalendar() {
    weeksEl.innerHTML = '';
    monthLabelsEl.innerHTML = '';
    console.log('building calendar, year:', year);

    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    // start from monday on or before Jan 1
    let current = new Date(startDate);
    const dow = current.getDay();
    const offset = dow === 0 ? 6 : dow - 1;
    current.setDate(current.getDate() - offset);

    const months = [];
    let weekIndex = 0;

    while (current <= endDate) {
        const weekEl = document.createElement('div');
        weekEl.className = 'week';

        for (let d = 0; d < 7; d++) {
            const cell = document.createElement('div');
            const dateStr = formatDate(current);

            if (current.getFullYear() != year) {
                cell.className = 'day-cell empty';
            } else {
                cell.className = 'day-cell';
                const dayData = checkedDays[dateStr];
                if (dayData && Object.values(dayData).some(v => v === true)) cell.classList.add('checked');
                if (isToday(current)) cell.classList.add('today');
                cell.dataset.date = dateStr;
                cell.title = dateStr;

                // track month label position
                if (current.getDate() === 1) {
                    months.push({ index: weekIndex, month: current.toLocaleDateString('default', { month: 'short' }) });
                }

                // click any box (day) to toggle
                cell.addEventListener('click', () => toggleDay(dateStr));
            }

            weekEl.appendChild(cell);
            current.setDate(current.getDate() + 1);
        }

        weeksEl.appendChild(weekEl);
        weekIndex++;
        console.log('weeks built:', weekIndex);
    }

    // build month labels
    const totalWeeks = weekIndex;
    months.forEach((m, i) => {
        const label = document.createElement('span');
        label.className = 'month-label';
        label.textContent = m.month;
        const widthPercent = ((i < months.length - 1 ? months[i + 1].index : totalWeeks) - m.index) / totalWeeks * 100;
        label.style.width = `${widthPercent}%`;
        label.style.flex = 'none';
        monthLabelsEl.appendChild(label);
    });
}

// toggle a specific day in firebase
function toggleDay(dateStr) {
    const dayData = checkedDays[dateStr];

    // check day as "checked" if true
    const isChecked = dayData && Object.values(dayData).some(v => v === true);
    set(ref(db, `checkin/days/${dateStr}/gym`), isChecked);
}

// check in today
checkInBtn.addEventListener('click', () => {
    toggleDay(formatDate(new Date()));
});

//  listen to firebase and rebuild calendar on any change
onValue(ref(db, 'checkin/days'), (snapshot) => {
    checkedDays = snapshot.val() || {};
    buildCalendar();
});