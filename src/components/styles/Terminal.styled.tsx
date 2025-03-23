'use client'
import styled from "styled-components";
import theme from "../themes";

export const Wrapper = styled.div`
    padding: 1.25rem;
    padding-top: 0.75rem;

    display: flex;
    max-height: calc(100vh-2rem);
    overflow-y: auto;
`

export const InputLine = styled.div`
    display: flex-grow;
    align-items: center;
    font-family: monospace;
`

export const Prompt = styled.span`
    margin-right: 0.5rem;
    font-size: 16px;
    padding: 0.25rem;
`

export const Input = styled.span`
    flex-grow: 1;
    background: none;
    max-width: calc(100vw - 6rem);
    border: none;
    outline: none;
    font-size: 16px;
    color: ${({ theme }) => theme.colors?.secondary};
    margin-left: 0.75rem;
`

export const DirName = styled.span`
    color: rgb(32,33,37);
    background: rgb(146,179,244);
    font-size: 16px;
    padding-left: 1.25rem;
    padding-right: 0.5rem;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    flex-grow: 1;
    position: relative;
    display: inline-flex;
    text-align: center;
    align-items: center;
    height: 1.5rem;
    line-height: 1rem;
    margin-right: 0.5rem;
    
    /* Create the arrowhead shape */
    &:after {
        content: '';
        position: absolute;
        right: -12px;
        top: 0;
        width: 0;
        height: 0;
        border-top: 12px solid transparent;
        border-bottom: 12px solid transparent;
        border-left: 12px solid rgb(146,179,244);
    }

    &:before {
        content: '';
        position: absolute;
        left: 0px;
        top: 0;
        width: 0;
        height: 0;
        border-top: 12px solid transparent;
        border-bottom: 12px solid transparent;
        border-right: 12px solid rgb(69,71,88);
        transform: rotate(180deg);
    }
`

export const HostName = styled.span`
    padding: 0.25rem;
    font-size: 16px;
    background: rgb(69,71,88);
    padding: 0.25rem;
    color: white/50;
    height: 1.5rem;
    line-height: 1rem;
`