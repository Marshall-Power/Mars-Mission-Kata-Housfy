const Rover = require('../src/Rover.js').Rover

describe('Mars Rover', function() {

    describe('You are given the initial starting point (x,y) of a rover and the direction (N,E,S,W) it is facing.', function() {
        test('Sets the initial rover location and direction', () => {
            const MarsRover = new Rover([12, 2], 'S')
            
            expect(MarsRover.x).toBe(12)
            expect(MarsRover.y).toBe(2)
            expect(MarsRover.direction).toBe('S')
        })

        test('Initial position is 0,0 when not assigned and facing N', () => {
            const MarsRover = new Rover()
            
            expect(MarsRover.x).toBe(0)
            expect(MarsRover.y).toBe(0)
            expect(MarsRover.direction).toBe('N')
        })
    })

    describe('The rover recibes a collection of commands', function() {
        test('Set the commands', () => {
            const MarsRover = new Rover([12, 2], 'S')
            MarsRover.commands('FRFFL')
            expect(MarsRover.commands()).toStrictEqual(['F','R','F','F','L'])
        })
    })

    describe('The rover can move forward (F)', function() {
        test('Rover increases Y value if given a forward command facing North', () => {
            const MarsRover = new Rover([1, 1], 'N')
            MarsRover.commands('FF')
            
            expect(MarsRover.x).toStrictEqual(1)
            expect(MarsRover.y).toStrictEqual(3)
        })
        test('Rover decreases Y value if given an a forward command facing South', () => {
            const MarsRover = new Rover([1, 1], 'S')
            MarsRover.commands('F')
            
            expect(MarsRover.x).toStrictEqual(1)
            expect(MarsRover.y).toStrictEqual(0)
        })
        test('Rover increases X value if given an a forward command facing East', () => {
            const MarsRover = new Rover([1, 1], 'E')
            MarsRover.commands('F')
            
            expect(MarsRover.x).toStrictEqual(2)
            expect(MarsRover.y).toStrictEqual(1)
        })
        test('Rover decreases X value if given an a forward command facing West', () => {
            const MarsRover = new Rover([1, 1], 'W')
            MarsRover.commands('F')
            
            expect(MarsRover.x).toStrictEqual(0)
            expect(MarsRover.y).toStrictEqual(1)
        })
    })

    describe('The rover can turn left or right', function() {
            
        test('Rover changes from North to West if direction is North and a Left command is given', () => {
            const MarsRover = new Rover([1, 1], 'N')
            MarsRover.commands('L')
                
            expect(MarsRover.direction).toBe('W')
        })

        test('Rover changes from North to East if direction is North and a Right command is given', () => {
            const MarsRover = new Rover([1, 1], 'N')
            MarsRover.commands('R')
                
            expect(MarsRover.direction).toBe('E')
        })

        test('Rover changes from South to East if direction is South and a Left command is given', () => {
            const MarsRover = new Rover([1, 1], 'S')
            MarsRover.commands('L')
                
            expect(MarsRover.direction).toBe('E')
        })

        test('Rover changes from South to West if direction is South and a Right command is given', () => {
            const MarsRover = new Rover([1, 1], 'S')
            MarsRover.commands('R')
                
            expect(MarsRover.direction).toBe('W')
        })
    })
    
    describe('Planet has given size or 200x200 by default', function() {
        test('Planet is 200x200 if no parameter is passed', () => {
            const MarsRover = new Rover([1, 1], 'S')
                
            expect(MarsRover.grid).toStrictEqual([200, 200])
        })

        test('Planet is given size', () => {
            const MarsRover = new Rover([1, 1], 'S', [10, 10])
                
            expect(MarsRover.grid).toStrictEqual([10, 10])
        })
    })

    describe('If a given sequence of commands encounters an obstacle, the rover moves up to the last possible point, aborts the sequence and reports the obstacle.', function() {
        test('we can set obstacles', () => {
            const MarsRover = new Rover([0, 0], 'S', [10, 10], [[1,1], [2,2]])
                
            expect(MarsRover.obstacles).toStrictEqual([[1,1], [2,2]])
        })

        test('Rover goes up to the last point before an obstacle, aborts sequence and reports obstacle', () => {
            const MarsRover = new Rover([0, 0], 'N', [4, 4], [[2,2], [3,3]])
            MarsRover.commands('FFRFF')
                
            expect(MarsRover.x).toBe(1)
            expect(MarsRover.y).toBe(2)
        })
    })
})