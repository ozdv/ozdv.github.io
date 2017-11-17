class Bg {
	constructor(){
		this.setup();
		this.tick();
	}
	setup(){
		this.c = $('#bg-canvas')[0];
		this.ctx = this.c.getContext('2d');
		
		this.c.width = window.innerWidth;
		this.c.height = window.innerHeight;
		
		this.frame = 0;
		this.dots = [];
		
		for(var i = 0; i < 100; i++){
			this.dots.push({
				x: this.c.width * Math.random(),
				y: this.c.height * Math.random(),
				v: Math.random(),
				d: 360 * Math.random()
			});
		}
	}
	tick() {
		this.frame += 1;
		this.draw();
		requestAnimationFrame(this.tick.bind(this));
	}
	draw(){
		this.ctx.rect(0, 0, this.c.width, this.c.height);
		this.ctx.fillStyle = '#252839';
		this.ctx.fill();
		
		this.drawDots();
	}
	drawDots(){
		this.ctx.fillStyle = '#1b1e2b';
		this.dots.forEach((dot, i)=>{
			this.ctx.beginPath();
			this.ctx.arc(dot.x, dot.y, 2, 0, Math.PI*2);
			this.ctx.fill();
			this.ctx.closePath();
			
			this.drawLinks(dot, i);
			this.moveDot(dot);
		});
	}
	drawLinks(dot, i) {
		this.dots.forEach((dot2, i2)=>{
			if(i !== i2) {
				var distanceX = Math.abs(dot.x - dot2.x);
				var distanceY = Math.abs(dot.y - dot2.y);				
				var threshold = 60;
				if(distanceX < threshold && distanceY < threshold) {
					this.ctx.beginPath();
					this.ctx.moveTo(dot.x, dot.y);
					this.ctx.lineTo(dot2.x, dot2.y);
					this.ctx.strokeStyle = '#1b1e2b';
					this.ctx.stroke();
					this.ctx.closePath();
				}
			}
		});
	}
	moveDot(dot){
		var flip = false;
		dot.x += Math.cos(dot.d) * dot.v;
		dot.y += Math.sin(dot.d) * dot.v;
		
		if(dot.x <= 0 || dot.y <= 0 || dot.y >= this.c.height || dot.x >= this.c.width) {
			flip = true;
		}
		if(flip) {
			if(dot.d < 180) {
				dot.d -= 45;
			} else {
				dot.d += 45;
			}
		}
	}
}
$(document).ready(()=>{
	new Bg();
	new Interwebs();
});