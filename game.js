function Screen(width , height)
{
	canvas = document.createElement("Canvas")
	this.w = canvas.width = width
	this.h = canvas.height = height
	this.ht = this.h / 4
	this.xht = this.h - this.ht   
	this.ctx = canvas.getContext("2d")
	document.body.appendChild(canvas)
}
Screen.prototype.draw = function(rect) {
	this.ctx.fillStyle = rect.color
	this.ctx.fillRect(rect.x, rect.y , rect.w , rect.h)
};
Screen.prototype.clear = function(x,y,w,h) {
	this.ctx.clearRect(x,y,w,h)
};
Screen.prototype.drawImage = function(img, x, y, w, h) {
	this.ctx.drawImage(img.img , img.x ,img.y , img.w , img.h , x , y , w, h)
};
Screen.prototype.text = function(text) {
	this.ctx.font = text.style
	this.ctx.fillText(text.text , text.x, text.y )
};


function Button(name , fungsi , text)
{
	button = document.createElement("Button")
	button.setAttribute("id" ,  name)
	button.setAttribute("onclick" , fungsi)
	button.innerHTML = text
	document.body.appendChild(button)
}

function Input()
{
	this.press = {}
	this.down  = {}
	var $this = this	
	document.addEventListener("keyup" , function(e){
		delete $this.down[e.keyCode]
	})
	document.addEventListener("keydown" , function(e){
		$this.down[e.keyCode] = true
	})
}
Input.prototype.isPress = function(e) {
	if (this.press[e]) {
		return false
	}else if(this.down[e]){
		return this.press[e] = true
	}
	return false
};
Input.prototype.isDown = function(e) {
	return this.down[e]
};

function Rect(x,y,w,h,color,fely)
{
	this.x = x
	this.y = y
	this.w = w
	this.h = h
	this.color = color
	this.fely = fely
}
Rect.prototype.update = function() {
	this.y += this.fely
};

function Sprite(img , x,y ,w , h)
{
	this.img = img
	this.x  = x
	this.y = y
	this.w = w
	this.h = h 
}

function Text(text , x , y , style , skor)
{
	this.text = text
	this.style = style 
	this.x = x
	this.y = y 
	this.skor = skor
}

function Hit(ax, ay ,aw , ah , bx, by , bw , bh)
{
	return ax < bx + bw && ay < by + bh && by < ay + ah && bx < ax + aw
}
