import React, { useState } from 'react';

import { createStage, checkCollision } from '../gameHelpers';

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from '../components/styles/StyledTetris';

// Custom Hooks
import { usePlayer } from '../hooks/usePlayer'
import { useStage } from '../hooks/useStage'

// Components
import Stage from './Stage';
import Display from './Display'
import StartButton from './StartButton'

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer] = usePlayer();
    const [stage, setStage] = useStage(player);

    console.log('re-render');

    const movePlayer = dir => {
        if (!checkCollision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0 })
        }
    }

    const startGame = () => {
        //reset everything
        setStage(createStage());
        resetPlayer();
        setGameOver(false);
    }

    const drop = () => {
        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({ x: 0, y: 1, collided: false })
        } else {
            // Game Over
            if(player.pos.y < 1) {
                console.log('GAME OVER1');
                setGameOver(true);
                setDropTime(null);
            }
            updatePlayerPos({x:0,y:0,collided:true});
        }
    }

    const dropPlayer = () => {
        drop();
    }

    const move = ({ keycode }) => {
        if (!gameOver) {
            if (keycode === 37) {
                movePlayer(-1);
            }
            else if (keycode === 39) {
                movePlayer(1);
            } else if (keycode === 40) {
                dropPlayer();
            }
        }

    }

    return (
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
            <Stage stage={stage} />
            <aside>
                {
                    gameOver ? (
                        <Display gameOver={gameOver} text="Game Over" />
                    ) : (
                            <div>
                                <Display text="Score" />
                                <Display text="Rows" />
                                <Display text="Level" />
                            </div>
                        )
                }
                <StartButton callback={startGame} />
            </aside>
        </StyledTetrisWrapper>
    );
}

export default Tetris;