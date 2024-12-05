import Model, { ref, set } from "@expressive/react";

interface Particle {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  life: number;
}

export class AnimateBG extends Model {
  element = ref(this.init);
  context = set<CanvasRenderingContext2D>();
  
  particles = new Set<Particle>();
  width = 0;
  height = 0;
  speed = 0.2;

  particleColor = "";
  particleRadius = 3;
  particleCount = 50;
  particleLife = 6;
  maxLineLength = 150;
  minLineLength = 90;

  init(element: HTMLDivElement) {
    const canvas = document.createElement("canvas");
    const dpr = window.devicePixelRatio || 1;
  
    canvas.style.position = "absolute";
    canvas.style.zIndex = "-1";
    canvas.style.filter = "blur(1.5px)";
    
    this.context = canvas.getContext("2d")!;
  
    this.context.imageSmoothingEnabled = true;
    this.context.imageSmoothingQuality = 'high';

    this.context.scale(dpr, dpr);

    element.appendChild(canvas);

    const computedStyle = getComputedStyle(element);
  
    this.particleColor = computedStyle.getPropertyValue("--accent");

    const onResize = () => {
      const rect = element.getBoundingClientRect();

      canvas.width = rect.width;
      canvas.height = rect.height;

      this.width = rect.width;
      this.height = rect.height;
    }

    window.addEventListener("resize", onResize);
    onResize();

    for (let i = 0; i < this.particleCount; i++)
      this.spawn();

    this.draw();

    return () => {
      window.removeEventListener("resize", onResize);
    }
  }

  spawn(){
    const { speed, particleLife } = this;

    this.particles.add({
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      velocityX: Math.random() * speed * 2 - speed,
      velocityY: Math.random() * speed * 2 - speed,
      life: Math.random() * particleLife * 60,
    });
  }

  update(particle: Particle) {
    const {
      particleColor,
      particleRadius,
      context,
      width,
      height,
    } = this;

    const {
      x: positionX,
      y: positionY,
      velocityX,
      velocityY
    } = particle;

    if (particle.life < 1){
      this.particles.delete(particle);
      this.spawn();
      return;
    }

    if (
      (velocityX > 0 && positionX + velocityX > width) ||
      (velocityX < 0 && positionX + velocityX < 0)
    ) {
      particle.velocityX *= -1;
    }
  
    if (
      (velocityY > 0 && positionY + velocityY > height) ||
      (velocityY < 0 && positionY + velocityY < 0)
    ) {
      particle.velocityY *= -1;
    }

    particle.life--;
    particle.x += particle.velocityX;
    particle.y += particle.velocityY;

    context.beginPath();
    context.arc(particle.x, particle.y, particleRadius, 0, Math.PI * 2);
    context.closePath();
    context.fillStyle = particleColor;
    context.fill();
  }

  drawLine(p1: Particle, p2: Particle){
    const { context } = this;
    const { x: x1, y: y1 } = p1;
    const { x: x2, y: y2 } = p2;

    length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

    if (length >= this.maxLineLength || length < this.minLineLength)
      return;

    const opacity = 1 - length / this.maxLineLength;

    context.lineWidth = 0.5;
    context.strokeStyle = this.particleColor.replace(')', `, ${opacity})`);
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.closePath();
    context.stroke();
  }

  draw() {
    const { context, particles } = this;

    context.fillStyle = "white";
    context.fillRect(0, 0, this.width, this.height);

    for (const particle of particles)
      this.update(particle);

    for (const p1 of particles) 
      for (const p2 of particles)
        this.drawLine(p1, p2);

    requestAnimationFrame(this.draw);
  }
}