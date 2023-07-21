//import { Combo } from "./Combo.js";

        //	LES FONCTIONS


        function vueVin(e) {
            // La fonction vueVin est déclenchée lorsqu'un événement de saisie est déclenché
            // sur un élément cible. "e" est l'objet d'événement qui a déclenché la fonction.
            let valeurs = e.target.value.split("*");
            // La valeur de l'élément cible est divisée en un tableau en utilisant "*" comme séparateur.
            // Les valeurs sont stockées dans la variable "valeurs".
            document.getElementById("txtcode_vue").value = valeurs[0];
            // La valeur du premier élément du tableau "valeurs" est affectée à l'élément avec l'ID "txtcode_vue".

            document.getElementById("txtcuvee_vue").value = valeurs[1];
            document.getElementById("txtappell_vue").value = valeurs[2];
            document.getElementById("txtregion_vue").value = valeurs[3];
            document.getElementById("txtcouleur_vue").value = valeurs[4];
            document.getElementById("txtculture_vue").value = valeurs[5];
            document.getElementById("txtcomment_vue").value = valeurs[6];

        }


        function supprVin(event) {
            // La fonction supprVin est définie ici.

            //const tableBody = document.getElementById("tliste");
            // L'élément avec l'ID "tliste" est stocké dans la variable "tableBody".
            //tableBody.addEventListener("click", function (event) { // ici je rend la table entière (générée au préalable of course) sensible au click
                // Un écouteur d'événements click est ajouté à "tableBody". La fonction suivante est exécutée lorsque
                // l'événement click est déclenché sur l'élément.            
                if (event.target.classList.contains("suppr_vin")) { // je track les click sur les boutons suppr en utilisant l'event
                    if (confirm('Voulez-vous supprimer ce vin ?')) {
                        // Si la classe "suppr_vin" est présente dans la liste des classes de l'élément cible de l'événement...  
                        let row = event.target.closest("tr"); // puis je cherche la ligne la plus proche du bouton où j'ai cliqué (bouton suppr)
                        // La ligne (élément tr) la plus proche de l'élément cible est recherchée et stockée dans la variable "row".

                        let code = row.childNodes[0].textContent;
                        // Le contenu textuel du premier enfant de "row" est stocké dans la variable "code".




                        row.remove();
                        // La ligne "row" est supprimée de la table.

                        let requestOptionsDelete = {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        };

                        fetch(urlApiVin + "/" + code, requestOptionsDelete)
                            .then((response) => response.json())
                            .then(function () { })
                            .catch(function (error) {
                                alert("Ajax error: " + error);
                                // Une requête de suppression est envoyée à l'URL spécifiée avec le code en tant que paramètre.
                            });
                    }
                    
                }
            //});
        }
        function enregAjoutVin() {
            alert("Ajout enregistrer");
            // La fonction enregAjoutVin est définie ici.
            let nouvelleLigne = {

                // Un nouvel objet "nouvelleLigne" est créé avec une propriété "NOMAPPELLATION" ayant la valeur de l'élément avec l'ID "txtappell_ajout".
                NOM_CUVEE: document.getElementById("txtcuvee_ajout").value,
                CODEAPPELLATION: document.getElementById("comboAppellationAjout").value,
                CODEREGION: document.getElementById("comboRegionAjout").value,
                CODECOULEUR: document.getElementById("comboCouleurAjout").value,
                TYPE_DE_CULTURE: document.getElementById("txtculture_ajout").value,
                COMMENTAIRES: document.getElementById("txtcomment_ajout").value,
            };

            let requestOptionsAdd = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(nouvelleLigne),
                // Les options de la requête POST sont définies, y compris le corps de la requête qui contient l'objet "nouvelleLigne"
                // converti en chaîne JSON à l'aide de JSON.stringify().
            };

            fetch(urlApiVin, requestOptionsAdd)
                .then((response) => response.json())
                .then(function (data) {
                    location.reload();
                })
                .catch(function (error) {
                    alert("Ajax error: " + error);
                });
            // Une requête POST est envoyée à l'URL spécifiée avec les options définies.
            // La page est ensuite rechargée.
            

            //afficherTableau

            afficherTableau();

            }

        //    La fonction pour activer la recherche sur la TABLE

        function search(saisie, table) {
            // La fonction search est définie ici, elle prend deux paramètres "saisie" et "table".
            let zoneRecherche = document.getElementById(saisie);
            // L'élément avec l'ID spécifié par le paramètre "saisie" est stocké dans la variable "zoneRecherche".
            zoneRecherche.addEventListener("keyup", () => {
                // Un écouteur d'événements keyup est ajouté à "zoneRecherche". La fonction suivante est exécutée lorsque
                // l'événement keyup est déclenché sur l'élément.       


                // alert("rech " + zoneRecherche.value);
                let rows = document
                    .getElementById(table)
                    .getElementsByTagName("tr");
                // Toutes les lignes (éléments tr) de la table spécifiée par le paramètre "table" sont stockées dans la variable "rows".
                for (let item of rows) {
                    // Pour chaque ligne dans "rows"...
                    if (!item.innerText.includes(zoneRecherche.value)) {
                        item.classList.add("visually-hidden");
                    } else {
                        item.classList.remove("visually-hidden"); // Classe BS
                        // Si le texte de la ligne ne contient pas la valeur de "zoneRecherche", la classe "visually-hidden" est ajoutée à la ligne,
                        // sinon la classe est supprimée.
                    }
                }
            },
                false
            );
        }
       

        function modifVin(event) {
            let row = event.target.closest("tr"); // j'utilise "event" pour recuperer la ligne (tr) la plus proche du bouton où j'ai cliqué.
            // La ligne la plus proche de l'élément cible de l'événement est stockée dans la variable "row".
            let cuvee = document.getElementById("txtcuvee_modif");
            let appell = document.getElementById("comboAppellationModif");
            let region = document.getElementById("comboRegionModif");
            let couleur = document.getElementById("comboCouleurModif");
            let culture = document.getElementById("txtculture_modif");
            let comment = document.getElementById("txtcomment_modif");


            let code = row.childNodes[0].textContent;
            // Le contenu textuel du premier enfant de la ligne est stocké dans la variable "code".
            console.log(row.childNodes)

            /*
                0 code du vin
                1 nom cuvee
                2 code appellation
                3 nom appellation 
                4 code region
                5 nom region
                6 code couleur
                7 nom couleur
                8 culture
                9 commentaire
            */

            cuvee.value = row.childNodes[1].textContent;
            appell.value = row.childNodes[2].textContent;
            region.value = row.childNodes[4].textContent;
            couleur.value = row.childNodes[6].textContent;
            culture.value = row.childNodes[8].textContent;
            comment.value = row.childNodes[9].textContent;

            // Le contenu textuel du deuxième enfant de la ligne est affecté à la valeur de "vin".



            function enregistrerModif() {
                // La fonction enregistrerModif est définie ici.
                let ligneModifiee = {
                    NOM_CUVEE: cuvee.value,
                    CODEAPPELLATION: appell.value,
                    CODEREGION: region.value,
                    CODECOULEUR: couleur.value,
                    TYPE_DE_CULTURE: culture.value,
                    COMMENTAIRES: comment.value,
                };
                // Un nouvel objet "ligneModifiee" est créé

                let requestOptionsModif = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(ligneModifiee),
                };
                // Les options de la requête PUT sont définies. La méthode est "PUT", le type de contenu est défini comme "application/json",
                // et le corps de la requête contient l'objet "ligneModifiee" converti en chaîne JSON à l'aide de JSON.stringify().

                fetch(urlApiVin + "/" + code, requestOptionsModif)
                    .then((response) => response.json())
                    .then(function (data) {
                        alert("Modification effectuée");
                        location.reload();
                    })
                    .catch(function (error) {
                        alert("Ajax error: " + error);
                    });
                // Une requête PUT est envoyée à l'URL spécifiée avec le code en tant que paramètre et les options définies.
                // La réponse de la requête est convertie en JSON, puis une fonction est exécutée avec les données JSON.
                // Un message d'alerte est affiché avec le message "Modification effectuée", puis la page est rechargée.
                // Si une erreur se produit, une alerte est affichée avec le message d'erreur.

            }

            document
                .getElementById("btnModif_enreg")
                .addEventListener("click", enregistrerModif, false);
        }


        const boutonModif = document.getElementsByClassName("mod_vin");

        for (let i = 0; i < boutonModif.length; i++) {
            boutonModif[i].addEventListener("click", modifVin, false);

        }



        function afficherTableau() {
            // La fonction afficherTableau est définie ici.
            const tab = new Table();
            // Une nouvelle instance de la classe Table est créée et stockée dans la variable "tab".

            tab.id_zone = "zoneTable";
            tab.class_table = "table table-warning table-warning";
            // Les propriétés "id_zone" et "class_table" de l'objet "tab" sont définies avec les valeurs spécifiées.
            // Version avec 2 colonnes
            tab.header = ["Code", "Cuvee", "code_appelation", "Appellation", "code_region", "Region", "code_couleur", "Couleur", "Culture", "Commentaires"];
            // La propriété "header" de l'objet "tab" est définie avec un tableau contenant les en-têtes de colonnes.
            tab.class_modif = "mod_vin";
            tab.class_suppr = "suppr_vin";
            tab.class_vue = "vue_vin";
            // Les propriétés "class_modif", "class_suppr" et "class_vue" de l'objet "tab" sont définies avec les classes spécifiées.

            //  BS 5  
            tab.icone_vue = "bi bi-eye";
            tab.icone_modif = "bi bi-pencil";
            tab.icone_suppr = "bi bi-trash3";
            // Les propriétés "icone_vue", "icone_modif" et "icone_suppr" de l'objet "tab" sont définies avec les icônes spécifiées.

            // Les méthodes
            tab.fonction_modif = modifVin;
            tab.fonction_suppr = supprVin;
            tab.fonction_vue = vueVin;
            // Les propriétés "fonction_modif", "fonction_suppr" et "fonction_vue" de l'objet "tab" sont définies avec les fonctions spécifiées.
            tab.separateur = "*";
            // La propriété "separateur" de l'objet "tab" est définie avec la valeur spécifiée.
            // Les nouvelles Propriétés de la classe TABLE
            tab.BS_class_modif = "btn btn-info btn-sm";
            tab.BS_class_suppr = "btn btn-danger btn-sm";
            tab.BS_class_vue = "btn btn-success btn-sm";
            // Les propriétés "BS_class_modif", "BS_class_suppr" et "BS_class_vue" de l'objet "tab" sont définies avec les classes spécifiées.
            // Pour les fenetres MODAL BS
            tab.BS_toggle_modal = {
                // attribut : "data-toggle" ,
                attribut: "data-bs-toggle",
                valeur: "modal",
            };
            tab.BS_target_vue = {
                attribut: "data-bs-target",
                valeur: "#frmVue",
            };

            tab.BS_target_modif = {
                attribut: "data-bs-target",
                valeur: "#frmModif",
            };
            

            // Les propriétés "BS_toggle_modal", "BS_target_vue" et "BS_target_modif" de l'objet "tab" sont définies avec les attributs et valeurs spécifiés.

            tab.id_tbody = "tliste";
            tab.append = false;
            // Les propriétés "id_tbody" et "append" de l'objet "tab" sont définies avec les valeurs spécifiées.
            let requestOptions = {
                method: "GET",
                redirect: "follow",
            };
            // Les options de la requête GET sont définies.
            fetch(urlApiVin + "?include=APPELLATION,COULEUR,REGION,PAYS&transform=1", requestOptions)
                .then((response) => response.json())
                .then(function (data) {

                    // ["Code", "Cuvee", "code appellation", "Appellation", "Region", "Couleur", "Culture", "Commentaires"];
                    let nouveauTableauVin = data.VIN.map(vin => {
                        //console.log(vin.COULEUR[0]["NOMCOULEUR"])
                        return [vin.CODEVIN,
                        vin.NOM_CUVEE,
                        vin.CODEAPPELLATION,
                        vin.APPELLATION[0]['NOMAPPELLATION'],
                        vin.CODEREGION,
                        vin.REGION[0]["NOMREGION"],
                        vin.CODECOULEUR,
                        vin.COULEUR[0]["NOMCOULEUR"],
                        vin.TYPE_DE_CULTURE,
                        vin.COMMENTAIRES,
                        ]
                    });
                    tab.data = nouveauTableauVin;

                    // équivalent au map : 
                    // let nouveauTableauVin = [];
                    // data.VIN.forEach(vin => {
                    //     nouveauTableauVin.push(JSON.stringify(vin))
                    // });

                    tab.generer();
                })
                .catch(function (error) {
                    console.log("Ajax error: " + error);
                });
            // Une requête GET est envoyée à l'URL spécifiée avec les options définies.
            // La réponse de la requête est convertie en JSON, puis une fonction est exécutée avec les données JSON.
            // La propriété "data" de l'objet "tab" est définie avec les enregistrements du JSON, puis la méthode "generer()" de l'objet "tab" est appelée.
            // Si une erreur se produit, une alerte est affichée avec le message d'erreur.


            document
                .getElementById("btnAjout_enreg")
                .addEventListener("click", enregAjoutVin, false);
        }
        // Un écouteur d'événements click est ajouté à l'élément avec l'ID "btnAjout_enreg".
        // Lorsque le bouton est cliqué, la fonction enregAjoutVin est appelée.

        function afficherComboCouleur(selectTagId) {
            let requestOptions = {
                method: "GET",
                redirect: "follow",
            };
            fetch(urlApiCouleur, requestOptions)
            .then((response) => response.json())
            .then(function (data) {
                const comboCouleur = document.getElementById(selectTagId);

                data.COULEUR.records.forEach((couleur) => {
                    // https://developer.mozilla.org/fr/docs/Web/HTML/Element/select
                    const code_option_generated_color = document.createElement("option");
                    code_option_generated_color.value = couleur[0];
                    code_option_generated_color.innerText = couleur[1];
                    comboCouleur.appendChild(code_option_generated_color);
                });
            });
        }
        
 // Combo des regions
        function afficherComboRegion(selectTagId) {   
            let requestOptions = {
                 method: "GET",
                redirect: "follow",
            };

            fetch(urlApiRegion, requestOptions)
            .then((response) => response.json())
            .then(function (data) {
                 const comboRegion = document.getElementById(selectTagId);

                data.REGION.records.forEach((region) => {
                    const code_option_generated_region = document.createElement("option");
                    code_option_generated_region.value = region[0];
                    code_option_generated_region.innerText = region[2];
                    comboRegion.appendChild(code_option_generated_region);
                });
          });
        };
        
  //Combo appellations

            function afficherComboAppellation(selectTagId){
                 let requestOptions = {
                    method: "GET",
                    redirect: "follow",
                };


                fetch(urlApiAppell, requestOptions)
                .then((response) => response.json())
                .then(function (data) {
 
                    const comboAppellation = document.getElementById(selectTagId);
 
                     data.APPELLATION.records.forEach((app) => {
 
                        const code_option_generated_Appellation = document.createElement("option");
                         code_option_generated_Appellation.value = app[0];
                        code_option_generated_Appellation.innerText = app[1];
                        comboAppellation.appendChild(code_option_generated_Appellation);
                     });
                 });
            }   




        //	PROGRAMME PRINCIPAL                  


        window.addEventListener("load", (event) => {
            // Un écouteur d'événements load est ajouté à la fenêtre.
            // Lorsque la page est entièrement chargée, la fonction suivante est exécutée.
            afficherTableau();
            // La fonction afficherTableau est appelée pour afficher le tableau.

            search("txtRech", "tliste");
            // La fonction search est appelée avec les paramètres "txtRech" et "tliste".
            // Cela active la fonctionnalité de recherche sur la table spécifiée.

            const boutonModif = document.getElementsByClassName("mod_vin");
            // Les éléments avec la classe "mod_vin" sont stockés dans la variable "boutonModif".
            for (let i = 0; i < boutonModif.length; i++) {
                boutonModif[i].addEventListener("click", modifVin);
                // Un écouteur d'événements click est ajouté à chaque élément dans la collection "boutonModif".
                // Lorsque l'un des boutons est cliqué, la fonction modifVin est appelée.
            }


            afficherComboCouleur("comboCouleurAjout");
            afficherComboCouleur("comboCouleurModif");
            // changé la div en select
            // on a précisé l'id de manière à ce qu'il soit unique
            // valorisé les requestOptions
            // ajouté les "options" directment au selec avec appendChild
            // le tout dans une fonction, appelée directement au window.addEventListener("load")

            afficherComboRegion("comboRegionAjout");
            afficherComboRegion("comboRegionModif");

            afficherComboAppellation("comboAppellationAjout");
            afficherComboAppellation('comboAppellationModif');




            
//function getCouleur
            function getCouleur() {
                const requestOptions = {
                  method: "GET",
                  redirect: "follow",
                };
              
                fetch("urlApiCouleur", requestOptions)
                  .then((response) => response.json())
                  .then(function (data) {
                    console.log(data);
                    let comboCouleur = new Combo();
                    comboCouleur.id_zone = "zonecomboCouleur";
                    comboCouleur.id_select = "id-cb-couleur";
                    comboCouleur.data = data.COULEUR.records;
                    comboCouleur.generer();
                  })
                  .catch(function (error) {
                    console.log("La requete GET a échoué : ", error);
                  });
            
     
                window.addEventListener("load", () => {
                    getCouleur();
                  });
            }
                });



    
    
                
     
    

    


        
        
   
