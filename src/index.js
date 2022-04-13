import css from "./style.css";
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import {listenForAdd} from "./modules/controller";

window.addEventListener("load", () => {
    listenForAdd();
});
