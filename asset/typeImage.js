import fire from "./images/fire-type.png";
import grass from "./images/grass-type.png";
import colorless from "./images/colorless-type.png";
import dragon from "./images/dragon-type.png";
import dark from "./images/dark-type.png";
import electric from "./images/electric-type.png";
import metal from "./images/metal-type.png";
import water from "./images/water-type.png";
import fairy from "./images/fairy-type.png";
import psychic from "./images/psychic-type.png";
import bug from "./images/bug-type2.png";
import flying from "./images/flying-type.webp";
import ghost from "./images/ghost-type.webp";
import ground from "./images/ground-type.png";
import ice from "./images/ice-type.png";
import poison from "./images/poison-type.png";
import rock from "./images/rock-type.png";
import steel from "./images/steel-type.png";
import fighting from "./images/fighting-type.png";
import unknown from "./images/unknown.png";

export default getLogoPath = (typeName) => {
  

    if (typeName === "fire") {
      return fire;
    } else if (typeName === "dragon") {
      return dragon;
    } else if (typeName === "fairy") {
      return fairy;
    } else if (typeName === "dark") {
      return dark;
    } else if (typeName === "colorless") {
      return colorless;
    } else if (typeName === "grass") {
      return grass;
    } else if (typeName === "metal") {
      return metal;
    } else if (typeName === "psychic") {
      return psychic;
    } else if (typeName === "water") {
      return water;
    } else if (typeName === "electric") {
      return electric;
    } else if (typeName === "bug") {
      return bug;
    } else if (typeName === "flying") {
      return flying;
    } else if (typeName === "ghost") {
      return ghost;
    } else if (typeName === "ice") {
      return ice;
    } else if (typeName === "ground") {
      return ground;
    } else if (typeName === "poison") {
      return poison;
    } else if (typeName === "rock") {
      return rock;
    } else if (typeName === "steel") {
      return steel;
    } else if (typeName === "normal") {
      return flying;
    } else if (typeName === "fighting") {
        return fighting;
    } else {
      console.error("Aucun type de ce nom, retourne l'image par défaut");
      return unknown;
    }
  };