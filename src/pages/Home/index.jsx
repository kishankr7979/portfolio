import { useState, useRef, useContext, useEffect } from "preact/hooks";
import styled, { keyframes } from "styled-components";
import { displayMode, performOperation, portfolioData, validKeywords } from "../../utils/index.js";
import { Button, useColorMode } from '@chakra-ui/react';
import { GlobalContext } from "../../context/GlobalContext.jsx";
import GUIPortfolio from "../../components/GUI";
import Terminal from "../../components/Terminal.jsx";
import { FiTerminal, FiLayout } from 'react-icons/fi';

export function Home() {
	const [value, setValue] = useState("");
	const terminalRef = useRef(null);
	const [history, setHistory] = useState({
		error: false,
		data: []
	});
	const appContext = useContext(GlobalContext);

	const toggleLabel = appContext.appStore.isCLIActive ? 'GUI' : 'CLI';

  console.log(appContext)



	const onToggle = () => {
		const { updateStore } = appContext;
		updateStore({isCLIActive: !appContext.appStore.isCLIActive})
	}

	const clearAllState = () => setValue(() => {
		setHistory({error: false, data: []});
		return '';
	})


	const onEnter = (event) => {
		const value = event.target.value.trim();
		setValue(value);
		if(event.key === "Enter") {
			const command = performOperation(value);
			if(!command.error) {
				clearAllState()
				if(command.message) {
					clearAllState()
				}
				else {
					if (typeof command.data.message === 'object') {

						setHistory({error: false, data: command.data.message})
					} else {
						if(value === 'resume') {
							window.open (command.data.message,
								"mywindow","menubar=1,resizable=1,width=550,height=550")
						}
						setHistory({error: false, data: [command.data.message]})
					}
				}
			}
			else {
				clearAllState();
				const {message} = command.data;
				const errorValue = `error: ${value} - ${message}\n`
				setValue("");
				setHistory({...history, error: true, data: [...history.data, errorValue]});
			}

		}
	};


	const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    // Apply theme class to body for global styles
    document.body.className = colorMode;
  }, [colorMode]);

  useEffect(() => {
    onToggle()
  }, [])


  return (
    <Parent className={colorMode}>
      <Header>
        <div className="header-left">
          <span className="mode-indicator">
            {appContext.appStore.isCLIActive ? <FiTerminal /> : <FiLayout />}
            {displayMode[toggleLabel]} - Kishan's Portfolio
          </span>
        </div>
        <div className="header-right">
          <Button 
            leftIcon={appContext.appStore.isCLIActive ? <FiLayout /> : <FiTerminal />} 
            onClick={onToggle}
            variant="outline"
            size="sm"
            mr={2}
          >
            Switch to {toggleLabel}
          </Button>
          <Button 
            onClick={toggleColorMode}
            size="sm"
            variant="ghost"
          >
            {colorMode === 'light' ? '🌙' : '☀️'}
          </Button>
        </div>
      </Header>
      <MainContent>
        {appContext.appStore.isCLIActive ? (
          <Terminal 
            value={value} 
            onEnter={onEnter} 
            data={history}
            keywords={validKeywords}
            terminalRef={terminalRef}
          />
        ) : (
          <GUIPortfolio data={portfolioData} />
        )}
      </MainContent>
    </Parent>
  );
}


const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Parent = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  transition: all 0.3s ease;
`;

const Header = styled.header`
  display: flex;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.headerBg};
  font-family: 'VT323', monospace;
  font-size: 1.1rem;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  animation: ${fadeIn} 0.5s ease-out;
	div {
		display: flex;
		gap: 8px;
		align-items: center;
	}
	span {
		font-size: 20px;
	}
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  animation: ${fadeIn} 0.6s ease-out;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;