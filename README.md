# Diaporama

## Code HTML

      <header>
            <h1>Diaporama</h1>
            <label for="ajout"><h4>Ajouter une photo :  </h4></label>
            <input type="file" id="ajout" name="ajout" accept=".png,.jpg"/>
            <button name="ajouter">Ajouter</button> 
        </header>
        
Nous créons le `header` avec le titre, un `input type="file"` qui va nous ouvrir l'explorateur de fichiers auquel nous ajoutons l'attribut `accept` pour n'accepter que les formats images, et enfin, un `button`, qui, au clic, enregistrera les fichiers dans un tableau avec le script JS.

      <figure>
        <img src="" alt="photo"/>
        <figcaption></figcaption>
      </figure>
      
Dans une première `div`, nous ajoutons l'élément `figure`, au sein duquel nous incluons, un `img` et `figcaption` pour la légende, ceux-ci n'auront pas de valeurs, celles-ci seront ajoutées en JS.

      <div>
        <button class="precedent diapobtn" title="Précédent"> ⟨ </button>
        <button class="play-pause diapobtn" title="Play/Pause"> &#9205 </button>
        <button class="suivant diapobtn" title="Suivant"> ⟩ </button>
      </div>
      
Enfin, nous ajoutons une seconde `div` dans laquelle nous incluons trois `button` pour les flèches précédent et suivant, et un bouton Play/Pause qui alternera au clic selon le mode voulu.
 
 ## Code CSS
 
      #diaporama{
    position: relative;
    overflow: hidden;
    }
      .diapobtn {
    position: absolute;
    top: 50%;
    background-color: #000;
    border-radius: 10px;
    color: #FFF;
    width:100px;
    opacity:0.2;
    }
 
 L'id `#diaporama` est placé en position `relative` afin de pouvoir placer les boutons placés en position `absolute` plus facilement
 
    .elements{
    display: flex;
    }
 
 On utilise la flexbox pour changer l'axe des boutons fléchés
    
    .element{
    flex: 1 0 100%;
    }
  
La propriété flex-shrink est fixé à 0 pour que la taille des images ne soit pas rétrécie même si la taille de l'élément conteneur est inférieur à l'ensemble des images

## Code JS

    "use strict";
 
 On met le fichier en mode strict pour mieux relever des erreurs à l'exécution en lançant des exceptions, notamment sur les this.
 
     constructor(diapoId,images,textes){
        this.diapoId = diapoId;
        this.images = images;
        this.textes = textes;
        
On initialise les objets en créant l'ID du diaporama, les images et les légendes qui seront les arguments 

    this.diapo = document.getElementById(this.diapoId);
    this.image = this.diapo.querySelector("img");
    this.texte = this.diapo.querySelector("figcaption");

    this.prev = this.diapo.querySelector("div .precedent");
    this.auto = this.diapo.querySelector("div .play-pause");
    this.next = this.diapo.querySelector("div .suivant");
 
 On accède au diaporama, aux éléments `img`, `figcaption` et aux boutons
 
    this.imgIndex = 0;
    this.image.src = this.images[this.imgIndex];
    this.texte.textContent = this.textes[this.imgIndex];
    
Initialisation de l'image et du texte

    this.prev.addEventListener("click",() => this.prevImage());
    this.auto.addEventListener("click",() => this.playPause());
    this.next.addEventListener("click",() => this.nextImage());
    
On écoute des événements des boutons fléchés et auto

    this.btn = document.querySelector("header button");
    this.btn.addEventListener("click",()=>this.getValue());
    
On accède et écoutons le bouton Ajouter qui renverra la fonction getValue()

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
    
Première fonction pour afficher l'image précédente

    nextImage(){
    this.next.blur();
    this.imgIndex ++;
    if (this.imgIndex > (this.images.length -1)){
      this.imgIndex = 0;
    }
    this.image.src = this.images[this.imgIndex];
    this.texte.textContent = this.textes[this.imgIndex];
    }
    
Seconde fonction pour afficher l'image suivante

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
      On aurait aussi pu utiliser la fonction fléchée: setInterval(() => this.nextImage(),1500) qui permet d'accéder directement au       contexte de la fonction appelée */
      this.auto.innerHTML = "&#9208"; //bouton Pause
      
On active la fonction Play/Pause

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
    
Enfin, la fonction pour ajouter des fichiers. La difficulté est que le navigateur Chrome, pour des raisons de securité, préfixe un fakepath. Du coup, on utilise la méthode `replace()` pour remplacer cela par le préfixe correspondant.
    
    var diapo =new Diaporama(
    "diaporama",
    ["photos/photo1.jpg","photos/photo2.jpg","photos/photo3.jpg"],
    ["photo1","photo2","photo3"]
    );
    
Enfin, on instancie la classe qui prend pour arguments l'id du diaporama, le tableau des images,et le tableau des légendes, où viendront s'implémenter les fichiers que l'on rajoutera.
    
    
    
    
    
    
