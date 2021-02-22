/* @preserve
 * fonctions développées spécifiquement pour le géo RETIF (à adapter pour les autres projets)
 * Federico Nurra, service numérique de la recherche (SNR), Département des études et de la recherche (DER) - INHA
*/

// filtrer par auteur
function newFilterAuteur() {
// Declarer les variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("monFiltreAuteur");
  filter = input.value.toUpperCase();
  table = document.getElementById("liste");
  tr = table.getElementsByTagName("tr");
// Chercher parmi les lignes de la table et cacher celles qui ne collent pas avec la recherche
  for (i = 0; i < tr.length; i++) {
// préciser la position de la colonne à filtrer [n]
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
// si ça colle, montrer les resultats
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
// si non, ne montrer pas les resultats
      tr[i].style.display = "none";
      }
    }
  }
}

// filtrer par titre
function newFilterTitre() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("monFiltreTitre");
  filter = input.value.toUpperCase();
  table = document.getElementById("liste");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

// filtrer par siècle : fonction en jquery avec l'utilisation des checkbox
$(function() {
  $('input.time[type="checkbox"]').change(function() {
    // vérifier si un ou plusieurs checkbox ont été choisis
    // et le cas échéant appliquer le filtre
    if($('input.time[type="checkbox"]:checked').length > 0) {
      // prendre les valeurs des checkbox
      var vals = $('input.time[type="checkbox"]:checked').map(function() {
        return this.value;
      }).get();
      // Cette partie fait deux choses :
      // 1. tout cacher
      // 2. filtrer et montrer les resultats qui collent avec les checkbox sélectionnés, dans la quatrième colonne <td> ('td:eq(n+1)')
      $('tr.rowSidebar')
      .hide()    // 1
      .filter(function() {    // 2
        return vals.indexOf($(this).find('td:eq(3)').text()) > -1;
      }).show();
    } else {
      // tout montrer
      $('tr.rowSidebar').show();
    }
  });
});

// function pour "uncheck" tous les checkbox
function uncheckAll() {
    document.getElementById("c13").checked = false;
    document.getElementById("c14").checked = false;
    document.getElementById("c15").checked = false;
    document.getElementById("c16").checked = false;
    document.getElementById("c17").checked = false;
    document.getElementById("c18").checked = false;
    document.getElementById("c19").checked = false;
    document.getElementById("c20").checked = false;
    document.getElementById("cInconnu").checked = false;
}

// compter les oeuvres dans la liste (les lignes de la table)
function rowCounter() {
    var rowCount = document.getElementById('liste').rows.length;
    document.getElementById("counter").innerHTML = rowCount;
// pour mettre à jour en temps réel, j'ai ajouté un timeout
    setTimeout(rowCounter, 500);
}

// changements de vue de la sidebar :
// montrer les filtres
function montrerFiltres() {
    document.getElementById("filterGroup").style.display = "block";
    document.getElementById("cacherFiltre").style.display = "inline";
}
// cacher les filtres
function cacherFiltres() {
    document.getElementById("filterGroup").style.display = "none";
    document.getElementById("cacherFiltre").style.display = "none";
}
// montrer les checkbox des siècles
function montrerFiltresSiecles() {
    document.getElementById("monFiltreSiecle").style.display = "block";
    document.getElementById("cacherFiltreSiecles").style.display = "inline";
}
// cacher les checkbox des siècles
function cacherFiltresSiecles() {
    document.getElementById("monFiltreSiecle").style.display = "none";
    document.getElementById("cacherFiltreSiecles").style.display = "none";
}
// ouverture automatique de la sidebar (page #home / accueil)
function ouverturePage() {
    document.getElementById("sidebar").className = "sidebar sidebar-right leaflet-touch";
    document.getElementById("activable").className = "active";
    document.getElementById("home").className = "sidebar-pane active";
}
// autres trucs divers et variés
function somethingHappens() {
    document.getElementById("someone").style.display = "inline";
}
function somethingHappensRemove() {
    document.getElementById("someone").style.display = "none";
}
// ouverture automatique de la liste des oeuvres
function ouvertureOeuvres() {
    document.getElementById("sidebar").className = "sidebar sidebar-right leaflet-touch";
    document.getElementById("activableZoom").className = "active";
    document.getElementById("oeuvres").className = "sidebar-pane active";
    $("#home").removeClass("active");
    $("#activable").removeClass("active");
    $("#tutorial").removeClass("active");
    $("#activableTutorial").removeClass("active");
    $("#info").removeClass("active");
    $("#activableInfo").removeClass("active");
    $("#webapp").removeClass("active");
    $("#activableWebapp").removeClass("active");
    $("#contacts").removeClass("active");
    $("#activableContacts").removeClass("active");
    $("#credits").removeClass("active");
    $("#activableCredits").removeClass("active");
}

