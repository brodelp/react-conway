import { useState, useEffect} from "react";

const gridRows = 36
const gridCols = 48

const generateEmptyGrid = () => {
    const rows = [];
    for (let i = 0; i < gridRows; i++) {
        rows.push(Array.from(Array(gridCols), () => 0));
    }
    return rows;
};

const randomizeGrid = () => {
    let newGrid = generateEmptyGrid()

    for (let i = 1; i < gridRows - 1 ; i++) {
        for (let j = 1; j < gridCols - 1; j++) {
            newGrid[i][j] = Math.round(Math.random())
        }
    };

    return newGrid;
}

const countNeighbors = (grid: number[][], i: number, j: number) => {
    let count = 0;

    if (grid[i - 1][j - 1] == 1) {
        count += 1
    }
    if (grid[i - 1][j] == 1) {
        count += 1
    }
    if (grid[i - 1][j + 1] == 1) {
        count += 1
    }

    if (grid[i][j - 1] == 1) {
        count += 1
    }
    if (grid[i][j + 1] == 1) {
        count += 1
    }

    if (grid[i + 1][j - 1] == 1) {
        count += 1
    }
    if (grid[i + 1][j] == 1) {
        count += 1
    }
    if (grid[i + 1][j + 1] == 1) {
        count += 1
    }
    return count;
}

const isAlive = (alive: boolean, neighbors: number) => {
    if (alive && (neighbors == 2 || neighbors == 3)) {
        return true
    } else if (!alive && neighbors == 3) {
        return true
    } else return false
}

const updateGrid = (grid: number[][]) => {
    let newGrid = generateEmptyGrid();

    for (let i = 1; i < gridRows - 1 ; i++) {
        for (let j = 1; j < gridCols - 1; j++) {
            let neighbors = countNeighbors(grid, i, j);
            if (grid[i][j] == 0) {
                isAlive(false, neighbors) ? newGrid[i][j] = 1 : newGrid[i][j] = 0; 
            } else {
                isAlive(true, neighbors) ? newGrid[i][j] = 1 : newGrid[i][j] = 0; 
            }
        }
    };

    return newGrid;

}

const logGrid = (grid: number[][]) => {
    for (let i = 1; i < gridRows - 1 ; i++) {
        let row = []
        for (let j = 1; j < gridCols - 1; j++) {
            row.push(grid[i][j])
            // console.log(grid[i][j]);
        }
        // console.log(row)
    };
}

export default function Game() {
    const [grid, setGrid] = useState(() => {
        return randomizeGrid();
    });


    useEffect(() => {
        const intervalId = setInterval(() => {
        const newGrid = updateGrid(grid)
        setGrid(newGrid);
        }, 1000); // Update every 1 second
    
        return () => clearInterval(intervalId); // Cleanup on unmount
      }, [grid]);

    return (
        <div>
            <div className="m-auto grid grid-cols-48 grid-rows-36 gap-1 blur-sm">
                {grid.map((rows, i) =>
                        rows.map((_, j) => (
                            <div
                                key={`${i}-${j}`} 
                                className={`${grid[i][j] == 0 ? "bg-white" : "bg-black shadow-lg"} w-6 h-6 m-auto rounded transition duration-500 ease-in-out`}>
                            </div>
                        ))
                )}
            </div>
        </div>
    )

}
