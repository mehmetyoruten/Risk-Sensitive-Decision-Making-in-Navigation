# Navigation Experiment

We apply different strategies when the outcomes of our decisions are not certain. In order to test this idea, I coded up an online experiment. The task of the participants in this experiment is reaching the target point highlighted in the map. Because each tile has different probability and each map has different obstacle layouts, participants will follow different trajectories depending on the map. 

With our experimental paradigm, we are able to measure risk sensitivity in a sequential setting. This online experiment will be used to compare human planning with conditional value-at-risk (CVaR) [^fn].

## Instructions
In every trial, you will see a grid which consists of several rectangles. Your position on the grid will be indicated with an orange square. Your task is reaching the end point using the arrow keys on your keyboard. You can only move to the neighboring tiles. A trial will look like this:

<img width="306" alt="instructions_grid" src="https://user-images.githubusercontent.com/66330148/188004290-0240f543-b2b9-4e53-9125-ebf1b36409b1.png">


When you have selected a tile to move, your selection will be highlighted with a lighter yellow color. If you wait for a second, the color of the frame will turn to orange and your selection will be processed.

You need to wait for your move to be processed to initiate another move.

![instructions_highlight](https://user-images.githubusercontent.com/66330148/188004402-ddeb80dc-94ff-4fa4-b994-4cc0ba57cfbc.gif)


Each time you select your move, there will be some probability of moving to the other surrounding tiles.
After you reach the end, a new trial will start. You should reach your target in 20 moves. Otherwise, the trial will be terminated.
The first 4 trials will be practice trials to familiarize you with the experiment. 

<img width="301" alt="instructions_prob" src="https://user-images.githubusercontent.com/66330148/188004768-8aab8788-a862-4740-a814-e27bb7995aaa.png">

                
Now in each trial, you will also see lava pits:

<img width="301" alt="instructions_grid_2" src="https://user-images.githubusercontent.com/66330148/188004900-12514ecd-cd0c-4143-b8a7-d8cd0f755f5d.png">

Try to avoid the lava pits. If you step onto them, you will lose that trial round.        

## References
[^fn]: Philippe Artzner, Freddy Delbaen, Jean-Marc Eber, and David Heath. Coherent measures of risk. Mathematical finance, 9(3):203–228, 1999.
