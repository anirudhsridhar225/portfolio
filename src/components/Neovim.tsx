'use client'
import React, { useEffect, useRef, useState } from 'react'

export default function Neovim() {
    const [text, setText] = useState<string>('')
    const [currentLine, setCurrentLine] = useState<number>(1) // Start at line 1
    const [cursorPosition, setCursorPosition] = useState<number>(0)
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const lineCountRef = useRef<HTMLDivElement>(null)

    const minLines = 35 // Set a minimum number of lines to display
    
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
        if (textAreaRef.current) {
            const textarea = textAreaRef.current
            
            // Set cursor position
            textarea.setSelectionRange(cursorPosition, cursorPosition)
            
            // Focus the textarea 
            textarea.focus()
        }
    }, [cursorPosition])

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
        const newText = e.target.value
        setText(newText)
        
        // Update cursor position
        setCursorPosition(e.target.selectionStart)
    }

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
        const textarea = textAreaRef.current
        if (!textarea) return
        
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
    }

    // Calculate line heights to match textarea (helps with alignment)
    const lineHeight = '1.5rem'

    return (
        <div className="flex h-full bg-gray-900 text-gray-200">
            {/* Line numbers */}
            <div 
                ref={lineCountRef} 
                className="p-2 text-right select-none overflow-hidden h-full bg-gray-800 w-12"
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
                <div 
                    className="absolute pointer-events-none w-full"
                    style={{ 
                        top: `${(currentLine - 1) * parseFloat(lineHeight)}px`,
                        height: lineHeight,
                        backgroundColor: 'rgba(55, 65, 81, 0.5)'
                    }}
                />
                
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