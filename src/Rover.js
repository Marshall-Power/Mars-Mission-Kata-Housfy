class Rover {
    constructor(location, direction, grid, obstacles) {
        
        this.x = (location === undefined) ? 0 : location[0]
        this.y = (location === undefined) ? 0 : location[1]
        this.directions = ['N', 'E', 'S', 'W']
        this.direction = (this.directions.includes(direction)) ? direction : 'N'
        this.grid = (grid === undefined) ? [200, 200] : grid;
        this.obstacles = (obstacles === undefined) ? [] : obstacles
    }

    

    commands(commands) {
        if(commands === undefined) {
            return this.cmds
        } else {
            let cmds = commands.toUpperCase().split('')
            this.cmds = cmds

            for(let i = 0; i < cmds.length; i++){
                if(cmds[i] === 'F') {
                    if(this.moveForward(this.direction, this.obstacles)){
                        console.log('Moved forward one position to [' + this.x + ', ' + this.y + ']')
                    } else {
                        break
                    }
                } else if (cmds[i] === 'R' || cmds[i] === 'L') {
                    this.turnRover(cmds[i])
                    console.log('Turned to face ' + this.direction)
                }
            }
        }
    }
    
    moveForward(direction, obstacles) {
        let yChange = 0, 
            xChange = 0
       
        switch (direction) {
            case 'N':
                yChange = 1
                break
            case 'E':
                xChange = 1
                break;
            case 'S':
                yChange = -1
                break
            case 'W':
                xChange = -1
                break
        }

        let nextPos = [this.x + xChange, this.y + yChange],
            obstacleFound = false

        for(let i = 0; i < obstacles.length; i++){
            console.log('Next position is ' + nextPos + ' obstacle at ' + obstacles[i])
                if(JSON.stringify(nextPos) === JSON.stringify(obstacles[i])){
                    obstacleFound = true
                    break
                }
        }

        if(obstacleFound){
            console.log('obstacle found at ' + nextPos + ' aborting mission')
            return false
        } else {    
            this.x = nextPos[0]
            this.y = nextPos[1]

            return true
        }

    }

    turnRover(command) {
        const directionIndex = this.directions.indexOf(this.direction)
        if (command === 'L') {
            const newDirectionIndex = directionIndex - 1
            if (newDirectionIndex < 0) {
                this.direction = this.directions[3]
            } else {
                this.direction = this.directions[newDirectionIndex]
            }
            
        } else if (command === 'R') {
            const newDirectionIndex = directionIndex + 1
            if (newDirectionIndex > 3) {
                this.direction = this.directions[0]
            } else {
                this.direction = this.directions[newDirectionIndex]
            }
            
        }
    }

    checkAhead() {

    }
    
}

module.exports = {
    Rover
  };