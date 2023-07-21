

        //	LES FONCTIONS


        function vueRegion(e) {
            // La fonction vueRegion est déclenchée lorsqu'un événement de saisie est déclenché
            // sur un élément cible. "e" est l'objet d'événement qui a déclenché la fonction.
            let valeurs = e.target.value.split("*");
            // La valeur de l'élément cible est divisée en un tableau en utilisant "*" comme séparateur.
            // Les valeurs sont stockées dans la variable "valeurs".

            document.getElementById("txtcode_vue").value = valeurs[0];// La valeur du premier élément du tableau "valeurs" est affectée à l'élément avec l'ID "txtcode_vue".
            document.getElementById("txtcodepays_vue").value = valeurs[1];
            document.getElementById("txtregion_vue").value = valeurs[2];

        }

        function supprRegion(event) {
            // Check if the clicked element contains the "suppr_region" class
            if (event.target.classList.contains("suppr_region")) {
                // Ask for confirmation before proceeding with deletion
                if (confirm('Voulez-vous supprimer ce vin ?')) {
                    // Find the closest table row (tr) to the clicked button
                    let row = event.target.closest("tr");
                    // Extract the content of the first child node (assuming it contains the "code" information)
                    let code = row.childNodes[0].textContent;
                    
                    // Remove the row from the table
                    row.remove();
        
                    // Prepare the DELETE request options
                    let requestOptionsDelete = {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    };
        
                    // Perform the fetch DELETE request to the API with the provided URL and "code" as the parameter
                    fetch(urlApiRegion + "/" + code, requestOptionsDelete)
                        .then((response) => response.json())
                        .then(function () {
                            // Success callback (optional, do something after the deletion)
                        })
                        .catch(function (error) {
                            alert("Ajax error: " + error);
                        });
                }
            }
        }
        function enregAjoutRegion() {
            alert("Ajout enregistrer");

            let nouvelleLigne = {
                CODEPAYS: document.getElementById("comboPaysAjout").value,
                NOMREGION: document.getElementById("txtregion_ajout").value,
            };

            let requestOptionsAdd = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(nouvelleLigne),
            };

            fetch(urlApiRegion, requestOptionsAdd)
                .then((response) => response.json())
                .then(function (data) {
                    location.reload();
                })
                .catch(function (error) {
                    alert("Ajax error: " + error);
                });

            afficherTableau();
        }

        //    La fonction pour activer la recherche sur la TABLE

        function search(saisie, table) {
            let zoneRecherche = document.getElementById(saisie);
            zoneRecherche.addEventListener( "keyup", () => {
                    // alert("rech " + zoneRecherche.value);
                    let rows = document
                        .getElementById(table)
                        .getElementsByTagName("tr");
                    for (let item of rows) {
                        if (!item.innerText.includes(zoneRecherche.value)) {
                            item.classList.add("visually-hidden");
                        } else {
                            item.classList.remove("visually-hidden"); // Classe BS
                        }
                    }
                },
                false
            );
        }
//Modal modif
        function modifRegion(event) {
            let row = event.target.closest("tr"); // j'utilise "event" pour recuperer la ligne (tr) la plus proche du bouton où j'ai cliqué.

            let codepays = document.getElementById("comboPaysModif");
            let region = document.getElementById("txtregion_Modif");
      


            let code = row.childNodes[0].textContent;

            codepays.value = row.childNodes[2].textContent;
            region.value = row.childNodes[3].textContent;

        /*
            0 code du vin
            1 code pays
            2 nom pays
            3 nom region
           
            */


            function enregistrerModif() {
                let ligneModifiee = {
                    CODEPAYS: codepays.value,
                    NOMREGION: region.value,
                };

                let requestOptionsModif = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(ligneModifiee),
                };

                fetch(urlApiRegion + "/" + code, requestOptionsModif)
                    .then((response) => response.json())
                    .then(function (data) {
                        alert("Modification effectuée");
                        location.reload();
                    })
                    .catch(function (error) {
                        alert("Ajax error: " + error);
                    });
            }



            document
                .getElementById("btnModif_enreg")
                .addEventListener("click", enregistrerModif, false);
        }

        const boutonModif = document.getElementsByClassName("mod_region");

        // Ajouter l'événement click à chaque élément de la collection
        for (let i = 0; i < boutonModif.length; i++) {
            boutonModif[i].addEventListener("click", modifRegion, false);
        }



        function afficherTableau() {
            // alert("Affiche TABLEAU");
            const tab = new Table();

            tab.id_zone = "zoneTable";
            tab.class_table = "table table-warning table-warning";
            // Version avec 2 colonnes
            tab.header = ["Code", "Code Pays", "Nom Pays", "Nom Region"];

            tab.class_modif = "mod_region";
            tab.class_suppr = "suppr_region";
            tab.class_vue = "vue_region";

            //  BS 5  
            tab.icone_vue = "bi bi-eye";
            tab.icone_modif = "bi bi-pencil";
            tab.icone_suppr = "bi bi-trash3";

            // Les méthodes
            tab.fonction_modif = modifRegion;
            tab.fonction_suppr = supprRegion;
            tab.fonction_vue = vueRegion;

            tab.separateur = "*";

            // Les nouvelles Propriétés de la classe TABLE
            tab.BS_class_modif = "btn btn-info btn-sm";
            tab.BS_class_suppr = "btn btn-danger btn-sm";
            tab.BS_class_vue = "btn btn-success btn-sm";

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

            tab.id_tbody = "tliste";
            tab.append = false;

            let requestOptions = {
                method: "GET",
                redirect: "follow",
            };

            fetch(urlApiRegion + "?include=PAYS&transform=1", requestOptions)
                .then((response) => response.json())
                .then(function (data) {

                    let nouveauTableauRegion = data.REGION.map(region => {
                        // console.log(region.CODEPAYS[0]["NOMREGION"])
                        return [region.CODEREGION,
                       
                        region.CODEPAYS[0]["NOMPAYS"],
                        region.NOMREGION
                        ]
                    })
                    tab.data = nouveauTableauRegion;

                    tab.generer();
                })
                .catch(function (error) {
                    alert("Ajax error: " + error);
                });

            document
                .getElementById("btnAjout_enreg")
                .addEventListener("click", enregAjoutRegion, false);
        }

//COMBO DES REGIONS
        function afficherComboRegion(selectTagId) {   
            let requestOptions = {
                 method: "GET",
                redirect: "follow",
            };

            fetch(urlApiRegion, requestOptions)
            .then((response) => response.json())
            .then(function (data) {
                 const comboRegion = document.getElementById(selectTagId);

                data.PAYS.records.forEach((region) => {
                    const code_option_generated_region = document.createElement("option");
                    code_option_generated_region.value = region[0];
                    code_option_generated_region.innerText = region[1];
                    comboRegion.appendChild(code_option_generated_region);
                });
          });
        };
        


        //	PROGRAMME PRINCIPAL                  


        window.addEventListener("load", (event) => {
            afficherTableau();
            search("txtRech", "tliste");

            const boutonModif = document.getElementsByClassName("mod_region");
            for (let i = 0; i < boutonModif.length; i++) {
                boutonModif[i].addEventListener("click", modifRegion);
            }

            afficherComboRegion("comboPaysAjout");
            afficherComboRegion("comboPaysModif");


        });
   