'use client'

import React, { useState } from 'react'
import { Input, Prompt, DirName, HostName, InputLine } from '../styles/Terminal.styled';

const Powerline: React.FC = () => {
    const [input, setInput] = useState("")

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            console.log(input)
            setInput('')
        }
    }

    return (
        <InputLine>
            <HostName>visitor@andy'sfaketerminal</HostName>
            <DirName>~</DirName>
            <Input
                as="input"
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                autoFocus
            />
        </InputLine>
    )
}

export default Powerline