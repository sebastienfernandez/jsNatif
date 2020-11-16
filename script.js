/******** ELEMENTS DU DOM *********/

const eltPicture = document.getElementById("picture-game");
const healthPoints = document.getElementById("pv");
const manaPoints = document.getElementById("mana");
const powerPoints = document.getElementById("atk");
const listInventory = document.getElementById("list-inventory");
const eltSearch = document.getElementById("search");
const eltMove = document.getElementById("move");
const eltSpell = document.getElementById("spell");
const eltFight = document.getElementById("fight");
const eltUseItem = document.getElementById('list-inventory').getElementsByClassName("use-item");

/********* INSTANCIATION DES CLASSES  *************/

class Heroe {
    constructor(name, health, mana, power, src, introduction) {
        this.name = name;
        this.health = health;
        this.mana = mana;
        this.power = power;
        this.src = src;
        this.introduction = introduction;
    }

    introduce() {
        console.log(this.introduction);
        eltPicture.setAttribute("src", this.src);
    }

    attack(target) {
        console.log(this.name + " attaque et inflige " + this.power + " points de dégats");
        target.health -= this.power;
        console.log(target.name + " a " + target.health + " points de vie");
    }
}

class Monster {
    constructor(name, health, gold, minPower, maxPower, src, emergence) {
        this.name = name;
        this.health = health;
        this.gold = gold;
        this.minPower = minPower;
        this.maxPower = maxPower;
        this.src = src;
        this.emergence = emergence; 
    }

    emerge() {
        console.log(this.emergence);
        eltPicture.setAttribute("src", this.src);
    }

    attack(target) {
        let damage = Math.floor(Math.random() * (this.maxPower - this.minPower +1)) + this.minPower;
        console.log(this.name + " attaque et inflige " + damage + " points de dégats");
        target.health -= damage;
        console.log(target.name + " a " + target.health + " points de vie");
    }
}

class Item {
    constructor(name, healthUp, manaUp, powerUp) {
        this.name = name;
        this.healthUp = healthUp;
        this.manaUp = manaUp;
        this.powerUp = powerUp;
    }

    usedBy(character) {
        console.log("Vous utilisez votre " + this.name);
        character.health += this.healthUp;
        character.mana += this.manaUp;
        character.power += this.powerUp;
        if (this.healthUp > 0) {
            console.log("Vous gagnez " + this.healthUp + " points de vie")
        } else if (this.healthUp < 0) {
            console.log("Vous perdez " + this.healthUp  + " points de vie")
        }
        if (this.manaUp > 0) {
            console.log("Vous gagnez " + this.manaUp + " points de mana")
        } else if (this.manaUp < 0) {
            console.log("Vous perdez " + this.manaUp  + " points de mana")
        }
        if (this.powerUp > 0) {
            console.log("Vous gagnez " + this.powerUp + " points de puissance")
        } else if (this.powerUp < 0) {
            console.log("Vous perdez " + this.powerUp  + " points de puissance")
        }
    }
}



/********* DECLARATIONS DES VARIABLES ET OBJETS ************/

let infantryKnight = new Heroe("le chevalier fantassin", 100, 40, 40, "datas/warrior.jpg", "Le chevalier de renom Théodore parcourt le royaume pour traquer et anéantir les menaces impies. Quand l'Inquisition doit employer la manière forte et au-delà, c'est à lui qu'elle fait appel...");
let necromancerPriest = new Heroe("le prêtre nécromancien", 80, 80, 30, "datas/necromancer.png", "Zahran le nécroman a la lugubre habitude de dire à ses ennemis : 'Tout le monde finit par mourir, mais vous, en plus, vous me servirez'");
let spellcasterMagician = new Heroe("le magicien jeteur de sorts", 60, 100, 20, "datas/magician.jpg", "Le mage Korvus maîtrise les éléments et lance de puissants sortilèges, en général le paysage en reste affecté à jamais...");

let orc = new Monster("le brigand orc", 50, 4, 10, 20, "datas/orc.jpg", "Un orc vêtu de cuir et portant des mains huamines comme trophés se présente devant vous, il montre ses crocs et charge dans votre direction...");
let iceGuardian = new Monster("l'élémentaire de glace", 120, 0, 30, 100, "datas/ice.jpg", "Une statue de glace d'au moins 4 mètres vous barre la route. Horreur, elle semble s'animer et son regard surnaturel et sévere pointe sur vous...");

let potionHealth = new Item("potion de vie", 100, 0, 0);
let potionMana = new Item("potion de mana", 0, 100, 0);
let sword = new Item("épée des croisades", 0, 0, 10);

let script = 0;
let inventory = [];

const updateStats = () => {
    healthPoints.textContent = heroe.health;
    if (heroe.health < 26) {
        healthPoints.style.color = "red";
        healthPoints.style.fontWeight = "bold";
    }
    manaPoints.textContent = heroe.mana;
    powerPoints.textContent = heroe.power;  
}

const updateInventory = () => {
    listInventory.innerHTML = '';
    inventory.forEach((item) => {
        listInventory.innerHTML += "<li class='use-item'>" + item.name + "</li>"
    });
}

const fight = (character, monster) => {
    while (character.health >= 0 && monster.health >= 0) {
        character.attack(monster);
        if (monster.health >= 0) {
            monster.attack(character);
            updateStats();
            if (character.health <= 0) {
                console.log("Vous mourrez. Fin de la partie.")
            }
        } else {
            console.log("Vous terrassez " + monster.name);
        }
    }
}

/**************** DECLARATIONS DES EVENEMENTS *************/



/********** DEBUT DU SCENARIO ************/

let choice = 0;

while (choice !== "1" && choice !== "2" && choice !== "3") {

    choice = prompt("Choisissez votre personnage : 1 = chevalier, 2 = nécromancien, 3 = magicien");

    if (choice === "1") {
        var heroe = infantryKnight;
        inventory.push(potionHealth);
        inventory.push(potionMana);
        inventory.push(sword);
    } else if (choice === "2") {
        var heroe = necromancerPriest;
        inventory.push(potionHealth);
    } else if (choice === "3") {
        var heroe = spellcasterMagician;
        inventory.push(potionMana);
    } else {
        alert("Veuillez choisir un nombre qui soit 1, 2 ou 3");
    }
}

console.log(heroe);
heroe.introduce();
console.log(inventory);
updateStats();
updateInventory();



/************* AVANCE DU SCRIPT ************/

// problème, rendre les objets de l'inventaire cliquables pour les utiliser
eltUseItem.addEventListener('click', function() {
    console.log('sdf');
});

eltMove.addEventListener('click', function() {
    script++;
    console.log(script);
    switch (script) {
        case 1:
            orc.emerge();
            fight(heroe, orc);
        break;
        case 2:
            iceGuardian.emerge();
            fight(heroe,iceGuardian);
        break;
        default:
            console.log('erreur script');
    }
});




