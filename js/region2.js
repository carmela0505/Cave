

        //	LES FONCTIONS


        function vueRegion(e) {
            // La fonction vueRegion est déclenchée lorsqu'un événement de saisie est déclenché
            // sur un élément cible. "e" est l'objet d'événement qui a déclenché la fonction.
            let valeurs = e.target.value.split("*");
            // La valeur de l'élément cible est divisée en un tableau en utilisant "*" comme séparateur.
            // Les valeurs sont stockées dans la variable "valeurs".

            document.getElementById("txtcode_vue").value = valeurs[0];// La valeur du premier élément du tableau "valeurs" est affectée à l'élément avec l'ID "txtcode_vue".
            document.getElementById("txtcodepays_vue").value = valeurs[2];
            document.getElementById("txtregion_vue").value = valeurs[3];

        }

        function supprRegion(event) {
            // Check if the clicked element contains the "suppr_region" class
            if (event.target.classList.contains("suppr_region")) {
                // Ask for confirmation before proceeding with deletion
                if (confirm('Voulez-vous supprimer cette région ?')) {
                    // Find the closest table row (tr) to the clicked button
                    let row = event.target.closest("tr");
                    // Extract the content of the first child node (assuming it contains the "code" information)
                    let code = row.childNodes[0].textContent;
                    
                    const sound = new  Audio("https://www.soundjay.com/misc/sounds/small-bell-ring-01a.mp3");  
            
                    sound.play();                            
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
        //MODAL CREATE
        function enregAjoutRegion() {

            alert("Ajout enregistrer");
            //adds JS object with properties codepays and nomregion extracted from the page
            let nouvelleLigne = {
                CODEPAYS: document.getElementById("comboPaysAjout").value,
                NOMREGION: document.getElementById("txtregion_Ajout").value,
            };
           //sets up requestoptions for making a post request with JSON data
            let requestOptionsAdd = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(nouvelleLigne),
            };
            //uses fetch API to send the Post request to urlApiRegion and after a successful response, reloads the page
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
                //function keyup is triggered when the user releases a key in the input field
                    // alert("rech " + zoneRecherche.value);
                    //whenever th user types in the input field, it hides table rows that do not contain the search text and shows those that match
                    let rows = document.getElementById(table).getElementsByTagName("tr");
                    //retrieves the DOM element of the table using its Id
                    //retrieves all tr elements within the table
                    for (let item of rows) {
                        //loop iterates over each "tr"element (table row)
                        if (!item.innerText.includes(zoneRecherche.value)) {
                            //checks whether the search value entered is not found within the text content
                            //refers to the value of the input field where the user types their search query
                            item.classList.add("visually-hidden");
                        //     //adds the css class 'visually hidden' to the item to hide it visually
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
            //function is called when modify button is clicked. Elle attache un écouteur d'evenement au bouton Enregister
            let row = event.target.closest("tr"); // j'utilise "event" pour recuperer la ligne (tr) la plus proche du bouton où j'ai cliqué.

            let codepays = document.getElementById("comboPaysModif");
            let region = document.getElementById("txtregion_modif");
 

            let code = row.childNodes[0].textContent;

            codepays.value = row.childNodes[1].textContent;
           
            region.value = row.childNodes[3].textContent;


            /*
            0 code du vin
            1 code pays(cache)
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

            // //  BS 5  
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

     //Cette partie récupère des données depuis une API en utilisant une requête GET avec des paramètres spécifiques. Les données récupérées sont transformées et utilisées pour générer le tableau.
            let requestOptions = {
                method: "GET",
                redirect: "follow",
            };

            fetch(urlApiRegion + "?include=PAYS&transform=1", requestOptions)
                .then((response) => response.json())
                .then(function (data) {

                    let nouveauTableauRegion = data.REGION.map(region => {
                        // console.log(region.CODEPAYS[0]["NOMPAYS"])
                        // [] crochets (squared brackets)
                        // {} accollades (brackets)
                        return [
                            region.CODEREGION,
                            region.CODEPAYS,
                            region.PAYS[0]['NOMPAYS'],
                            region.NOMREGION,
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

//COMBO DES REGIONS READ
        /**
         * Ici le "selectTagId" représente l'id de la balise select dans laquelle on insère les options
         */
        //cette function recupere des donneés depuis une API et les utilise pour remplir une liste deroulante
        function afficherComboPays(selectTagId) {   
            let requestOptions = {
                 method: "GET",
                redirect: "follow",
            };

            fetch(urlApiPays, requestOptions)
            .then((response) => response.json())
            .then(function (data) {
                 const comboPays = document.getElementById(selectTagId);

                data.PAYS.records.forEach((pays) => {
                    const code_option_generated_pays = document.createElement("option"); //<option>
                    code_option_generated_pays.value = pays[0];
                    code_option_generated_pays.innerText = pays[1];
                    comboPays.appendChild(code_option_generated_pays);
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

            afficherComboPays("comboPaysAjout");
            afficherComboPays("comboPaysModif");


        });
   

        // catch => function(error)
        // 1er then => function (response)
        // 2nd then => function (data)
        // Toute fonction à l'intérieur d'un addEventListener peut prendre 1 paramètre (pas obligatoire) => function(event)
        // Dans les fonctions personnelles, lorsque l'on cherche à rendre variable une valeur, on la place en paramètre avec un nommage parlant