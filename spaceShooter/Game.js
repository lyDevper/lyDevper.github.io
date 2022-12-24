class Game {
    static score = 0;
    static hearts = 5;
    static interval = null;
    static asteroidFactor = 1;

    static frame() {
        if(Math.random() < 0.64) {   
            for(let i=0; i<Game.asteroidFactor; i++) {
                new Asteroid();
            }

        }

        for(let obj of GameObj.objList) {
            obj.update();
        }
        for(let obj of GameObj.objList) {
            obj.render(ctx);
        }        
        
    }
    
    static startGame() {
        Game.score = 0;
        Game.hearts = 5;

        //------ game components initialization
        var background = new Background();
        var rocket = new Rocket();
        var scoreText = new ScoreText();
        var hearts = new Hearts();
        var graphVelocity = new GraphVelocity(75, cvsHeight-100, rocket);
        var graphOmega = new GraphOmega(75, cvsHeight-25, rocket);
        //var asteroids = []

        Game.interval = setInterval(function() {
            Game.frame();
            //to render over them
            scoreText.render(ctx);
            hearts.render(ctx);
        }, 1000/40);

        //--------handling event---------
        document.addEventListener("keydown", function(event) {
            if(event.key=='ArrowUp') {
                rocket.a_thrust = rocket.thrustPower;
            }
            if(event.key=='ArrowDown') {
                rocket.a_thrust = -rocket.thrustPower;
            }
            if(event.key=='ArrowLeft') {
                rocket.alpha = -rocket.turnPower;
            }
            if(event.key=='ArrowRight') {
                rocket.alpha = +rocket.turnPower;
            }
        })

        document.addEventListener("keyup", function(event) {
            if(event.key=='ArrowUp') {
                rocket.a_thrust = 0
            }
            if(event.key=='ArrowDown') {
                rocket.a_thrust = 0
            }
            if(event.key=='ArrowLeft') {
                rocket.alpha = 0;
            }
            if(event.key=='ArrowRight') {
                rocket.alpha = 0;
            }
        })

        document.onkeydown = function(event) {
            if(event.keyCode==32) {
                new Bullet(rocket.x, rocket.y, rocket.theta);
            }
            
        }

        // for mobile compatible
        document.onmousedown = function(event) {
            // Calculate the target position for the rocket
            var targetX = event.clientX;
            var targetY = event.clientY;
        
            // Calculate the angle between the rocket and the target position
            var angle = Math.atan2(targetY - rocket.y, targetX - rocket.x);
            angle = rad2deg(angle);
            // Set the thrust and turn acceleration based on the angle
            rocket.a_thrust = rocket.thrustPower * 0.6;
            rocket.omega = (angle - rocket.theta) * 0.04;
            //rocket.omega = Math.sign(rocket.omega) * Math.sqrt(Math.abs(rocket.omega)) *1.5; //act function
            rocket.shoot();
        };
        
        document.ontouchstart = function(event) {
            // Calculate the target position for the rocket
            var targetX = event.touches[0].clientX;
            var targetY = event.touches[0].clientY;
        
            // Calculate the angle between the rocket and the target position
            var angle = Math.atan2(targetY - rocket.y, targetX - rocket.x);
            angle = rad2deg(angle);
            // Set the thrust and turn acceleration based on the angle
            rocket.a_thrust = rocket.thrustPower * 0.6;
            rocket.omega = (angle - rocket.theta) * 0.04;
            rocket.shoot();
        };

        document.onmouseup = function(event) {
            rocket.a_thrust = 0;
            rocket.alpha = 0;
        };

        document.ontouchend = function(event) {
            rocket.a_thrust = 0;
            rocket.alpha = 0;
        };

    }

    static endGame() {
        clearInterval(Game.interval);
        /*
        for(let o of GameObj.objList) {
            o.destroy();            
        }
        */
        ctx.fillStyle = '#222';
        ctx.fillRect(0, 0, cvsWidth, cvsHeight);

        while(GameObj.objList.length != 0) {
            GameObj.objList[0].destroy();
       }       
    }
}