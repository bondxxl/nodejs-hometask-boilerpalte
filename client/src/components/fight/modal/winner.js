import {showModal} from "./modal";
import {createWinnerImage} from "../fighterPreview";
// import NewFighter from "../../newFighter";
// import Fight from "../index";


export function showWinnerModal(fighter) {
  // call showModal function

    let title = `${fighter.name} wins!`;

    let bodyElement = createWinnerImage(fighter);

    // let onClose = () => window.reload();
    // Fight.onCreate(fighter)
    let onClose = () => window.location.reload(false);
    showModal({title, bodyElement, onClose});
}
