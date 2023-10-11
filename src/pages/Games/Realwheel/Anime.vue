<template>
    <div ref="canvasContainer" class="canvas-container mx-auto">
      <canvas ref="myCanvas" style="background-color: bisque;"></canvas>
    </div>
  </template>
  
  <script>
  import anime from 'animejs';
  
  export default {
    mounted() {
      const canvas = this.$refs.myCanvas;
      const context = canvas.getContext('2d');
      const canvasContainer = this.$refs.canvasContainer;
  
      // Set a fixed width and height for the canvas
      canvas.width = 400;
      canvas.height = 200;
  
      // Initial rectangle properties
      const rectangle = {
        x: 0,
        y: 100,
        width: 50,
        height: 50,
        color: 'blue',
      };
  
      // Function to draw the rectangle
      const drawRectangle = () => {
        context.fillStyle = rectangle.color;
        context.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
      };
  
      // Initial draw
      drawRectangle();
  
      // Animation using Anime.js
      anime({
        targets: rectangle,
        x: 350, // Target x position
        easing: 'linear', // Animation easing
        duration: 2000, // Animation duration in milliseconds
        update: function () {
          // Clear the canvas
          context.clearRect(0, 0, canvas.width, canvas.height);
  
          // Redraw the rectangle with updated properties
          drawRectangle();
        },
      });
  
      // Function to update the canvas size based on the container size
      const updateCanvasSize = () => {
        canvas.width = canvasContainer.offsetWidth;
        canvas.height = canvasContainer.offsetHeight;
      };
  
      // Listen for window resize and update canvas size
      window.addEventListener('resize', updateCanvasSize);
    },
  };
  </script>
  
  <style scoped>
  .canvas-container {
    width: 100%;
    max-width: 400px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  canvas {
    max-width: 100%;
    max-height: 100%;
  }
  </style>
  