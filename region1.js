

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

            // let table = document.getElementById('table_id')
            // table.addEventListener("click", function (event) {
                // console.log(event)// ici je rend la table entière (générée au préalable of course) sensible au click
                if (event.target.classList.contains("delete")) { // je track les click sur les boutons suppr en utilisant l'event
                    if (confirm('Voulez-vous supprimer cette region ?')) {
                    let row = event.target.closest("tr"); // puis je cherche la ligne la plus proche du bouton où j'ai cliqué (bouton suppr)
                    let code = row.childNodes[0].textContent;
                    // Le contenu textuel du premier enfant de la ligne est stocké dans la variable "code".

                    row.remove();

                    let requestOptionsDelete = {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    };

                    fetch(urlApiRegion + "/" + code, requestOptionsDelete)
                        .then((response) => response.json())
                        .then(function () { })
                        .catch(function (error) {
                            alert("Ajax error: " + error);
                        });
                }
            };
        }
        function enregAjoutRegion() {
            alert("Ajout enregistrer");

            let nouvelleLigne = {
                CODEPAYS: document.getElementById("txtcodepays_ajout").value,
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
            zoneRecherche.addEventListener(
                "keyup",
                () => {
                    // alert("rech " + zoneRecherche.value);
                    let rows = document
                        .getElementById(table)
                        .getElementsByTagName("tr");
                    for (item of rows) {
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

        function modifRegion(event) {
            let row = event.target.closest("tr"); // j'utilise "event" pour recuperer la ligne (tr) la plus proche du bouton où j'ai cliqué.

            let codepays = document.getElementById("txtcodepays_modif");
            let region = document.getElementById("txtregion_modif");


            let code = row.childNodes[0].textContent;

            codepays.value = row.childNodes[1].textContent;
            region.value = row.childNodes[2].textContent;

            function enregistrerModif() {
                let ligneModifiee = {
                    CODEPAYS: document.getElementById("txtcodepays_modif").value,
                    NOMREGION: document.getElementById("txtregion_modif").value,
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
            alert("Affiche TABLEAU");
            const table = document.getElementById('table_id');

            let requestOptions = {
                method: "GET",
                redirect: "follow",
            };

            fetch(urlApiRegion + "?include=PAYS&transform=1", requestOptions)
                .then((response) => response.json())
                .then(function (data) {

                    data.REGION.map(function (regionElement) {
                        let tr = document.createElement("tr");
                        tr.setAttribute('class', 'data');
                        let codeRegionTd = document.createElement("td");
                        codeRegionTd.textContent = regionElement.CODEREGION;

                        let paysTd = document.createElement("td");
                        if (regionElement.PAYS.length <= 0) {
                            paysTd.textContent = "aucun pays trouvé......";
                        } else {
                            paysTd.textContent = regionElement.PAYS[0].NOMPAYS;
                        }
                        // je fais PAYS[0] parce que chaque élément de région contient un "PAYS" qui lui meme contient
                        // un seul tableau donc je vise ce seul et unique tableau à l'index donc 0 pour ensuite recuperer la value de NOMPAYS

                        let regionTd = document.createElement("td");
                        regionTd.textContent = regionElement.NOMREGION;
                        let actionsTd = document.createElement("td");
                        actionsTd.innerHTML = `
            <button class="modif btn btn-info btn-sm fas fa-pencil-alt fa-sm"></button>
            <button class="delete btn btn-danger btn-sm fas fa-trash-alt fa-sm"></button>
            <button class="view btn btn-success btn-sm fas fa-eye fa-sm" ></button>

          `;

                        tr.appendChild(codeRegionTd);
                        tr.appendChild(paysTd);
                        tr.appendChild(regionTd);
                        tr.appendChild(actionsTd);
                        table.appendChild(tr);

                    });
                    supprRegion()
                    vueRegion()
                    modifRegion()

                })
                .catch(function (error) {
                    console.log(
                        "Une erreur s'est produite lors de la récupération des données :",
                        error
                    );
                });

            document
                .getElementById("btnAjout_enreg")
                .addEventListener("click", enregAjoutRegion, false);
        }


        //	PROGRAMME PRINCIPAL                  


        window.addEventListener("load", (event) => {
            afficherTableau();
            search("txtRech", "tliste");

            const boutonModif = document.getElementsByClassName("mod_region");
            for (let i = 0; i < boutonModif.length; i++) {
                boutonModif[i].addEventListener("click", modifRegion);
            }
        });
