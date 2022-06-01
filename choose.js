const textElement = document.getElementById('text')
const playerHealth = document.getElementById('playerHealth')
const playerAttack = document.getElementById('playerAttack')
const Gold = document.getElementById('Gold')
const info = document.getElementById('info')
const optionButtonsElement = document.getElementById('option-buttons')

var potionCount = 0;

//creates a random number between 1 and 100
function luck() {
    return Math.floor(Math.random() * 100) + 1;
}

var killCount = 0;

const swordDropChance = 15
const battleAxChance = 10
const potionDropChance = 20


var hasSword = false
var hasAx = false

const badGuys = ['skeleton', 'Zombie', 'bandit', 'goblin', 'orc', 'troll', 'vampire', 'werewolf'] 


//badGuys health and attack values
var badGuysHealth = {
    skeleton: {
        health: 15,
        attack: 3
    },
    Zombie: {
        health: 7,
        attack: 3
    },
    bandit: {
        health: 20,
        attack: 4
    },
    goblin: {
        health: 10,
        attack: 2
    },
    orc: {
        health: 30,
        attack: 10
    },
    troll: {
        health: 35,
        attack: 12
    },
    vampire: {
        health: 40,
        attack: 20
    },
    werewolf: {
        health: 45,
        attack: 15
    }
}




//player health and attack values
var playerStats = {
    health: 100,
    attack: 10
}

//randomly creates an oppent based on badGuys array with health and attack values 
function createOppent() {
    const oppent = badGuys[Math.floor(Math.random() * badGuys.length)]
    return oppent
}


var gold = 0

function startGame() {
    //when the game starts, the player's health and attack values are reset to 100and 10
    playerStats.health = 100
    playerStats.attack = 10
    playerHealth.innerHTML = 'Health: ' + playerStats.health
    playerAttack.innerHTML = 'Attack: ' + playerStats.attack
    //the player's gold is reset to 0
    gold = 0
    //add one to the potion count
    potionCount += 1

    //set kill count to 0
    killCount = 0

    //calls the runningGame function
    runningGame()

}


function runningGame() {
    //calls the newEnmeny function and prints the name of the enemy to the text element 
    //as well as prints the enemy's health to the enemyHealth element and enemyAttack to the enemyAttack element
    name = createOppent()
    textElement.innerHTML = 'You have encountered a ' + name + '!'
    enemyHealth.innerHTML = 'Health: ' + badGuysHealth[name].health
    enemyAttack.innerHTML = 'Attack: ' + badGuysHealth[name].attack
    

    //calls the attack function if the player presses the attack button
    optionButtonsElement.innerHTML = '<button onclick="attack()">Attack</button>'

   //calls the newEnmeny function if the player presses the run button
    optionButtonsElement.innerHTML += '<button onclick="newEnmeny()">Run</button>'

    //calls the drinkPotion function if the player presses the drink button
    optionButtonsElement.innerHTML += '<button onclick="drinkPotion()">Drink Potion</button>'


    
}



function attack() {
    //decrease the enemy's health by the player's attack value
    badGuysHealth[name].health -= playerStats.attack
    
    
    //decrease the player's health by the enemy's attack value
    playerStats.health -= badGuysHealth[name].attack
    
    //update the player's health value 
    playerHealth.innerHTML = 'Health: ' + playerStats.health
    
    //update the enemy's health value 
    enemyHealth.innerHTML = 'Health: ' + badGuysHealth[name].health

    //if the player's health is less than or equal to 0, call the defeat function
    if (playerStats.health <= 0) {
        defeat()
    }
    
    //if the enemy health is less than or equal to 0, call the defeatEnemy function
    if (badGuysHealth[name].health <= 0) {
        defeatEnemy()
    }
    

}


//function that selects a new enmey and resets the enemy's health, attack
function newEnmeny() {
    name = createOppent()
    textElement.innerHTML = 'You have encountered a ' + name + '!'
    enemyHealth.innerHTML = 'Health: ' + badGuysHealth[name].health
    enemyAttack.innerHTML = 'Attack: ' + badGuysHealth[name].attack
    enemyHP = badGuysHealth[name].health
}
    

function defeatEnemy() {
    //add one to the kill count
    killCount += 1

    //add a random amount of gold to the player's gold between 1 and 10
    gold += Math.floor(Math.random() * 10) + 1

    //update the player's gold value and print it to the Gold element
    Gold.innerHTML = 'Gold: ' + gold

    //reste the enemy's health to a random number between 15 and 30
    badGuysHealth[name].health = Math.floor(Math.random() * 15) + 15

    //calls the luck function and if the number is less than or equal to the potionDropChance, add a potion to potionCount 
    if (luck() <= potionDropChance) {
        potionCount += 1
        info.innerHTML = 'You have found a potion!'

    }

    //if the hasSword variable is false, and the number is less than or equal to the swordDropChance set hasSword to true 
    //and prints you have found a sword to the info element and incrases player attack by 5
    if (hasSword == false && luck() <= swordDropChance) {
        hasSword = true
        info.innerHTML = 'You have found a sword!'
        playerStats.attack += 5
        playerAttack.innerHTML = 'Attack: ' + playerStats.attack
    }


    //if the battleAxChance variable is false, and the number is less than or equal to the battleAxChance set hasAx to true
    //and prints you have found a battle ax to the info element and incrases player attack by 5
    if (hasAx == false && luck() <= battleAxChance) {
        hasAx = true
        info.innerHTML = 'You have found a battle ax!'
        playerStats.attack += 5
        playerAttack.innerHTML = 'Attack: ' + playerStats.attack
    }


    
    //call the newEnmeny function
    newEnmeny()
}


function defeat() {
    //prints the defeat message to the text element
    textElement.innerHTML = 'You have been defeated!'

    //prints kill count to the info element
    info.innerHTML = 'You killed ' + killCount + ' enemies!'

    //prints the defeat message and shows the restart button
    optionButtonsElement.innerHTML = '<button onclick="startGame()">Restart</button>'
}


function drinkPotion() {
    //if the player has a potion, increase the player's health by 20 else update the info element to say you have no potions
    if (potionCount > 0) {
        playerStats.health += 20
        potionCount -= 1
        playerHealth.innerHTML = 'Health: ' + playerStats.health
    }
    else {
        info.innerHTML = 'You have no potions!'
    }

    
    
}

startGame()