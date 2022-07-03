// Bowser
// Variables
var mario, bowser, mx, my, bx, by;
var monde, vie;
var i, flamme, mvfx, mvfy;
var epee, ex, ey, em;
var etage, saut, mouvement;
var antisaut, compte, restart, cheat, fin, noloop;
// Images de Mario
var mg1 = PreloadImage(readFile('Data/Mario gauche 01.png'));
var mg2 = PreloadImage(readFile('Data/Mario gauche 02.png'));
var md1 = PreloadImage(readFile('Data/Mario droite 01.png'));
var md2 = PreloadImage(readFile('Data/Mario droite 02.png'));
// Images de Bowser
var bd = PreloadImage(readFile('Data/Bowser droite.png'));
var bf = PreloadImage(readFile('Data/Bowser face.png'));
var br = PreloadImage(readFile('Data/Bowser retourner.png'));
// Images des flammes
var flamme = PreloadImage(readFile('Data/flamme.png'));
var flmx1;
var flmy1;
var flmx2;
var flmy2;
var monde;

// Image des Élements du décor
var Etage1 = PreloadImage(readFile('Data/Etage 01.png'));
var coeur = PreloadImage(readFile('Data/Coeur.png'));
var soucoupe = PreloadImage(readFile('Data/soucoupe.png'));

// Objets
var eh = PreloadImage(readFile('Data/epee haut.png'));
var eg = PreloadImage(readFile('Data/epee gauche.png'));
var ed = PreloadImage(readFile('Data/epee droite.png'));

// Sons
var Theme = ChargerSon(readFile('Data/the-evil-king-bowser-super-mario-world.mp3'));
var Mort = ChargerSon(readFile('Data/Super-Mario-Bros.wav'));

// Initialisation

var hitx = [];
var hity = [];
hitx[0] = 0;
hity[0] = 0;
var debut = [];
debut[0] = 0;
bowser = bd;
mario = md1;
mx = 20;
my = 540;
bx = 1060;
by = 30;
monde = 1;
vie = 3;
i = 0;
mvfx = 1;
mvfy = 1;
noloop = 0;
epee = eh;
ex = 400;
ey = 400;
em = 0;
etage = 0;
saut = 0;
mouvement = 0;
restart = 0;
antisaut = 0;
compte = 300;
cheat = 0;
fin = 0;
Loop(-1);
flmx1 = 1060;
flmy1 = 30;
flmx2 = 1070;
flmy2 = 35;

