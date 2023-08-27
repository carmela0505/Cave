

        //	LES FONCTIONS


        function vuePays(e) {

            let valeurs = e.target.value.split("*");

            document.getElementById("txtcode_vue").value = valeurs[0];
            document.getElementById("txtpays_vue").value = valeurs[1];

        }

        function supprPays(event) {
           
                if (event.target.classList.contains("suppr_pays")) { // je track les click sur les boutons suppr en utilisant l'event
                    if (confirm('Voulez-vous supprimer ce pays ?')) {
                        // Si la classe "suppr_vin" est présente dans la liste des classes de l'élément cible de l'événement...  
                        let row = event.target.closest("tr");

                        let code = row.childNodes[0].textContent;

                        const sound = new  Audio("https://www.soundjay.com/misc/sounds/small-bell-ring-01a.mp3");  
            
                        sound.play();

                        row.remove();
                        // La ligne "row" est supprimée de la table.

                        let requestOptionsDelete = {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        };

                        fetch(urlApiPays + "/" + code, requestOptionsDelete)
                            .then((response) => response.json())
                            .then(function () { })
                            .catch(function (error) {
                                alert("Ajax error: " + error);
                                // Une requête de suppimgion est envoyée à l'URL spécifiée avec le code en tant que paramètre.
                            });
                    }
                    
                }
        }


        function enregAjoutPays() {
            alert("Ajout enregistrer");

            let nouvelleLigne = {
                NOMPAYS: document.getElementById("txtpays_ajout").value,

            };

            let requestOptionsAdd = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(nouvelleLigne),
            };

            fetch(urlApiPays, requestOptionsAdd)
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
            zoneRecherche.addEventListener(
                "keyup",
                () => {
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

        function modifPays(event) {
            let row = event.target.closest("tr"); // j'utilise "event" pour recuperer la ligne (tr) la plus proche du bouton où j'ai cliqué.

            let pays = document.getElementById("txtpays_modif");

            let code = row.childNodes[0].textContent;

            pays.value = row.childNodes[1].textContent;


            function enregistrerModif() {
                let ligneModifiee = {
                    NOMPAYS: pays.value,
                };

                let requestOptionsModif = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(ligneModifiee),
                };

                fetch(urlApiPays + "/" + code, requestOptionsModif)
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

        const boutonModif = document.getElementsByClassName("mod_pays");

        // Ajouter l'événement click à chaque élément de la collection
        for (let i = 0; i < boutonModif.length; i++) {
            boutonModif[i].addEventListener("click", modifPays, false);
        }

        function afficherTableau() {
            // alert("Affiche TABLEAU");
            const tab = new Table();

            tab.id_zone = "zoneTable";
            tab.class_table = "table table-warning table-warning";
            // Version avec 2 colonnes
            tab.header = ["Code Pays", "Pays"];

            tab.class_modif = "mod_pays";
            tab.class_suppr = "suppr_pays";
            tab.class_vue = "vue_pays";

            //  BS 5  
            tab.icone_vue = "bi bi-eye";
            tab.icone_modif = "bi bi-pencil";
            tab.icone_suppr = "bi bi-trash3";

            // Les méthodes
            tab.fonction_modif = modifPays;
            tab.fonction_suppr = supprPays;
            tab.fonction_vue = vuePays;

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

            fetch(urlApiPays, requestOptions)
                .then((response) => response.json())
                .then(function (data) {
                    tab.data = data.PAYS.records;
                    tab.generer();
                })
                .catch(function (error) {
                    alert("Ajax error: " + error);
                });

            document
                .getElementById("btnAjout_enreg")
                .addEventListener("click", enregAjoutPays, false);
        }


        //	PROGRAMME PRINCIPAL                  


        window.addEventListener("load", (event) => {
            afficherTableau();
            search("txtRech", "tliste");

            const boutonModif = document.getElementsByClassName("mod_pays");
            for (let i = 0; i < boutonModif.length; i++) {
                boutonModif[i].addEventListener("click", modifPays);
            }
        });
 