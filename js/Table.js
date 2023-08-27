//////////////////////////////////////////////////////////////////////////////////////
////////////         La classe Table                                  ////////////////
//////////////////////////////////////////////////////////////////////////////////////
class Table {
  //////////////////////////////////////////////////////////////////////////////
  ////    Remarque : Chaque bouton (MODIF, SUPPR, vue) aura un attribut VALUE
  ////               qui contiendra une chaine avec toutes les valeurs séparées
  ////               par une virgule. Il suffira donc dans la fonction de CallBack
  ////               de récupérer la ou les valeurs souhaitées.
  //////////////////////////////////////////////////////////////////////////////

  // Les attributs de la classe Table
  id_zone = ""; // Id de la zone dans laquelle la Table sera visible
  // this.id_select = ""; // Attribut ID du Combo une fois généré.
  class_table = ""; // Attribut CLASS une fois la table générée
  data = []; // contient les informations à afficher (en retour d'une API)
  header = ""; //doit contenir les entetes des colonnes à afficher sous
  // forme de tableau (exemple : ["col1", "col2", "col3"])
  class_modif = ""; // doit contenir la classe a affecter aux boutons MODIF
  // pour faire le lien avec la fonction MODIF
  class_suppr = ""; // doit contenir la classe a affecter aux boutons SUPPR
  // pour faire le lien avec la fonction SUPPR
  class_vue = ""; // doit contenir la classe a affecter aux boutons VUE
  // pour faire le lien avec la fonction VUE

  BS_class_modif = ""; // doit contenir la classe a affecter aux boutons MODIF
  // pour gestion affichage par BOOTSTRAP
  BS_class_suppr = ""; // dir la classe a affecter aux boutons SUPPR
  // pour gestion affichage par BOOTSTRAP
  BS_class_vue = ""; // doit contenir la classe a affecter aux boutons VUE
  // pour gestion affichage par BOOTSTRAP

  icone_modif = ""; // doit contenir la classe a affecter aux boutons MODIF
  // pour definir le style et l'icone (exemple : btn-info fas fa-pencil)
  icone_suppr = ""; // doit contenir la classe a affecter aux boutons SUPPR
  // pour definir le style et l'icone (exemple : btn-info fas fa-trash)
  icone_vue = ""; // doit contenir la classe a affecter aux boutons SUPPR
  // pour definir le style et l'icone (exemple : btn-info fas fa-eye)

  // Les méthodes appelées sur le CLICK des BOUTONS
  fonction_modif = ""; // doit contenir la fonction qui sera appelée lors du
  // click sur le bouton MODIF
  fonction_suppr = ""; // doit contenir la fonction qui sera appelée lors du
  // click sur le bouton SUPPR
  fonction_vue = ""; // doit contenir la fonction qui sera appelée lors du
  // click sur le bouton VUE

  // Pour la gestion de l'affichage d'une fenetre MODALE en cliquant sur les boutons
  BS_toggle_modal = {
    attribut: "data-bs-toggle",
    valeur: "modal",
  };
  BS_target_vue = {
    attribut: "data-bs-target",
    valeur: "",
  };
  BS_target_modif = {
    attribut: "data-bs-target",
    valeur: "",
  };
  BS_target_suppr = {
    attribut: "data-bs-target",
    valeur: "",
  };

  // Proprietes diverses
  separateur = "*"; // Par défaut les valeurs seront séparées par une *
  append = false; // Par defaut on ecrase le contenu de la zone d'affichage
  id_tbody = ""; // Id qui sera attribué à la zone TBODY de la table

