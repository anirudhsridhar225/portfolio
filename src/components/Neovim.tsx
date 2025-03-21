'use client'
import React, { useEffect, useRef, useState } from 'react'

export default function Neovim() {
    const [text, setText] = useState<string>('')
    const [currentLine, setCurrentLine] = useState<number>(1) // Start at line 1
    const [cursorPosition, setCursorPosition] = useState<number>(0)
    const [inputMode, setInputMode] = useState<boolean>(false)
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const lineCountRef = useRef<HTMLDivElement>(null)
    const cursorRef  = useRef<HTMLDivElement>(null)
    const lineHeight = '1.5rem'
    const minLines = 50
    
    // Calculate actual line count from text or use minimum
    const textLineCount = text.split('\n').length
    const lineCount = Math.max(minLines, textLineCount)
    
    // Create an array of lines (pad with empty lines if needed)
    const lines = text.split('\n')
    while (lines.length < minLines) {
        lines.push('')
    }

    // Sync scrolling between line numbers and textarea
    useEffect(() => {
        const handleScroll = (): void => {
            if (lineCountRef.current && textAreaRef.current) {
                lineCountRef.current.scrollTop = textAreaRef.current.scrollTop
            }
        }

        const textarea = textAreaRef.current
        if (textarea) {
            textarea.addEventListener('scroll', handleScroll)
            return () => {
                textarea.removeEventListener('scroll', handleScroll)
            }
        }
    }, [])

    // Ensure cursor is visible in the correct position even when navigating empty lines
    useEffect(() => {
        if (textAreaRef.current && cursorRef.current) {
            const textarea = textAreaRef.current
            
            // Set cursor position
            textarea.setSelectionRange(cursorPosition, cursorPosition)
            
            // Focus the textarea 
            textarea.focus()

            //Calc position for custom cursor display
            const textBeforeCursor = text.substring(0, cursorPosition)
            const lines = textBeforeCursor.split('\n')
            const currentLineNumber = lines.length - 1
            const currentLineContent = lines[lines.length - 1]

            // Get font metrics from textarea
            const computedStyle = window.getComputedStyle(textarea)
            const fontSize = parseFloat(computedStyle.fontSize)
            const paddingLeft = parseFloat(computedStyle.paddingLeft)
            const paddingTop = parseFloat(computedStyle.paddingTop)
            
            // Calculate cursor position (approximation)
            // This approximation assumes monospace font where each character has equal width
            const charWidth = fontSize * 0.6 // Approximation for monospace font
            const xPos = currentLineContent.length * charWidth + paddingLeft
            const yPos = currentLineNumber * parseFloat(lineHeight) + paddingTop
            
            // Position the cursor element
            cursorRef.current.style.left = `${xPos}px`
            cursorRef.current.style.top = `${yPos}px`
        }
    }, [cursorPosition, text, inputMode])

    const handleCursorChange = (e: React.SyntheticEvent<HTMLTextAreaElement>): void => {
        const target = e.target as HTMLTextAreaElement
        const pos = target.selectionStart
        setCursorPosition(pos)
        
        // Calculate current line
        const textBeforeCursor = text.substring(0, pos)
        const line = (textBeforeCursor.match(/\n/g) || []).length + 1
        setCurrentLine(line)
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        if (!inputMode) return // Ignore text changes if not in input mode
        const newText = e.target.value
        setText(newText)
        
        // Update cursor position
        setCursorPosition(e.target.selectionStart)
    }

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
        const textarea = textAreaRef.current
        if (!textarea) return

        if (e.key === 'Escape' && inputMode) {
            e.preventDefault()
            setInputMode(false)
            return
        }

        if (e.key === 'i' && !inputMode) {
            e.preventDefault()
            setInputMode(true)
            return
        }

        if (!inputMode) {
            if ()
        }
        
        // Current content as array of lines
        const lines = text.split('\n')
        
        // Get current line and column based on cursor position
        const textBeforeCursor = text.substring(0, cursorPosition)
        const currentLineNumber = (textBeforeCursor.match(/\n/g) || []).length
        const lineStartPos = textBeforeCursor.lastIndexOf('\n') + 1
        const currentColumn = cursorPosition - lineStartPos
        
        // Handle arrow key navigation through empty lines below text content
        if (e.key === 'ArrowDown' && currentLineNumber + 1 >= textLineCount && currentLineNumber + 1 < minLines) {
            e.preventDefault()
            
            // Calculate position for moving down one line
            // If we're on the last text line, append a newline
            if (currentLineNumber + 1 === textLineCount && textLineCount < minLines) {
                const newText = text + '\n'
                setText(newText)
                
                // Position cursor at the beginning of the new line
                const newPos = text.length + 1
                setCursorPosition(newPos)
                setCurrentLine(currentLineNumber + 2)
            }
        } 
        else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            // Let the normal behavior handle navigation within text content
            // But update our state afterwards
            setTimeout(() => {
                setCursorPosition(textarea.selectionStart)
                const newLineNumber = (text.substring(0, textarea.selectionStart).match(/\n/g) || []).length + 1
                setCurrentLine(newLineNumber)
            }, 0)
        }
        else if (e.key === 'b') {
            setCurrentLine(1)
        }
    }

    return (
        <div className="flex h-full w-full text-gray-200">
            {/* Line numbers */}
            <div 
                ref={lineCountRef} 
                className="p-2 text-right select-none overflow-hidden h-full w-10"
                style={{ lineHeight }}
            >
                {Array.from({ length: lineCount }, (_, i) => i + 1).map((num) => (
                    <div 
                        key={num} 
                        className={`${num === currentLine ? 'text-white font-bold' : 'text-gray-500'}`}
                        style={{ height: lineHeight }}
                    >
                        {num}
                    </div>
                ))}
            </div>
            
            {/* Editor area */}
            <div className="relative flex-grow">
                {/* Highlight current line */}
                {/* <div 
                    className="absolute pointer-events-none w-full"
                    style={{ 
                        top: `${(currentLine - 1) * parseFloat(lineHeight + 1)}px`,
                        height: lineHeight,
                        backgroundColor: 'rgba(55, 65, 81, 0.5)'
                    }}
                /> */}
                
                {/* Textarea */}
                <textarea
                    ref={textAreaRef}
                    value={text}
                    onChange={handleTextChange}
                    onSelect={handleCursorChange}
                    onKeyDown={handleKeyDown}
                    className="flex-grow p-2 outline-none font-mono resize-none h-full w-full bg-transparent"
                    style={{
                        lineHeight,
                        whiteSpace: 'pre-wrap',
                        overflowWrap: 'break-word',
                        caretColor: 'white'
                    }}
                    spellCheck={false}
                />
            </div>
        </div>
    )
}