//////////////////////////////////////////////////////////////////////////////////////
////////////         La classe Combo                                  ////////////////
//////////////////////////////////////////////////////////////////////////////////////
class Combo {
  constructor() {
    // Les attributs de la classe Combo
    this.id_zone = ""; // Id de la zone dans laquelle le COMBO sera visible
    this.id_select = ""; // Attribut ID du Combo une fois généré.
    this.class_select = ""; // Attribut CLASS une fois le combo généré
    this.data = []; // Tableau à 2 dimensions (value / texte)

    this.fonction_change = ""; // Fonction qui sera executée lorsque la valeur selectionnée change
  }

  // Les méthodes de la classe COMBO
  generer() {
    if (this.id_zone != "" && this.id_select != "") {
      let code_select_genere = document.createElement("select");
      code_select_genere.id = this.id_select;
      code_select_genere.className = this.class_select;
      this.data.forEach((uneOption) => {
        let code_option_genere = document.createElement("option");
        code_option_genere.value = uneOption[0];
        code_option_genere.innerText = uneOption[1];
        code_select_genere.appendChild(code_option_genere);
      });

      // Interception de l'evenement CHANGE (si une fonction est prévue par l'utilisateur)
      if (typeof this.fonction_change == "function") {
        code_select_genere.addEventListener(
          "change",
          this.fonction_change,
          false
        );
      }

      // Le SELECT devient visible
      let zone_affiche = document.getElementById(this.id_zone);
      zone_affiche.innerHTML = "";
      zone_affiche.appendChild(code_select_genere);
    } else {
      throw new Error(
        "Pour générer un Combo, il faut préciser la proprieté id_zone et la propriété id_select"
      );
    }
  }
}

export { Combo };
