import React from 'react';

import {createStage} from '../gameHelpers';
import {StyledTetrisWrapper,StyledTetris} from '../components/styles/StyledTetris';

// Components
import Stage from './Stage';
import Display from './Display'
import StartButton from './StartButton'

const Tetris = () => {

    return (
        <StyledTetrisWrapper>
            <Stage stage={createStage()} />
            <aside>
                <div>
                <Display text="Score" />
                <Display text="Rows" />
                <Display text="Level" />
                </div>
                <StartButton />
            </aside>
        </StyledTetrisWrapper>
    );
}

export default Tetris;