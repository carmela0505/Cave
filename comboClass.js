// import { Combo_Couleurs } from "./Combo_Couleurs.js";
// import { Combo_Pays } from "./Combo_Pays.js";
//////////////////////////////////////////
////    Les fonctions COMBO           ////
//////////////////////////////////////////

function alimenter_Combo_Couleurs() {
  let cb_coul = new Combo_Couleurs("", "ASC");
  cb_coul.id_zone = "zoneComboCouleur"; // Id de la zone dans laquelle le COMBO sera visible
  cb_coul.id_select = "idCouleur"; // Attribut ID du Combo une fois généré.
  cb_coul.class_select = "classCouleur"; // Attribut CLASS une fois le combo généré
}

function alimenter_Combo_Pays() {
  let cb_coul = new Combo_Pays("", "DESC");
  cb_coul.id_zone = "zoneComboPays"; // Id de la zone dans laquelle le COMBO sera visible
  cb_coul.id_select = "idPaysr"; // Attribut ID du Combo une fois généré.
  cb_coul.class_select = "classPays"; // Attribut CLASS une fois le combo généré
}
//////////////////////////////////////////////////////////
///////			PROGRAMME PRINCIPAL
//////////////////////////////////////////////////////////

window.addEventListener("load", (event) => {
  alimenter_Combo_Couleurs();
  alimenter_Combo_Pays();
});
