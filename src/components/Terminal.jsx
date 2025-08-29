import { forwardRef } from "preact/compat";
import styled, { keyframes } from "styled-components";
import AvailableKeywords from "./AvailableKeywords.jsx";
import { Input, InputGroup, InputLeftAddon, Box, keyframes as chakraKeyframes } from "@chakra-ui/react";

const blink = chakraKeyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;
 
// Define prop types
const Terminal = forwardRef(({ 
  value = '', 
  data = { data: [], error: false }, 
  onEnter = () => {}, 
  keywords = [] 
}, ref) => {
    const errorStyle = {
        color: data.error ? 'red' : '#ffffff'
    }

    return (
        <Container>
            <TerminalContent>
                {data.data.length > 0 && (
                    <div className='history'>
                        {data.data.map((item, index) => (
                            <div key={index} className='history-line'>
                                <span className='prompt'></span>
                                <span className='command' style={errorStyle}>{item}</span>
                            </div>
                        ))}
                    </div>
                )}
                <Box width="100%" px={2}>
                    <InputGroup size="md">
                        <InputLeftAddon 
                            bg="transparent" 
                            border="none" 
                            color="#64ffda"
                            p={0}
                            pr={2}
                        >
                            kishan's-portfolio >
                        </InputLeftAddon>
                        <Input
                            variant="unstyled"
                            value={value}
                            onChange={(e) => {
                                if (ref && typeof ref === 'object' && 'current' in ref) {
                                    ref.current.value = e.target.value;
                                }
                            }}
                            onKeyUp={onEnter}
                            ref={ref}
                            autoFocus
                            placeholder="Type 'help' for available commands"
                            color="#e6f1ff"
                            fontFamily="'VT323', monospace"
                            _placeholder={{ opacity: 0.7, color: '#495670' }}
                            _focus={{ boxShadow: 'none' }}
                        />
                        {!value && (
                            <Box
                                as="span"
                                position="absolute"
                                right="8px"
                                top="50%"
                                transform="translateY(-50%)"
                                width="2px"
                                height="1.2rem"
                                sx={{
                                    '@keyframes blink': {
                                        '0%, 100%': { opacity: 1 },
                                        '50%': { opacity: 0 }
                                    },
                                    animation: 'blink 1s step-end infinite'
                                }}
                            />
                        )}
                    </InputGroup>
                </Box>
            </TerminalContent>
            <div className='keywords'>
                <h3>Available Commands: </h3>
                <AvailableKeywords keywords={keywords}/>
            </div>
        </Container>
    );
});

export default Terminal;

const cursorBlink = keyframes`
  0%, 100% { border-right: 2px solid #64ffda; }
  50% { border-right-color: transparent; }
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background: #0a192f;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  
  .keywords {
    background: #0a1a3a;
    padding: 1.5rem;
    border-top: 1px solid #1e2a4a;
    
    h3 {
      color: #64ffda;
      font-family: 'VT323', monospace;
      font-size: 1.2rem;
      margin: 0 0 1rem 0;
      letter-spacing: 1px;
    }
  }
`;

const TerminalContent = styled.div`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  
  .history {
    margin-bottom: 1rem;
    
    .history-line {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;
      line-height: 1.5;
      
      .prompt {
        color: #64ffda;
        margin-right: 0.75rem;
        font-family: 'VT323', monospace;
        font-size: 1.1rem;
      }
      
      .command {
        color: #e6f1ff;
        font-family: 'VT323', monospace;
        font-size: 1.1rem;
        word-break: break-word;
      }
    }
  }
`;

const InputLine = styled.div`
`;

// Remove the old Input styles since we're using Chakra UI's Input
