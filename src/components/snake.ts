/*
    Taken from here:
    https://gist.github.com/straker/ff00b4b49669ad3dec890306d348adc4
    Converted to class with TypeScript annotations
*/
export default class Game {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private grid: number;
    private count: number;
    private snake: Snake;
    private apple: Apple;
    public running: boolean;
    private keydownListener: EventListener;

    constructor(canvasEl?: HTMLCanvasElement) {
        this.canvas = canvasEl || document.getElementById('game') as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d')!;
        this.grid = 16;
        this.count = 0;
        this.running = false;
        
        this.snake = {
            x: 160,
            y: 160,
            dx: this.grid,
            dy: 0,
            cells: [],
            maxCells: 4
        };
        
        this.apple = {
            x: 320,
            y: 320
        };
        
        this.keydownListener = this.handleKeydown.bind(this) as any;
    }

    private initAll(): void {
        this.grid = 16;
        this.count = 0;

        this.snake = {
            x: 160,
            y: 160,
            dx: this.grid,
            dy: 0,
            cells: [],
            maxCells: 4
        };
        this.apple = {
            x: 320,
            y: 320
        };
    }

    private getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    private loop(): void {
        if (!this.running) return;

        requestAnimationFrame(this.loop.bind(this));

        // slow game loop to 15 fps instead of 60 (60/15 = 4)
        if (++this.count < 16) {
            return;
        }

        this.count = 0;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // move snake by it's velocity
        this.snake.x += this.snake.dx;
        this.snake.y += this.snake.dy;

        // wrap snake position horizontally on edge of screen
        if (this.snake.x < 0) {
            this.snake.x = this.canvas.width - this.grid;
        }
        else if (this.snake.x >= this.canvas.width) {
            this.snake.x = 0;
        }

        // wrap snake position vertically on edge of screen
        if (this.snake.y < 0) {
            this.snake.y = this.canvas.height - this.grid;
        }
        else if (this.snake.y >= this.canvas.height) {
            this.snake.y = 0;
        }

        // keep track of where snake has been. front of the array is always the head
        this.snake.cells.unshift({ x: this.snake.x, y: this.snake.y });

        // remove cells as we move away from them
        if (this.snake.cells.length > this.snake.maxCells) {
            this.snake.cells.pop();
        }

        // draw apple
        this.context.fillStyle = 'red';
        this.context.fillRect(this.apple.x, this.apple.y, this.grid - 1, this.grid - 1);

        // draw snake one cell at a time
        this.context.fillStyle = 'green';
        this.snake.cells.forEach((cell: Cell, index: number) => {
            // drawing 1 px smaller than the grid creates a effect in the snake body so you can see how long it is
            this.context.fillRect(cell.x, cell.y, this.grid - 1, this.grid - 1);

            // snake ate apple
            if (cell.x === this.apple.x && cell.y === this.apple.y) {
                this.snake.maxCells++;

                // canvas is 400x400 which is 25x25 grids
                this.apple.x = this.getRandomInt(0, 25) * this.grid;
                this.apple.y = this.getRandomInt(0, 25) * this.grid;
            }

            // check collision with all cells after this one (modified bubble sort)
            for (let i = index + 1; i < this.snake.cells.length; i++) {
                // snake occupies same space as a body part. reset game
                if (cell.x === this.snake.cells[i].x && cell.y === this.snake.cells[i].y) {
                    this.resetGame();
                }
            }
        });
    }

    private handleKeydown(e: KeyboardEvent): void {
        // prevent snake from backtracking on itself by checking that it's
        // not already moving on the same axis (pressing left while moving
        // left won't do anything, and pressing right while moving left
        // shouldn't let you collide with your own body)

        // left arrow key
        if (e.which === 37 && this.snake.dx === 0) {
            this.snake.dx = -this.grid;
            this.snake.dy = 0;
        }
        // up arrow key
        else if (e.which === 38 && this.snake.dy === 0) {
            this.snake.dy = -this.grid;
            this.snake.dx = 0;
        }
        // right arrow key
        else if (e.which === 39 && this.snake.dx === 0) {
            this.snake.dx = this.grid;
            this.snake.dy = 0;
        }
        // down arrow key
        else if (e.which === 40 && this.snake.dy === 0) {
            this.snake.dy = this.grid;
            this.snake.dx = 0;
        }
    }

    public run(): void {
        this.running = true;

        this.canvas.style.display = "block";
        this.canvas.focus();
        this.canvas.scrollIntoView();
    
        document.addEventListener('keydown', this.keydownListener);
        this.initAll();
        requestAnimationFrame(this.loop.bind(this));
    }

    public stop(): void {
        this.running = false;
        this.canvas.style.display = "none";
        document.removeEventListener('keydown', this.keydownListener);
    }

    private resetGame(): void {
        this.snake.x = 160;
        this.snake.y = 160;
        this.snake.cells = [];
        this.snake.maxCells = 4;
        this.snake.dx = this.grid;
        this.snake.dy = 0;

        this.apple.x = this.getRandomInt(0, 25) * this.grid;
        this.apple.y = this.getRandomInt(0, 25) * this.grid;
    }
}

// Type definitions for better TypeScript support
interface Cell {
    x: number;
    y: number;
}

interface Snake {
    x: number;
    y: number;
    dx: number;
    dy: number;
    cells: Cell[];
    maxCells: number;
}

interface Apple {
    x: number;
    y: number;
}
