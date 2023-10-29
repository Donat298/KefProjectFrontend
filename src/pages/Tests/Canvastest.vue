<template>
    <div>
          <canvas id="ballCanvas" style="background-color: rgb(22, 53, 53); width: 100%; position: relative; aspect-ratio: 3/2;">
            <!-- create canvas here -->
          </canvas>
        </div>
 
  </template>
  
  <script>
  import anime from 'animejs';

  export default {

    mounted() {
    const canvas = document.getElementById('ballCanvas');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
    const ctx = canvas.getContext('2d');
  
    const balls = [];
  
    // Define the number of balls and their initial positions
    const numBalls = 5;
    for (let i = 0; i < numBalls; i++) {
      const radius = canvas.width / 30; // Adjust the radius based on canvas size
      const x = Math.random() * (canvas.width - 2 * radius) + radius;
      const y = Math.random() * (canvas.height - 2 * radius) + radius;
      const dx = (Math.random() - 0.5) * 4; // Random initial velocity
      const dy = (Math.random() - 0.5) * 4; // Random initial velocity
  
      balls.push({ x, y, radius, dx, dy });
    }
  
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      balls.forEach((ball) => {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#FF5733';
        ctx.fill();
        ctx.closePath();
  
        ball.x += ball.dx;
        ball.y += ball.dy;
  
        // Elastic collisions with the walls
        if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
          ball.dx = -ball.dx;
        }
        if (ball.y + ball.dy > canvas.height - ball.radius || ball.y + ball.dy < ball.radius) {
          ball.dy = -ball.dy;
        }
  
        balls.forEach((otherBall) => {
          if (ball !== otherBall) {
            const dx = ball.x - otherBall.x;
            const dy = ball.y - otherBall.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
  
            if (distance < ball.radius + otherBall.radius) {
              // Elastic collision with other balls
              const angle = Math.atan2(dy, dx);
              const relativeVelocityX = ball.dx - otherBall.dx;
              const relativeVelocityY = ball.dy - otherBall.dy;
  
              // Calculate the impulse
              const impulse = (2 * (relativeVelocityX * dx + relativeVelocityY * dy)) / (2 * distance * distance);
  
              ball.dx -= impulse * dx;
              ball.dy -= impulse * dy;
              otherBall.dx += impulse * dx;
              otherBall.dy += impulse * dy;
  
              // Separate the balls to avoid overlap
              const overlap = ball.radius + otherBall.radius - distance;
              const dxSeparation = (overlap / 2) * Math.cos(angle);
              const dySeparation = (overlap / 2) * Math.sin(angle);
              ball.x += dxSeparation;
              ball.y += dySeparation;
              otherBall.x -= dxSeparation;
              otherBall.y -= dySeparation;
            }
          }
        });
      });
  
      requestAnimationFrame(animate);
    }
  
    animate();
  },
  };
  </script>
  
  <style scoped>

  </style>
  