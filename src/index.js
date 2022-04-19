import css from "./style.css";
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import {Controller} from "./modules/controller";


window.addEventListener("load", () => {
    const controller = new Controller();
    controller.initializeUI();
});

/* Next step: Enable update function */