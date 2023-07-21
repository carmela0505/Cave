/////////////////////////////////////
///  Les IMPORTS                 ////
/////////////////////////////////////
import { Ajax_Es6 } from "./Ajax_class.js";
import { url_Api } from "./init.js";
import { Combo } from "./Combo.js";

/////////////////////////////////////
///   La classe  Combo_Couleurs /////
/////////////////////////////////////
class Combo_Couleurs extends Combo {
  /////////////////////////////////////
  // Les attributs
  /////////////////////////////////////
  #url_api = ""; // Contiendra l'URL de l'API
  #trie = false;
  #Obj_Ajax;

  /////////////////////////////////////
  // Le constructeur
  /////////////////////////////////////
  constructor(url = "", tri = false) {
    super();
    // Affectation de la PROPRIETE Url_api
    if (url == "") {
      // On utilise l'Url du fichier Init.js
      this.Url_api = url_Api + "/COULEUR";
    } else {
      // On utilise l'Url passée en parametre
      this.Url_api = url;
    }
    this.Trie = tri;
    if (this.Trie != false) {
      this.Url_api += "?order=NOMCOULEUR," + this.Trie;
    }
    // Appel AJAX
    this.#Obj_Ajax = new Ajax_Es6(this.Url_api);
    this.#Obj_Ajax.get(this.#RetourGetAjax, this.#retourGetErreur);
  }

  /////////////////////////////////////
  // Les Getter/Setter
  /////////////////////////////////////
  get Url_api() {
    return this.#url_api;
  }
  set Url_api(value) {
    if (value.length != 0) {
      this.#url_api = value;
    } else {
      throw new Error(
        "Un objet COMBO_COULEURS doit obligatoirement avoir une propriété Url_api renseignée"
      );
    }
  }

  get Trie() {
    return this.#trie;
  }
  set Trie(value) {
    if (value != false) {
      if (value == "ASC" || value == "DESC") {
        this.#trie = value;
      } else {
        throw new Error("La propriété Trie doit contenir false, ASC ou DESC");
      }
    } else {
      this.#trie = false;
    }
  }

  ////////////////////////////
  // Les Methodes PUBLIQUES //
  ////////////////////////////

  ////////////////////////////
  // Les Methodes PRIVEES   //
  ////////////////////////////
  #RetourGetAjax = (reponse) => {
    let donnees = JSON.parse(reponse);
    this.data = donnees.COULEUR.records; // Tableau à 2 dimensions (value / texte)
    this.generer();
  };

  #retourGetErreur = (reponse) => {
    console.log("ERREUR Get COULEUR : " + reponse);
  };
}

export { Combo_Couleurs };
