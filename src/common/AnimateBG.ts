import Model, { ref, set } from "@expressive/react";

export class AnimateBG extends Model {
  element = ref(this.init);
  context = set<CanvasRenderingContext2D>();
  
  particles = [] as Particle[];
  width = 0;
  height = 0;

  particleColor = "";
  particleRadius = 3;
  particleCount = 60;
  maxVelocity = 0.5;
  lineLength = 150;
  particleLife = 6;

  init(element: HTMLDivElement) {
    const canvas = document.createElement("canvas");
    const dpr = window.devicePixelRatio || 1;
  
    canvas.style.position = "absolute";
    canvas.style.zIndex = "-1";
    
    this.context = canvas.getContext("2d", {
      alpha: false,
      antialias: true
    }) as any;
  
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
      this.particles.push(new Particle(this));

    this.draw();

    return () => {
      window.removeEventListener("resize", onResize);
    }
  }

  draw() {
    const { context, particles, lineLength } = this;

    // context.clearRect(0, 0, this.width, this.height);
    context.fillStyle = "white";
    context.fillRect(0, 0, this.width, this.height);

    for (const particle of this.particles)
      particle.update();

    let x1;
    let y1;
    let x2;
    let y2;
    let length;
    let opacity;

    for (const p1 of particles) 
      for (const p2 of particles) {
        x1 = p1.x;
        y1 = p1.y;
        x2 = p2.x;
        y2 = p2.y;

        length = Math.sqrt(
          (x2 - x1) ** 2 + 
          (y2 - y1) ** 2
        );

        if (length < lineLength) {
          opacity = 1 - length / lineLength;
          context.lineWidth = 0.5;
          context.strokeStyle = this.particleColor.replace(')', `, ${opacity})`);
          context.beginPath();
          context.moveTo(x1, y1);
          context.lineTo(x2, y2);
          context.closePath();
          context.stroke();
        }
      }

    requestAnimationFrame(this.draw);
  }
}

class Particle {
  velocityX: number;
  velocityY: number;

  x: number;
  y: number;

  life: number;

  constructor(private parent: AnimateBG){
    const maxVelocity = parent.maxVelocity;

    this.velocityX = Math.random() * (maxVelocity * 2) - maxVelocity;
    this.velocityY = Math.random() * (maxVelocity * 2) - maxVelocity;

    this.x = Math.random() * parent.width;
    this.y = Math.random() * parent.height;
    this.life = Math.random() * parent.particleLife * 60;
  }

  update() {
    const {
      maxVelocity,
      particleLife,
      width,
      height,
      context,
      particleRadius,
      particleColor
    } = this.parent

    if (this.life < 1) {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.velocityX = Math.random() * (maxVelocity * 2) - maxVelocity;
      this.velocityY = Math.random() * (maxVelocity * 2) - maxVelocity;
      this.life = Math.random() * particleLife * 60;
    }

    this.life--;

    if (
      (this.x + this.velocityX > width && this.velocityX > 0) ||
      (this.x + this.velocityX < 0 && this.velocityX < 0)
    ) {
      this.velocityX *= -1;
    }
  
    if (
      (this.y + this.velocityY > height && this.velocityY > 0) ||
      (this.y + this.velocityY < 0 && this.velocityY < 0)
    ) {
      this.velocityY *= -1;
    }

    this.x += this.velocityX;
    this.y += this.velocityY;

    context.beginPath();
    context.arc(this.x, this.y, particleRadius, 0, Math.PI * 2);
    context.closePath();
    context.fillStyle = particleColor;
    context.fill();
  }
}