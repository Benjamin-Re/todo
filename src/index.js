import {createTodo} from "./create.js";
// import {} from "./project";
import css from "./style.css";
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'


window.addEventListener("load", () => {
    createTodo();
});




// // Set todo status to complete module
// // Get all check icons and add event listeners to them
// let done = document.querySelectorAll(".fa-circle-check");
// done.forEach((item) => {
//   item.addEventListener("click", (event) => {
//     completeTask(event);
//   });
// });

// // Mark task complete
// const completeTask = (event) => {
//   let task = event.target.nextElementSibling;
//   let text = task.innerHTML;
//   if (text.includes("<del>")) {
//     task.parentNode.parentNode.setAttribute("data-complete", "false");
//     text = task.firstElementChild.textContent;
//     task.innerHTML = text;
//   } else {
//     task.innerHTML = `<del>${text}</del>`;
//     task.parentNode.parentNode.setAttribute("data-complete", "true");
//   }
// };

// Changing todo priority module

// Dom manipulation module

// Popup form https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_popup_form
