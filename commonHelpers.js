import"./assets/modulepreload-polyfill-ec808ebb.js";import{f}from"./assets/vendor-b147bd73.js";const y={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){e[0]<new Date?(document.getElementById("start-btn").disabled=!0,iziToast.warning({title:"Попередження",message:"Будь ласка, оберіть дату у майбутньому"})):document.getElementById("start-btn").disabled=!1}},i=f("#datetime-picker",y);document.getElementById("datetime-picker").addEventListener("click",()=>{i.open()});function r(e){return e<10?`0${e}`:e}function d(e){const o=Math.floor(e/864e5),c=Math.floor(e%864e5/36e5),m=Math.floor(e%864e5%36e5/6e4),g=Math.floor(e%864e5%36e5%6e4/1e3);return{days:o,hours:c,minutes:m,seconds:g}}let l;document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("start-btn"),t=localStorage.getItem("startButtonDisabled")==="true";e.disabled=t,e.addEventListener("click",()=>{const n=i.selectedDates[0],a=new Date;if(n<a){iziToast.warning({title:"Попередження",message:"Будь ласка, оберіть дату у майбутньому"});return}e.disabled=!0;let o=n.getTime()-a.getTime();const c=setInterval(()=>{if(o<=0){clearInterval(c),s(d(0)),iziToast.success({title:"Успіх",message:"Відлік завершено!"}),localStorage.setItem("startButtonDisabled","false");return}s(d(o)),o-=1e3},1e3)}),document.getElementById("datetime-picker").addEventListener("change",()=>{e.disabled=!0,clearInterval(l),s(d(0)),localStorage.setItem("startButtonDisabled","true")})});document.getElementById("datetime-picker").addEventListener("change",()=>{document.getElementById("start-btn").disabled=!0,clearInterval(l),s(d(0))});function s({days:e,hours:t,minutes:n,seconds:a}){document.querySelector("[data-days]").textContent=r(e),document.querySelector("[data-hours]").textContent=r(t),document.querySelector("[data-minutes]").textContent=r(n),document.querySelector("[data-seconds]").textContent=r(a)}
//# sourceMappingURL=commonHelpers.js.map