// fonction pour cacher l'information initiale sur petits écrans
function hideMessage() {
    document.getElementById('commencer').style.display = "none";
    $(".leaflet-control-layers").removeClass("leaflet-control-layers-expanded");
}

// montrer / cacher les couches actives
function montrerCouches() {
    if($(".leaflet-control-layers").hasClass('leaflet-control-layers-expanded')) {
        $(".leaflet-control-layers").removeClass("leaflet-control-layers-expanded")
    }
    else {
    $(".leaflet-control-layers").addClass("leaflet-control-layers-expanded")
}
}

// fonctions de changement de vue selon le niveau de zoom et la dimension de l'écran (il faut essayer de les réduire...)
function changeViewAllDesktop() {
    document.getElementById('listeInformation').style.display = "none";
    document.getElementById('montrerFiltre').style.display = "inline";
    document.getElementById('filtreDescription').style.display = "block";
    document.getElementById('filtreDescriptionSiecle').style.display = "inline";
    document.getElementById('filtreAuteur').style.display = "block";
    document.getElementById('monFiltreTitre').style.display = "block";
    document.getElementById('monFiltreAuteur').style.display = "block";
    document.getElementById('monFiltreSiecle').style.display = "none";
    document.getElementById('tableListe').style.display = "block";
    document.getElementById('counterText').style.display = "inline";
    document.getElementById('teteDesktop').style.visibility = "visible";
    document.getElementById('teteImage').style.visibility = "visible";
    document.getElementById('teteAuteur').style.visibility = "visible";
    document.getElementById('teteTitre').style.visibility = "visible";
    document.getElementById('teteSiecle').style.visibility = "visible";
    document.getElementById('teteLieu').style.visibility = "visible";
    document.getElementById('teteLien').style.visibility = "visible";
    document.getElementById('petitEcran').style.display = "none";
    document.getElementById('cacherFiltreSiecles').style.display = "none";
}

function changeViewAllMobile() {
    document.getElementById('listeInformation').style.display = "none";
    document.getElementById('montrerFiltre').style.display = "none";
    document.getElementById('filtreDescription').style.display = "none";
    document.getElementById('filtreDescriptionSiecle').style.display = "none";
    document.getElementById('filtreAuteur').style.display = "none";
    document.getElementById('monFiltreTitre').style.display = "none";
    document.getElementById('monFiltreAuteur').style.display = "none";
    document.getElementById('monFiltreSiecle').style.display = "none";
    document.getElementById('petitEcran').style.display = "block";
    document.getElementById('counterText').style.display = "none";
    document.getElementById('teteDesktop').style.visibility = "hidden";
    document.getElementById('teteImage').style.visibility = "hidden";
    document.getElementById('teteAuteur').style.visibility = "hidden";
    document.getElementById('teteTitre').style.visibility = "hidden";
    document.getElementById('teteSiecle').style.visibility = "hidden";
    document.getElementById('teteLieu').style.visibility = "hidden";
    document.getElementById('teteLien').style.visibility = "hidden";
    document.getElementById('tableListe').style.display = "none";
    document.getElementById('cacherFiltreSiecles').style.display = "none";
    document.getElementById('cacherFiltre').style.display = "none";
}

function changeViewAllLittleZoomDesktop() {
    document.getElementById('listeInformation').style.display = "block";
    document.getElementById('filtreDescription').style.display = "none";
    document.getElementById('filtreDescriptionSiecle').style.display = "none";
    document.getElementById('filtreAuteur').style.display = "none";
    document.getElementById('monFiltreTitre').style.display = "none";
    document.getElementById('monFiltreSiecle').style.display = "none";
    document.getElementById('monFiltreAuteur').style.display = "none";
    document.getElementById('tableListe').style.display = "none";
    document.getElementById('counterText').style.display = "none";
    document.getElementById('montrerFiltre').style.display = "none";
    document.getElementById('cacherFiltre').style.display = "none";
    document.getElementById('cacherFiltreSiecles').style.display = "none";
    document.getElementById('teteDesktop').style.visibility = "hidden";
    document.getElementById('teteImage').style.visibility = "hidden";
    document.getElementById('teteAuteur').style.visibility = "hidden";
    document.getElementById('teteTitre').style.visibility = "hidden";
    document.getElementById('teteSiecle').style.visibility = "hidden";
    document.getElementById('teteLieu').style.visibility = "hidden";
    document.getElementById('teteLien').style.visibility = "hidden";
    document.getElementById('petitEcran').style.display = "none";
}

