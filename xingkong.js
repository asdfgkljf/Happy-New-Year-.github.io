// 创建画布
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

// 设置画布大小
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 定义星星数组
const stars = [];

// 创建星星对象
class Star {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.alpha = 1;
    this.fade = Math.random() * 0.05 + 0.01; // 闪烁的透明度变化速度
  }

  // 绘制星星
  draw() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
    ctx.shadowColor = 'white';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  // 更新星星状态
  update() {
    this.alpha += this.fade;
    if (this.alpha <= 0 || this.alpha >= 1) {
      this.fade = -this.fade;
    }
  }
}

// 初始化星星数组
function initStars() {
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 2 + 1;
    const color = `${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}`;
    stars.push(new Star(x, y, radius, color));
  }
}

// 绘制星空场景
function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < stars.length; i++) {
    stars[i].draw();
    stars[i].update();
  }
  requestAnimationFrame(drawScene);
}

// 初始化星星数组并开始绘制场景
initStars();
drawScene();