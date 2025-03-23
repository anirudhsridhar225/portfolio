import React from 'react'
import Powerline from './terminal/powerline';
import { Wrapper } from './styles/Terminal.styled';

export default function Terminal() {
    return (
        <Wrapper>
            <Powerline />
        </Wrapper>
    );
}