  generer = function () {
    let obj_actuel = this;

    if (this.id_zone != "") {
      // Génération de <table>
      let table_genere = document.createElement("table");
      table_genere.className = this.class_table;

      // Génération de <thead>
      let thead_genere = document.createElement("thead");
      table_genere.appendChild(thead_genere);

      // Génération des colonnes ENTETE
      let tr_head_genere = document.createElement("tr");
      thead_genere.appendChild(tr_head_genere);
      this.header.forEach((th_text) => {
        let th_genere = document.createElement("th");
        th_genere.innerText = th_text;
        tr_head_genere.appendChild(th_genere);
      });

      // Si on a reçu des fonctions pour MODIF ou SUPPR ==> ajout du header ACTIONS
      if (this.fonction_modif || this.fonction_suppr || this.fonction_vue) {
        let th_genere = document.createElement("th");
        th_genere.innerText = "Actions";
        tr_head_genere.appendChild(th_genere);
      }

      // Génération du <tbody>
      let tbody_genere = document.createElement("tbody");
      tbody_genere.id = this.id_tbody;
      table_genere.appendChild(tbody_genere);

      this.data.forEach((item) => {
        
        let tr_body_genere = document.createElement("tr");
        tbody_genere.appendChild(tr_body_genere);
        // Génération des cellules de la ligne
        item.forEach((cellule) => {
          let td_genere = document.createElement("td");
          td_genere.innerText = cellule;
          tr_body_genere.appendChild(td_genere);
        });

        if (
          typeof obj_actuel.fonction_modif == "function" ||
          typeof obj_actuel.fonction_suppr == "function" ||
          typeof obj_actuel.fonction_vue == "function"
        ) {
          let td_genere = document.createElement("td");
          //   td_genere.className = "d-flex  flex-sm-wrap";
          tr_body_genere.appendChild(td_genere);

          let values = item.join(obj_actuel.separateur); // Toutes les valeurs sont concaténées avec une *
          //alert(values);
          if (typeof obj_actuel.fonction_vue == "function") {
            let btn_genere = document.createElement("button");
            btn_genere.className =
              obj_actuel.class_vue +
              " " +
              obj_actuel.BS_class_vue +
              " " +
              obj_actuel.icone_vue;
            btn_genere.value = values;
            if (obj_actuel.BS_target_vue.valeur != "") {
              btn_genere.setAttribute(
                obj_actuel.BS_toggle_modal.attribut,
                obj_actuel.BS_toggle_modal.valeur
              );
              btn_genere.setAttribute(
                obj_actuel.BS_target_vue.attribut,
                obj_actuel.BS_target_vue.valeur
              );
            }

            btn_genere.addEventListener(
              "click",
              function (e) {
                obj_actuel.fonction_vue(e);
              },
              false
            );
            td_genere.appendChild(btn_genere);
          }
          if (typeof obj_actuel.fonction_modif == "function") {
            let btn_genere = document.createElement("button");
            btn_genere.className =
              obj_actuel.class_modif +
              " " +
              obj_actuel.BS_class_modif +
              " " +
              obj_actuel.icone_modif;
            btn_genere.value = values;

            if (obj_actuel.BS_target_modif.valeur != "") {
              btn_genere.setAttribute(
                obj_actuel.BS_toggle_modal.attribut,
                obj_actuel.BS_toggle_modal.valeur
              );
              btn_genere.setAttribute(
                obj_actuel.BS_target_modif.attribut,
                obj_actuel.BS_target_modif.valeur
              );
            }
            btn_genere.addEventListener(
              "click",
              function (e) {
                obj_actuel.fonction_modif(e);
              },
              false
            );
            td_genere.appendChild(btn_genere);
          }
          if (typeof obj_actuel.fonction_suppr == "function") {
            let btn_genere = document.createElement("button");
            btn_genere.className =
              obj_actuel.class_suppr +
              " " +
              obj_actuel.BS_class_suppr +
              " " +
              obj_actuel.icone_suppr;
            btn_genere.value = values;

            if (obj_actuel.BS_target_suppr.valeur != "") {
              btn_genere.setAttribute(
                obj_actuel.BS_toggle_modal.attribut,
                obj_actuel.BS_toggle_modal.valeur
              );
              btn_genere.setAttribute(
                obj_actuel.BS_target_suppr.attribut,
                obj_actuel.BS_target_suppr.valeur
              );
            }

            btn_genere.addEventListener(
              "click",
              function (e) {
                obj_actuel.fonction_suppr(e);
              },
              false
            );
            td_genere.appendChild(btn_genere);
          }
        }
      });

      // La TABLE devint visible dans la ZONE d'affichage
      if (!obj_actuel.append) {
        document.getElementById(obj_actuel.id_zone).innerText = "";
      }
      document.getElementById(obj_actuel.id_zone).appendChild(table_genere);
    } else {
      throw new Error(
        "Pour générer une table, il faut préciser la proprieté id_zone"
      );
    }
  };
}
