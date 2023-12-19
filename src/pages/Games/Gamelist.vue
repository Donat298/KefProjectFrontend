<template>

<v-card :ripple="false" @click="$router.push(game.route)" elevation="0" class="game-card" v-for="(game, index) in games" :key="index">
            <v-img class="v-img" style="width: 100%; height: 100%;
             background-color: rgba(127, 255, 212, 0);" :src="require(`@/assets/Gamespreview/${game.image}`)"/>
           
            <div class="play">
                <div class="game-name">{{ game.name }}</div>
                <v-btn class="glowg-buttongame" rounded="lg" :ripple="false">
                    <span >Play</span>
                </v-btn>
            </div>

          <!-- game name -->

        </v-card>
</template>

<script>
export default {
    data() {
        return {
            games: [
                { name: 'Mines', image: 'Mines2.png',route: '/mines' },
                { name: 'Wheel', image: 'Wheel2.png',route: '/wheel' },
     

              
                
 
            ],
        };
    },
}

</script>

<style scoped>


.game-name {

top: 10px;
left: 10px;
color: #ffffff;
font-size: 1.5em;
}
.game-card {
width: 100%;
max-width: 500px;
aspect-ratio: 5 / 3; /* sets a 2:1 width to height ratio */
margin: 10px;
display: flex;
flex-direction: column;
justify-content: center; /* centers items vertically in the container */
align-items: center; /* centers items horizontally in the container */
border-radius: 20px;

box-sizing: border-box;
background-color: #1d2f3f;
position: relative; /* added to position the button at the bottom */
}

.play {
position: absolute; /* positions the button at the bottom of the card */
padding: 2%;
bottom: 0; /* positions the button at the very bottom */
width: 100%; /* makes the button take up the full width of the card */
box-sizing: border-box; /* makes the button take up the full width of the card */
backdrop-filter: blur(10px); /* adds a blur effect to the background */
display: flex;
flex-direction: column; /* stacks items vertically */
justify-content: center;
align-items: center;
}
.glowg-buttongame {
background-image: linear-gradient(230deg,rgb(99, 254, 202), rgb(127, 255, 244));
margin: 0;
padding: 0;
background-size: 200% 100%;
width: 250px;
max-width: 90%;

min-height: 40px;
height: 100%;


}
.v-img {
/* other styles... */
transition: transform 0.4s ease-in-out; /* animation settings */
}

.game-card:hover .v-img {
transform: scale(1.1); /* increase size by 10% */
}
h2 {
margin: 0;
padding: 0;
}

.play v-btn {
margin: 0;
padding: 0;
}
</style>