import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.querySelector('.form').addEventListener('submit', function (event) {
    event.preventDefault();

    const delay = parseInt(this.querySelector('[name="delay"]').value, 10);
    const state = this.querySelector('[name="state"]:checked').value;

    const snackbarPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });

    snackbarPromise
        .then((delay) => {
            iziToast.success({
                title: 'Fulfilled',
                message: `✅ Fulfilled promise in ${delay}ms`,
            });
        })
        .catch((delay) => {
            iziToast.error({
                title: 'Rejected',
                message: `❌ Rejected promise in ${delay}ms`,
            });
        });
});