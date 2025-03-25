'use client'
// import React, { useState, useRef } from 'react';
// import { Wrapper } from './styles/Terminal.styled';
// import Powerline from './terminal/powerline';

// interface HistoryEntry {
//     command: string;
//     output: string;
//     error: boolean;
// }

// const Terminal: React.FC = () => {
//     const [history, setHistory] = useState<HistoryEntry[]>([]);
//     const [currentPath, setCurrentPath] = useState<string>('/'); // Current directory path
//     const [fileSystem, setFileSystem] = useState<Record<string, any>>({
//         '/home': {
//             'andy': {}
//         }, // Root directory
//     });
//     const inputRef = useRef<HTMLInputElement>(null);

//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         if (inputRef.current) {
//             const command = inputRef.current.value.trim();
//             inputRef.current.value = '';

//             if (command) {
//                 let output = '';
//                 let error = false;

//                 const args = command.split(' ');
//                 const cmd = args[0];
//                 const params = args.slice(1);

//                 switch (cmd) {
//                     case 'ls': {
//                         const currentDir = fileSystem[currentPath];
//                         if (currentDir) {
//                             output = Object.keys(currentDir).join('  ') || 'Empty directory';
//                         } else {
//                             output = `ls: cannot access '${currentPath}': No such file or directory`;
//                             error = true;
//                         }
//                         break;
//                     }
//                     case 'cd': {
//                         const targetPath = params[0];
//                         if (targetPath === '..') {
//                             const parentPath = currentPath.split('/').slice(0, -1).join('/') || '/';
//                             setCurrentPath(parentPath);
//                         } else if (fileSystem[currentPath]?.[targetPath]) {
//                             setCurrentPath(`${currentPath}/${targetPath}`.replace('//', '/'));
//                         } else {
//                             output = `cd: ${targetPath}: No such file or directory`;
//                             error = true;
//                         }
//                         break;
//                     }
//                     case 'mkdir': {
//                         const dirName = params[0];
//                         if (dirName) {
//                             if (!fileSystem[currentPath]?.[dirName]) {
//                                 fileSystem[currentPath][dirName] = {};
//                                 setFileSystem({ ...fileSystem });
//                                 output = `Directory '${dirName}' created`;
//                             } else {
//                                 output = `mkdir: cannot create directory '${dirName}': File exists`;
//                                 error = true;
//                             }
//                         } else {
//                             output = 'mkdir: missing operand';
//                             error = true;
//                         }
//                         break;
//                     }
//                     case 'pwd': {
//                         output = currentPath;
//                         break;
//                     }
//                     default: {
//                         output = `Command not found: ${cmd}`;
//                         error = true;
//                         break;
//                     }
//                 }

//                 setHistory((prevHistory) => [
//                     ...prevHistory,
//                     { command, output, error },
//                 ]);
//             }
//         }
//     };

//     return (
//         <Wrapper>
//             <div>
//                 {history.map((entry, index) => (
//                     <div key={index}>
//                         <Powerline />
//                         <div>{entry.command}</div>
//                         <div style={{ color: entry.error ? 'red' : 'white' }}>{entry.output}</div>
//                     </div>
//                 ))}
//                 <form onSubmit={handleSubmit}>
//                     <Powerline />
//                     <input
//                         ref={inputRef}
//                         type="text"
//                         className="outline-none"
//                         autoFocus
//                         placeholder="Type a command..."
//                     />
//                 </form>
//             </div>
//         </Wrapper>
//     );
// };

// export default Terminal;

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

// Styled Components
const TerminalContainer = styled.div`
  background-color: #1e1e1e;
  color: #00ff00;
  font-family: 'Courier New', monospace;
  width: 100%;
  max-width: 800px;
  height: 500px;
  margin: 0 auto;
  padding: 20px;
  overflow-y: auto;
  border-radius: 8px;
`;

const InputLine = styled.div`
  display: flex;
  align-items: center;
`;

const Prompt = styled.span`
  color: #00ff00;
  margin-right: 10px;
`;

const Input = styled.input`
  background: none;
  border: none;
  color: #00ff00;
  font-family: 'Courier New', monospace;
  font-size: 16px;
  flex-grow: 1;
  outline: none;
`;

const OutputLine = styled.div<{ error?: boolean }>`
  color: ${props => props.error ? 'red' : '#00ff00'};
`;

