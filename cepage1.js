

        //	LES FONCTIONS


        function vueCepage(e) {
            // La fonction vueCepage est déclenchée lorsqu'un événement de saisie est déclenché
            // sur un élément cible. "e" est l'objet d'événement qui a déclenché la fonction.
            let valeurs = e.target.value.split("*");
            // La valeur de l'élément cible est divisée en un tableau en utilisant "*" comme séparateur.
            // Les valeurs sont stockées dans la variable "valeurs".
            document.getElementById("txtcode_vue").value = valeurs[0];
            // La valeur du premier élément du tableau "valeurs" est affectée à l'élément avec l'ID "txtcode_vue".

            document.getElementById("txtcepage_vue").value = valeurs[1];
            // document.getElementById("txtcepage_vue").value = valeurs[2];
            // document.getElementById("txtemail_vue").value = valeurs[3];
        }


        function supprCepage() {
            // La fonction supprCepage est définie ici.

            const tableBody = document.getElementById("tliste");
            // L'élément avec l'ID "tliste" est stocké dans la variable "tableBody".
            tableBody.addEventListener("click", function (event) { // ici je rend la table entière (générée au préalable of course) sensible au click
                // Un écouteur d'événements click est ajouté à "tableBody". La fonction suivante est exécutée lorsque
                // l'événement click est déclenché sur l'élément.            
                if (event.target.classList.contains("suppr_cepage")) { // je track les click sur les boutons suppr en utilisant l'event
                    if (confirm('Voulez-vous supprimer ce vin ?')) {
                    // Si la classe "suppr_cepage" est présente dans la liste des classes de l'élément cible de l'événement...  
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

                    fetch(urlApiCepage + "/" + code, requestOptionsDelete)
                        .then((response) => response.json())
                        .then(function () { })
                        .catch(function (error) {
                            alert("Ajax error: " + error);
                            // Une requête de suppression est envoyée à l'URL spécifiée avec le code en tant que paramètre.
                        });
                }
            }
            });
        }
        function enregAjoutCepage() {
            alert("Ajout enregistrer");
            // La fonction enregAjoutCepage est définie ici.
            let nouvelleLigne = {
                NOMCEPAGE: document.getElementById("txtcepage_ajout").value,
                // Un nouvel objet "nouvelleLigne" est créé avec une propriété "NOMCEPAGE" ayant la valeur de l'élément avec l'ID "txtcepage_ajout".

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

            fetch(urlApiCepage, requestOptionsAdd)
                .then((response) => response.json())
                .then(function (data) {
                    location.reload();
                })
                .catch(function (error) {
                    alert("Ajax error: " + error);
                });
            // Une requête POST est envoyée à l'URL spécifiée avec les options définies.
            // La page est ensuite rechargée.


            afficherTableau();
            // La fonction afficherTableau() est appelée.
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

        function modifCepage(event) {
            let row = event.target.closest("tr"); // j'utilise "event" pour recuperer la ligne (tr) la plus proche du bouton où j'ai cliqué.
            // La ligne la plus proche de l'élément cible de l'événement est stockée dans la variable "row".
            let cepage = document.getElementById("txtcepage_modif");
            // L'élément avec l'ID "txtcepage_modif" est stocké dans la variable "cepage".
            let code = row.childNodes[0].textContent;
            // Le contenu textuel du premier enfant de la ligne est stocké dans la variable "code".
            cepage.value = row.childNodes[1].textContent;
            // Le contenu textuel du deuxième enfant de la ligne est affecté à la valeur de "cepage".

            function enregistrerModif() {
                // La fonction enregistrerModif est définie ici.
                let ligneModifiee = {
                    NOMCEPAGE: cepage.value,
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

                fetch(urlApiCepage + "/" + code, requestOptionsModif)
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
        // Un écouteur d'événements click est ajouté à l'élément avec l'ID "btnModif_enreg".
        // Lorsque le bouton est cliqué, la fonction enregistrerModif est appelée.

        const boutonModif = document.getElementsByClassName("mod_cepage");
        // Les éléments avec la classe "mod_cepage" sont stockés dans la variable "boutonModif".
        // Ajouter l'événement click à chaque élément de la collection
        for (let i = 0; i < boutonModif.length; i++) {
            boutonModif[i].addEventListener("click", modifCepage, false);
        }

        function afficherTableau() {
            // La fonction afficherTableau est définie ici.
            const tab = new Table();
            // Une nouvelle instance de la classe Table est créée et stockée dans la variable "tab".

            tab.id_zone = "zoneTable";
            tab.class_table = "table table-warning table-warning";
            // Les propriétés "id_zone" et "class_table" de l'objet "tab" sont définies avec les valeurs spécifiées.
            // Version avec 2 colonnes
            tab.header = ["Code Cépage", "Cépage"];
            // La propriété "header" de l'objet "tab" est définie avec un tableau contenant les en-têtes de colonnes.
            tab.class_modif = "mod_cepage";
            tab.class_suppr = "suppr_cepage";
            tab.class_vue = "vue_cepage";
            // Les propriétés "class_modif", "class_suppr" et "class_vue" de l'objet "tab" sont définies avec les classes spécifiées.

            //  BS 5  
            tab.icone_vue = "bi bi-eye";
            tab.icone_modif = "bi bi-pencil";
            tab.icone_suppr = "bi bi-trash3";
            // Les propriétés "icone_vue", "icone_modif" et "icone_suppr" de l'objet "tab" sont définies avec les icônes spécifiées.

            // Les méthodes
            tab.fonction_modif = modifCepage;
            tab.fonction_suppr = supprCepage;
            tab.fonction_vue = vueCepage;
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
            fetch(urlApiCepage, requestOptions)
                .then((response) => response.json())
                .then(function (data) {
                    tab.data = data.CEPAGE.records;
                    tab.generer();
                })
                .catch(function (error) {
                    alert("Ajax error: " + error);
                });
            // Une requête GET est envoyée à l'URL spécifiée avec les options définies.
            // La réponse de la requête est convertie en JSON, puis une fonction est exécutée avec les données JSON.
            // La propriété "data" de l'objet "tab" est définie avec les enregistrements du JSON, puis la méthode "generer()" de l'objet "tab" est appelée.
            // Si une erreur se produit, une alerte est affichée avec le message d'erreur.


            document
                .getElementById("btnAjout_enreg")
                .addEventListener("click", enregAjoutCepage, false);
        }
        // Un écouteur d'événements click est ajouté à l'élément avec l'ID "btnAjout_enreg".
        // Lorsque le bouton est cliqué, la fonction enregAjoutCepage est appelée.

        //	PROGRAMME PRINCIPAL                  


        window.addEventListener("load", (event) => {
            // Un écouteur d'événements load est ajouté à la fenêtre.
            // Lorsque la page est entièrement chargée, la fonction suivante est exécutée.
            afficherTableau();
            // La fonction afficherTableau est appelée pour afficher le tableau.

            search("txtRech", "tliste");
            // La fonction search est appelée avec les paramètres "txtRech" et "tliste".
            // Cela active la fonctionnalité de recherche sur la table spécifiée.

            const boutonModif = document.getElementsByClassName("mod_cepage");
            // Les éléments avec la classe "mod_cepage" sont stockés dans la variable "boutonModif".
            for (let i = 0; i < boutonModif.length; i++) {
                boutonModif[i].addEventListener("click", modifCepage);
                // Un écouteur d'événements click est ajouté à chaque élément dans la collection "boutonModif".
                // Lorsque l'un des boutons est cliqué, la fonction modifCepage est appelée.
            }
        });
        // Fin de l'écouteur d'événements load.
// Cette partie du code garantit que les actions nécessaires sont effectuées lorsque la page est entièrement chargée.
 