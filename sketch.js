//variaveis bolinha
let xBolinha=300;
let yBolinha=200;
let diametroBolinha=22;

let raio = diametroBolinha/2;

//velocidade bolinha
let velocidadexBolinha = 5;
let velocidadeyBolinha=5;

//variaveis raquete
let xRaquete=5;
let yRaquete= 150;
let comprimentoRaquete=10;
let larguraRaquete=90;

//variaveis raquete do oponente
let xRaqueteOponente=585;
let yRaqueteOponente= 150;
let velocidadeYOponente;
let colidiu = false;
let chanceDeErrar = 0;

//placar
let meusPontos=0;
let oponentePontos=0;

//variaveis som
let somRaquete;
let somPonto;
let somTrilha;

function preload(){
  somTrilha = loadSound("trilha.mp3");
  somPonto = loadSound("ponto.mp3");
  somRaquete = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  somTrilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  velocidadeBolinha();
  movimentoBolinha();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  moverRaqueteOponente();
  moverRaquete();
  colisaoRaqueteBiblioteca(xRaquete, yRaquete);
  colisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  incluirPlacar();
  incluirPlacarOP();
  marcarPonto();

}

function mostraBolinha(){
   circle(xBolinha,yBolinha,diametroBolinha);
}

function velocidadeBolinha (){
  xBolinha +=velocidadexBolinha;
  yBolinha+=velocidadeyBolinha;
}

function movimentoBolinha(){
   if(xBolinha+raio>width || xBolinha-raio<0){
     velocidadexBolinha *=-1
     }
   if(yBolinha+raio>height || yBolinha-raio<0){
     velocidadeyBolinha *=-1
     }
}

function mostraRaquete(x,y){
  rect(x,y, comprimentoRaquete, larguraRaquete);
}

function moverRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete-=10;
  }
  if(keyIsDown(DOWN_ARROW)){
    yRaquete+=10;
  }
}

function colisaoRaqueteBiblioteca(x, y) {
    colidiu = collideRectCircle(x, y, comprimentoRaquete, larguraRaquete, xBolinha, yBolinha, raio);
    if (colidiu){
        velocidadexBolinha *= -1;
        somRaquete.play();
    }
}

function  moverRaqueteOponente(){
  velocidadeYOponente = yBolinha- yRaqueteOponente - comprimentoRaquete-2-40;
  yRaqueteOponente += velocidadeYOponente+chanceDeErrar;
   calculaChanceDeErrar();
}

function incluirPlacar(){
  fill(255);
  text(meusPontos, 278, 26);
}

function incluirPlacarOP(){
  fill(255);
  text(oponentePontos, 321, 26);
}

function marcarPonto(){
  if(xBolinha>585){
     meusPontos+=1;
    somPonto.play();
     }
  if(xBolinha<15){
     oponentePontos+=1;
    somPonto.play();
  }
}

function calculaChanceDeErrar() {
  if (oponentePontos >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}