// Mise en dessin du jeu
function draw() {
  Initialiser();

  // Zone du jeu
  RectanglePlein(1, 1, 1355, 600, 'black');
  if (monde == 1) { // le monde commence à 1

    // Musique du jeu
    Theme.play(); // lance la musique

    // Vie
    if (vie >= 1) {
      DrawImageObject(coeur, 1310, 20, 20, 20); // Affiche le 1er coeur
      if (vie >= 2) {
        DrawImageObject(coeur, 1285, 20, 20, 20); // Affiche le 2ème coeur
        if (vie >= 3) {
          DrawImageObject(coeur, 1260, 20, 20, 20); // Affiche le 3ème coeur
        }
      }
    }

    // Image Bowser
    DrawImageObject(bowser, bx, by, 120, 100);
    // Mort de Bowser
    if ((ex > 1030) && (ey >= 0) && (ey < 100)) {
      fin = 1;
    }
    if (fin == 1) {
      bowser = br;
      by = by + 5;
      setCanvasFont('helvetica', '50px', 'bold');
      Texte(600, 390, 'WIN', 'white');
      Theme.pause();
    }

    // Images Etages
    DrawImageObject(Etage1, 800, 130, 300, 20);
    DrawImageObject(Etage1, 600, 230, 250, 20);
    DrawImageObject(Etage1, 500, 330, 150, 20);
    DrawImageObject(Etage1, 250, 460, 300, 20);
    DrawImageObject(Etage1, 1, 580, 1355, 25);

    // Image Soucoupe
    DrawImageObject(soucoupe, 1050, 40, 150, 170);

    // Images des flammes
    DrawImageObject(flamme, flmx1, flmy1, 30, 30);
    DrawImageObject(flamme, flmx2, flmy2, 30, 30);
    // Déplacement des flammes
    i=i+1;
    if (f == 4) {
      flmx1 = flmx1 + (mx - flmx1 - 10) / 100 + debut[0];
      flmy1 = flmy1 + (my - flmy1 - 10) / 100 + debut[0];
      flmx2 = flmx2 + (mx - flmx2 - 10) / 90 + debut[0];
      flmy2 = flmy2 + (my - flmy2 - 10) / 90 + debut[0];
    } else {
      flmx1 = flmx1 + (mx - flmx1 - 10) / 100 + debut[0];
      flmy1 = flmy1 + (my - flmy1 - 10) / 100 + debut[0];
    }

    // Mario
    if (cheat == 0) {
      DrawImageObject(mario, mx, my, 40, 40);
    } else {
      if (i % 2 == 0) {
        DrawImageObject(mario, mx, my, 40, 40); // Affiche Mario 1 fois sur 2
      }
    }
    // Effet Mario
    if (mouvement == 1) {
      mx = mx - 1;
      if (i % 32 == 0) {
        mario = mg1;
      } else if (i % 16 == 0) {
        mario = mg2;
      }
    }
    if (mouvement == 2) {
      mx = mx + 1;
      if (i % 32 == 0) {
        mario = md1;
      } else if (i % 16 == 0) {
        mario = md2;
      }
    }
    // Limites de Mario
    if (mx <= 1) {
      mouvement = 0;
    }
    if (mx >= 1320) {
      mouvement = 0;
    }
    
  }
  
  // Epee
    DrawImageObject(epee, ex, ey, 35, 50);
  // Effet épée
  if ((mx >= 350) && (mx <= 450) && (my >= 300) && (my <= 500)) {
    em = 1;
  }
  if (em == 1) {
    if (mouvement == 1) {
      if (i % 16 == 0) {
        epee = eg;
        ex = mx - 30;
        ey = my;
      }
    }
    if (mouvement == 2) {
      if (i % 16 == 0) {
        epee = ed;
        ex = mx + 40;
        ey = my;
      }
    }
    if (mouvement == 0) {
      if (i % 32 == 0) {
        epee = eh;
        ex = mx + 5;
        ey = my - 40;
      }
    }
  }

  // Zone des Etages
  if (((mx >= 0) && (mx <= 1360) && (my <= 580) && (my > 460)) || ((mx > 540) && (mx <= 1360) && (my <= 460) && (my > 330)) || ((mx >= 650) && (mx <= 1360) && (my <= 330) && (my > 230)) || ((mx > 850) && (mx <= 1360) && (my <= 230) && (my > 130)) || ((mx > 1100) && (mx <= 1360) && (my <= 130) && (my > 0))) {
    etage = 0;
  }
  if (((mx > 0) && (mx <= 250) && (my <= 460) && (my > 330)) || ((mx >= 0) && (mx <= 500) && (my <= 330) && (my > 230)) || ((mx > 0) && (mx <= 600) && (my <= 230) && (my > 130)) || ((mx > 0) && (mx <= 800) && (my <= 130) && (my > 0))) {
    etage = 0;
  }
  if ((mx >= 220) && (mx <= 550) && (my <= 460) && (my > 330)) {
    etage = 1;
  }
  if ((mx >= 470) && (mx < 650) && (my <= 330) && (my > 230)) {
    etage = 2;
  }
  if ((mx > 570) && (mx <= 850) && (my <= 230) && (my >= 130)) {
    etage = 3;
  }
  if ((mx >= 770) && (mx <= 1100) && (my <= 130) && (my >= 0)) {
    etage = 4;
  }

  // Saut
  if (saut == 1) {
    my = my - 1;
    if (etage == 0) {
      if (my < 450) {
        saut = 0;
      }
    }
    if (etage == 1) {
      if (my < 320) {
        saut = 0;
      }
    }
    if (etage == 2) {
      if (my < 220) {
        saut = 0;
      }
    }
    if (etage == 3) {
      if (my < 120) {
        saut = 0;
      }
    }
    if (etage == 4) {
      if (my < 5) {
        saut = 0;
      }
    }
  }

  // Gravité
  if (saut == 0) {
    if (((etage == 0) && (my < 540)) || ((etage == 1) && (my < 420)) || ((etage == 2) && (my < 290)) || ((etage == 3) && (my < 190)) || ((etage == 4) && (my < 90))) {
      my = my + 1;
    } else {
      antisaut = 0;
    }
  }

  // Perte de vie
  if ((mx > (flmx1 - 40)) && (mx < (flmx1 + 30)) && (my > (flmy1 - 40)) && (my < (flmy1 + 30)) && (cheat == 0)) {
    vie = vie - 1;
    restart = 1;
  }

   if ((mx > (flmx2 - 40)) && (mx < (flmx2 + 30)) && (my > (flmy1 - 40)) && (my < (flmy2 + 30)) && (cheat == 0)) {
    vie = vie - 1;
    restart = 1;
  }



  // Fin du jeu
  if (vie == 0) {
    monde = 2;
    Mort.play();
    Theme.pause();
  }
  if (monde == 2) {
    setCanvasFont('helvetica', '50px', 'bold');
    Texte(500, 200, 'GAME OVER', 'red');
    RectanglePlein(500, 250, 300, 100, 'white');
    Texte(580, 315, 'Retry', 'black');
  }

  //Réinitialisation
  if (restart == 1) {
    monde = 1;
    mx = 20;
    my = 540;
    flmx1 = 1060;
    flmy1 = 30;
    flmx2 = 1060;
    flmy2 = 30;
    mouvement = 0;
    mario = md1;
    epee = eh;
    ex = 400;
    ey = 400;
    em = 0;
    restart = 0;
  }
}

// Utilisation du clavier

function Keypressed(c) {
  if (monde == 1) {
    // Vers la Gauche
    if (c == Caractere_vers_Ascii('Q')) {
      mouvement = 1;
    } else {
      mx = mx - 12;
    }
  }

  // Vers la Droite
  if (c == Caractere_vers_Ascii('D')) { //
    mouvement = 2;
  } else {
    mx = mx + 12;
  }

  // Activation du Saut
  if ((c == Caractere_vers_Ascii('Z')) && (antisaut == 0)) {
    saut = 1;
    antisaut = 1;
  }

  // Arrêt
  if (c == Caractere_vers_Ascii('S')) {
    mouvement = 0;
  }
  // Cheat
  if (c == 65) {
    if (cheat == 0) {
      cheat = 1;
    } else {
      cheat = 0;
    }
  }
  c = 0; 
}

// Utilisation de la souris
function MouseClick(x, y) {
  if (monde == 2) {
    if ((x >= 500) && (x <= 800) && (y >= 250) && (y <= 350)) { // Zone cliquable pour recommencer
      restart = 1; // on réinitialise tout comme au début
      vie = 3;
      i = 1;
      mvfx = 1;
      mvfy = 0;
    }
  }
}
