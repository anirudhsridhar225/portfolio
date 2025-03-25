'use client'

import React, { useState } from 'react'
import { DirName, HostName, InputLine } from '../styles/Terminal.styled';

const Powerline: React.FC = () => {
    return (
        <InputLine>
            <HostName>visitor@andy'sfaketerminal</HostName>
            <DirName>~</DirName>
        </InputLine>
    )
}

export default Powerline