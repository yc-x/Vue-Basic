function getRandomValue(min, max){
    // regular javascript function.
    return Math.floor(Math.random() * (max - min)) + min;
}


const app = Vue.createApp({
    data(){
        return {
            monsterHealth: 200,
            playerHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: [],
        };
    },
    methods:{
        startGame(){
            this.playerHealth = 100;
            this.monsterHealth = 200;
            this.currentRound = 0;
            this.winner = null;
            this.logMessages = [];
        },
        playerAttack(){
            // player attacks monster
            var playerAtk = getRandomValue(5, 12);
            // player attack varies from 5 to 12
            this.monsterHealth -= playerAtk;
            this.addLogMessage('player', 'attack', playerAtk, this.currentRound);
            this.monsterAttack();
            this.currentRound++;
        },
        monsterAttack(){
            // monster strikes back.
            var monsterAtk = getRandomValue(3, 15);
            this.playerHealth -= monsterAtk;
            this.addLogMessage('monster', 'attack', monsterAtk, this.currentRound);
        },
        specialAttack(){
            var specialAtk = getRandomValue(10, 25);
            this.monsterHealth -= specialAtk;
            // monster won't counter attack.
            this.addLogMessage('player', 'special-attack', specialAtk, this.currentRound);
            this.currentRound++;
        },
        playerHeal(){
            var healVal = getRandomValue(8, 10);
            this.playerHealth += healVal;
            if(this.playerHealth > 100){
                this.playerHealth = 100;
            }
            this.addLogMessage('player', 'heal', healVal, this.currentRound);
            this.monsterAttack();
            this.currentRound++;
        },
        surrender(){
            this.addLogMessage('player', 'surrender', null, null);
            this.winner = 'monster';
            // 
        },
        addLogMessage(who, what, value, round){
            var messageObj = {
                actionBy: who,
                actionType: what,
                actionValue: value,
                round: round,
            };
            this.logMessages.unshift(messageObj);     // append ahead.
        }
    },
    computed:{
        // computed is something that...
        monsterBarStyles(){
            if(this.monsterHealth < 0){
                return {width: '0%'};
            }
            return {width: this.monsterHealth / 2+ '%'};
        },
        playerBarStyles(){
            if(this.playerHealth < 0){
                return {width: '0%'};
            }
            return {width: this.playerHealth + '%'};
        },
        mayUseSpecialAttack(){
            return this.currentRound % 3 != 0;
        }
    },
    watch:{
        playerHealth(value){
            if(value <= 0){
                if(this.monsterHealth <= 0){
                    // draw
                    this.winner = 'draw';
                }
                else{
                    // lost
                    this.winner = 'monster';
                }
            }
            
        },
        monsterHealth(value){
            if(value <= 0){
                if(this.playerHealth <= 0){
                    // draw
                    this.winner = 'draw';
                }
                else{
                    // win
                    this.winner = 'player';
                }
            }
        }
    }
    
});

app.mount('#game');