import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/js/iziToast.min.js";
import "izitoast/dist/css/iziToast.min.css";

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        if (selectedDate < new Date()) {
            document.getElementById("start-btn").disabled = true;
            iziToast.warning({
                title: 'Попередження',
                message: 'Будь ласка, оберіть дату у майбутньому',
            });
        } else {
            document.getElementById("start-btn").disabled = false;
        }
    },
};
const datetimePicker = flatpickr("#datetime-picker", options);
document.getElementById("datetime-picker").addEventListener("click", () => {
    datetimePicker.open();
});


function addLeadingZero(value) {
    return value < 10 ? `0${value}` : value;
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

let timerInterval; 

document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start-btn");

    startBtn.addEventListener("click", () => {
        const selectedDate = datetimePicker.selectedDates[0];
        const currentDate = new Date();

        if (selectedDate < currentDate) {
            iziToast.warning({
                title: 'Попередження',
                message: 'Будь ласка, оберіть дату у майбутньому',
            });
            return;
        }

        startBtn.disabled = true;

        const timeDifference = selectedDate.getTime() - currentDate.getTime();
        let countdown = timeDifference;

        timerInterval = setInterval(() => {
            if (countdown <= 0) {
                clearInterval(timerInterval);
                updateTimerUI(convertMs(0));
                iziToast.success({
                    title: 'Успіх',
                    message: 'Відлік завершено!',
                });

                return;
            }

            updateTimerUI(convertMs(countdown));
            countdown -= 1000;
        }, 1000);
    });

    document.getElementById("datetime-picker").addEventListener("change", () => {
        startBtn.disabled = true;
        clearInterval(timerInterval);
        updateTimerUI(convertMs(0));
    });
});

document.getElementById("datetime-picker").addEventListener("change", () => {
    document.getElementById("start-btn").disabled = true;
    clearInterval(timerInterval);
    updateTimerUI(convertMs(0));
});

function updateTimerUI({ days, hours, minutes, seconds }) {
    document.querySelector("[data-days]").textContent = addLeadingZero(days);
    document.querySelector("[data-hours]").textContent = addLeadingZero(hours);
    document.querySelector("[data-minutes]").textContent = addLeadingZero(minutes);
    document.querySelector("[data-seconds]").textContent = addLeadingZero(seconds);
}