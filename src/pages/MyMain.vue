<template>
  <div class="casino-home">
    <div class="content">
      <h1 class="casino-title">Welcome to KEF</h1>
      <p class="casino-description">
        Experience the thrill of premium casino games. Sign up now to start playing!
      </p>
      <div class="button-group">
        <v-btn class="signup-btn" @click="$router.push('/auth/register')">Sign Up</v-btn>
        <v-btn class="login-btn" @click="$router.push('/auth/login')">Sign In</v-btn>
        <v-btn class="explore-btn" @click="$router.push('/games')">Explore Games</v-btn>
      </div>
      <div class="game-selection">
        <h2>Choose Your Game</h2>
        <div class="game-list">
          <!-- Replace the placeholder images and titles with your actual game options -->
          <div class="game-option">
            <img src="game1.jpg" alt="Game 1">
            <p>Slot Games</p>
          </div>
          <div class="game-option">
            <img src="game2.jpg" alt="Game 2">
            <p>Roulette</p>
          </div>
          <div class="game-option">
            <img src="game3.jpg" alt="Game 3">
            <p>Blackjack</p>
          </div>
        </div>
      </div>
      <div class="bonus-section">
        <h2>Exclusive Bonus</h2>
        <p>Get a 100% deposit bonus on your first deposit! Don't miss out on this limited offer.</p>
        <v-btn class="bonus-btn" @click="$router.push('/promotions')">Claim Bonus</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // Your Vue component logic goes here
}
</script>

<style>
.casino-home {
  display: flex;
  justify-content: center;
  align-items: center;
 
/* Set your desired background color */
}

.content {
  text-align: center;
}

.casino-title {
  font-size: 3em;
  margin-bottom: 20px;
  color: #4d3da0; /* Adjust the color to your preference */
}

.casino-description {
  font-size: 1.2em;
  margin-bottom: 40px;
}

.button-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.signup-btn,
.login-btn,
.explore-btn {
  margin: 10px;
  padding: 15px 40px;
  border: none;
  border-radius: 8px;
  font-size: 1em;
  cursor: pointer;
  color: #fff;
}

.signup-btn {
  background-color: #4d3da0; /* Adjust the colors to match your theme */
}

.login-btn {
  background-color: #6b52ae; /* Adjust the colors to match your theme */
}

.explore-btn {
  background-color: #8c75d4; /* Adjust the colors to match your theme */
}

.game-selection {
  margin-top: 50px;
  text-align: center;
}

.game-list {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.game-option {
  width: 30%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.game-option img {
  width: 100%;
  border-radius: 8px;
}

.bonus-section {
  margin-top: 50px;
  text-align: center;
}

.bonus-section p {
  font-size: 1.1em;
  margin-bottom: 30px;
}

.bonus-btn {
  background-color: #ffcc00; /* Set bonus button color */
  padding: 15px 40px;
}
</style>