function changeViewAllLittleZoomMobile() {
    document.getElementById('listeInformation').style.display = "block";
    document.getElementById('montrerFiltre').style.display = "none";
    document.getElementById('filtreDescription').style.display = "none";
    document.getElementById('filtreDescriptionSiecle').style.display = "none";
    document.getElementById('filtreAuteur').style.display = "none";
    document.getElementById('monFiltreTitre').style.display = "none";
    document.getElementById('monFiltreAuteur').style.display = "none";
    document.getElementById('monFiltreSiecle').style.display = "none";
    document.getElementById('petitEcran').style.display = "none";
    document.getElementById('counterText').style.display = "none";
    document.getElementById('teteDesktop').style.visibility = "hidden";
    document.getElementById('teteImage').style.visibility = "hidden";
    document.getElementById('teteAuteur').style.visibility = "hidden";
    document.getElementById('teteTitre').style.visibility = "hidden";
    document.getElementById('teteSiecle').style.visibility = "hidden";
    document.getElementById('teteLieu').style.visibility = "hidden";
    document.getElementById('teteLien').style.visibility = "hidden";
    document.getElementById('tableListe').style.display = "none";
    document.getElementById('cacherFiltreSiecles').style.display = "none";
}

function changeViewFilteredDesktop() {
    document.getElementById('listeInformation').style.display = "none";
    document.getElementById('montrerFiltre').style.display = "inline";
    document.getElementById('filtreDescription').style.display = "block";
    document.getElementById('filtreAuteur').style.display = "block";
    document.getElementById('monFiltreTitre').style.display = "block";
    document.getElementById('monFiltreAuteur').style.display = "block";
    document.getElementById('tableListe').style.display = "block";
    document.getElementById('counterText').style.display = "inline";
    document.getElementById('teteDesktop').style.visibility = "visible";
    document.getElementById('teteImage').style.visibility = "visible";
    document.getElementById('teteAuteur').style.visibility = "visible";
    document.getElementById('teteTitre').style.visibility = "visible";
    document.getElementById('teteSiecle').style.visibility = "visible";
    document.getElementById('teteLieu').style.visibility = "visible";
    document.getElementById('teteLien').style.visibility = "visible";
    document.getElementById('filtreDescriptionSiecle').style.display = "none";
    document.getElementById('monFiltreSiecle').style.display = "none";
    document.getElementById('petitEcran').style.display = "none";
    document.getElementById('cacherFiltreSiecles').style.display = "none";
}

function changeViewFilteredMobile() {
    document.getElementById('listeInformation').style.display = "none";
    document.getElementById('montrerFiltre').style.display = "none";
    document.getElementById('filtreDescription').style.display = "none";
    document.getElementById('filtreDescriptionSiecle').style.display = "none";
    document.getElementById('filtreAuteur').style.display = "none";
    document.getElementById('monFiltreTitre').style.display = "none";
    document.getElementById('monFiltreAuteur').style.display = "none";
    document.getElementById('monFiltreSiecle').style.display = "none";
    document.getElementById('petitEcran').style.display = "block";
    document.getElementById('counterText').style.display = "none";
    document.getElementById('teteDesktop').style.visibility = "hidden";
    document.getElementById('teteImage').style.visibility = "hidden";
    document.getElementById('teteAuteur').style.visibility = "hidden";
    document.getElementById('teteTitre').style.visibility = "hidden";
    document.getElementById('teteSiecle').style.visibility = "hidden";
    document.getElementById('teteLieu').style.visibility = "hidden";
    document.getElementById('teteLien').style.visibility = "hidden";
    document.getElementById('tableListe').style.display = "none";
    document.getElementById('cacherFiltreSiecles').style.display = "none";
}