"use strict";
class Diaporama{
  // On initialise la classe avec l'ID du diaporama, les images et les titres qui seront les arguments
  constructor(diapoId,images,textes){
    this.diapoId = diapoId;
    this.images = images;
    this.textes = textes;
    // On accède au diaporama, et aux éléments img et figcaption
    this.diapo = document.getElementById(this.diapoId);
    this.image = this.diapo.querySelector("img");
    this.texte = this.diapo.querySelector("figcaption");

    this.prev = this.diapo.querySelector("div .precedent");
    this.auto = this.diapo.querySelector("div .play-pause");
    this.next = this.diapo.querySelector("div .suivant");

    //Initialisation de l'image et texte
    this.imgIndex = 0;
    this.image.src = this.images[this.imgIndex];
    this.texte.textContent = this.textes[this.imgIndex];

    //On écoute les événements des boutons fléchés et auto
    this.prev.addEventListener("click",() => this.prevImage());
    this.auto.addEventListener("click",() => this.playPause());
    this.next.addEventListener("click",() => this.nextImage());
  
    // On accède et écoute le bouton Ajouter
    this.btn = document.querySelector("header button");
    this.btn.addEventListener("click",()=>this.getValue());
    this.playPause();
  }
  // Première fonction pour afficher l'image précédente
  prevImage(){
    // On supprime le focus en retirant le contour bleu autour des boutons au clic
    this.prev.blur();
    this.imgIndex --;
    if (this.imgIndex < 0){
      this.imgIndex = this.images.length -1;
    }
    this.image.src = this.images[this.imgIndex];
    this.texte.textContent = this.textes[this.imgIndex];
  }
  // Seconde fonction pour afficher l'image suivante
  nextImage(){
    this.next.blur();
    this.imgIndex ++;
    if (this.imgIndex > (this.images.length -1)){
      this.imgIndex = 0;
    }
    this.image.src = this.images[this.imgIndex];
    this.texte.textContent = this.textes[this.imgIndex];
  }
  // Troisième fonction pour automatiser le défilement des images
  playPause(){
    this.auto.blur();
    if(this.timer){
      clearInterval(this.timer);
      this.timer = null;
      this.auto.innerHTML = "&#9205"; //bouton Play
    } else {
      this.timer = setInterval(this.nextImage.bind(this),1500);
      /* On utilise la méthode bind()pour accéder au this de la fonction nextImage()
      chaque fonction définissant son propre this
      On aurait aussi pu utiliser la fonction fléchée: setInterval(() => this.nextImage(),1500) qui permet d'accéder directement au contexte de la fonction appelée */
      this.auto.innerHTML = "&#9208"; //bouton Pause
  }
}
  // Quatrième fonction pour l'ajout de fichiers
  getValue(){
    let fakepath = "C:\\fakepath\\",
    file = document.getElementById("ajout").value,
    fileName = file.replace(fakepath,"photos/"),
    fileText = file.replace(fakepath,"");
    this.images.push(fileName);
    this.textes.push(fileText);
    console.log(this.images);
    console.log(this.textes);
  }

}
// On instancie la classe en créant l'objet diapo
var diapo =new Diaporama(
  "diaporama",
  ["photos/photo1.jpg","photos/photo2.jpg","photos/photo3.jpg"],
  ["photo1","photo2","photo3"]
);