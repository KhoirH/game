var buttonGame , screen , buttonOver , input , sprite , img
var alien , tank  , bgTank ,bullet
var frame , speedAlienX , speedAlienY , Al
var condition , gameOn , set
screen = new Screen(800, 480)
buttonGame = new Button( "start", "return trigger(this)" ,"PLAY")	
bgTank = new Rect(0 , screen.xht , screen.w , screen.ht , "#aaa")
input = new Input()

set = false
gameOn = 0
condition = 0
function trigger(a)
{
	condition++
	condition %= 2
	if (Boolean(condition)) {
		a.innerHTML = "Pause"
	}else{
		a.innerHTML = "Play"
	}
}

function replay()
{
	maxX = 0  
	minX = screen.w - 25 - 30
	maxY = screen.xht + 30
}

function main()
{
	alien = []
	img = new Image()
	img.src ="sprite.png"
	img.onload = function(){
		sprite = [
					[new Sprite(this , 0 , 0 ,110 , this.height) , new Sprite(this , 110 , 0 , 120 , this.height )],
					[new Sprite(this , 227 , 0 , 80 , this.height) , new Sprite(this , 315 , 0 , 80 , this.height)]
				]
		tankSp = new Sprite(this , 395 , 0, 80 , this.height)				
		row = [0,0,0,1,1]
		
		for( i = 0 ; i < row.length ; i++)
		{
			for(j= 0; j < 11 ; j++)
			{
				var a = row[i]
				alien.push({
					x : 25 + 40*j , 
					y : 60 + 30*i , 
					h : 23,
					w : 30 ,
					sprite : sprite[a]
				})
			}
		}
		init()
		run()
	}
}
function init(){
	bullet = new Rect()
	tank = {
		x : (screen.w - 50)/2 ,
		y : screen.h - 45 , 
		w : 50 ,
		h : 45
	}
	frame = 0 
	speedAlienY = 10 
	speedAlienX = 3
	Al = 1
	replay()
	screen.draw(bgTank)
}


function run()
{
	
	loop = function()
	{
		if (Boolean(condition)){
			render()
			update()
		}else if(Boolean(gameOn)){
			init()
			condition = 1
		}
		window.requestAnimationFrame(loop)
	}
	window.requestAnimationFrame(loop)
}

function update()
{
	if (frame % 15 == 0) {
		Al++

		Al %= 2
	}

	if (input.isDown(68)) {
		tank.x += 4
	}
	if (input.isDown(65)) {
		tank.x -= 4
	}

	if (input.isPress(32)) {
		bullet = new Rect(tank.x+(tank.w/2) , tank.y , 5 , 10 , "white" ,  -7) 
	}
	bullet.update()
	if (bullet.y < 0) {
		bullet = new Rect()
		delete input.press[32]
	}
	for(var i = 0 ; i < alien.length ; i++){
		var a = alien[i]
		if (Hit(a.x , a.y , a.w , a.h , bullet.x ,bullet.y ,bullet.w , bullet.h)) {
			alien.splice(i , 1)
			bullet = new Rect()
			delete input.press[32]		
			i--
		}
	}

	screen.draw(bullet)
	screen.drawImage(tankSp , tank.x , tank.y , tank.w , tank.h )
	for(var i = 0 ; i < alien.length ; i++){
		var a = alien[i]

		a.x += speedAlienX
		if (set) {
			a.y += speedAlienY
		}
		maxX = Math.max(maxX , a.x)
		minX = Math.min(minX , a.x)
		maxY = Math.max(maxY , a.y)
		screen.drawImage(a.sprite[Al] , a.x , a.y , a.w , a.h)	
	}

	set = false	
	if (maxX > screen.w  - 30 - 25 || minX < 25 ) {
		speedAlienX = -speedAlienX
		set = true
	}

	replay()
	frame++
}
function render()
{
	screen.clear(0,0,screen.w ,screen.h)
	screen.draw(bgTank)
}

main()