const TerminalEmulator = () => {
    const [currentDir, setCurrentDir] = useState('/home/andy');
    const [history, setHistory] = useState<{ command: string; output: string; dir: string; error: boolean }[]>([]);
    const [fileSystem, setFileSystem] = useState<{ [key: string]: { [key: string]: any } }>({
        '/home': {
            'andy': {}
        }
    });
    const inputRef = useRef<HTMLInputElement>(null);
    const terminalRef = useRef<HTMLDivElement>(null);

    // Normalize path
    const normalizePath = (path: String) => {
        if (path.startsWith('/')) return path;
        return `${currentDir}/${path}`;
    };

    // Resolve full path
    const resolvePath = (path: String) => {
        const parts = path.split('/').filter(p => p && p !== '.');
        const resolved = [];

        for (let part of parts) {
            if (part === '..') {
                resolved.pop();
            } else {
                resolved.push(part);
            }
        }

        return '/' + resolved.join('/');
    };

    // Handle command submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const input = inputRef.current?.value.trim() || '';
        const [command, ...args] = input.split(' ');

        let output = '';
        let error = false;

        switch (command) {
            case 'cd':
                if (args.length === 0) {
                    // Default to home directory
                    setCurrentDir('/home/andy');
                    output = '';
                } else {
                    const targetPath = normalizePath(args[0]);
                    const resolvedPath = resolvePath(targetPath);

                    // Simple path validation (you'd want more robust checking in a real system)
                    if (resolvedPath.startsWith('/home')) {
                        setCurrentDir(resolvedPath);
                        output = '';
                    } else {
                        output = `cd: ${args[0]}: No such file or directory`;
                        error = true;
                    }
                }
                break;

            case 'mkdir':
                if (args.length === 0) {
                    output = 'mkdir: missing operand';
                    error = true;
                } else {
                    const dirPath = normalizePath(args[0]);
                    const resolvedPath = resolvePath(dirPath);

                    // Ensure we're creating directories under /home
                    if (resolvedPath.startsWith('/home')) {
                        const pathParts = resolvedPath.split('/').filter(p => p);

                        let currentLevel = fileSystem;
                        for (let part of pathParts) {
                            if (!currentLevel[part]) {
                                currentLevel[part] = {};
                            }
                            currentLevel = currentLevel[part];
                        }

                        setFileSystem({ ...fileSystem });
                        output = '';
                    } else {
                        output = `mkdir: cannot create directory '${args[0]}': Permission denied`;
                        error = true;
                    }
                }
                break;

            case 'touch':
                if (args.length === 0) {
                    output = 'touch: missing file operand';
                    error = true;
                } else {
                    const filePath = normalizePath(args[0]);
                    const resolvedPath = resolvePath(filePath);

                    // Ensure we're creating files under /home
                    if (resolvedPath.startsWith('/home')) {
                        const pathParts = resolvedPath.split('/').filter(p => p);
                        const fileName = pathParts.pop();

                        let currentLevel = fileSystem;
                        for (let part of pathParts) {
                            if (!currentLevel[part]) {
                                currentLevel[part] = {};
                            }
                            currentLevel = currentLevel[part];
                        }


                        // Create file (represented as an empty object)
                        if (fileName) {
                            currentLevel[fileName] = { content: '' };
                        } else {
                            output = 'touch: missing file operand';
                            error = true;
                        }

                        setFileSystem({ ...fileSystem });
                        output = '';
                    } else {
                        output = `touch: cannot touch '${args[0]}': Permission denied`;
                        error = true;
                    }
                }
                break;

            case 'pwd':
                output = currentDir;
                break;

            case 'clear':
                setHistory([]);
                break;

            case 'ls':
                const currentDirectory: Record<string, any> | undefined = fileSystem[currentDir]
                if (currentDirectory) {
                    output = Object.keys(currentDirectory).join('  ') || 'Empty directory'
                } else {
                    output = `ls: cannot access '${currentDir}': No such file or directory`
                    error = true
                }
                break


            default:
                if (input) {
                    output = `${command}: command not found`;
                    error = true;
                }
        }

        // Add to history
        setHistory(prev => [
            ...prev,
            {
                command: input,
                output,
                dir: currentDir,
                error
            }
        ]);

        // Clear input
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    // Autoscroll to bottom
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    return (
        <TerminalContainer ref={terminalRef}>
            {history.map((entry, index) => (
                <React.Fragment key={index}>
                    <InputLine>
                        <Prompt>{entry.dir}$</Prompt>
                        {entry.command}
                    </InputLine>
                    {entry.output && (
                        <OutputLine error={entry.error}>
                            {entry.output}
                        </OutputLine>
                    )}
                </React.Fragment>
            ))}
            <form onSubmit={handleSubmit}>
                <InputLine>
                    <Prompt>{currentDir}$</Prompt>
                    <Input
                        ref={inputRef}
                        autoFocus
                        onClick={(e) => e.currentTarget.focus()}
                    />
                </InputLine>
            </form>
        </TerminalContainer>
    );
};

export default TerminalEmulator;