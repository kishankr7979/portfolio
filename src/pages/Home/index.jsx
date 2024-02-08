import './style.css';
import Terminal from "../../components/Terminal.jsx";
import {useState, useRef, useContext} from "preact/hooks";
import styled from "styled-components";
import {displayMode, performOperation, portfolioData, validKeywords} from "../../utils/index.js";
import { Button } from '@chakra-ui/react'
import {GlobalContext} from "../../context/GlobalContext.jsx";
import GUIPortfolio from "../../components/GUI";

export function Home() {
	const [value, setValue] = useState("kishan's-portfolio: ");
	const terminalRef = useRef(null);
	const [history, setHistory] = useState({
		error: false,
		data: []
	});
	const appContext = useContext(GlobalContext);

	const toggleLabel = appContext.appStore.isCLIActive ? 'GUI' : 'CLI';


	const onToggle = () => {
		const { updateStore } = appContext;
		updateStore({isCLIActive: !appContext.appStore.isCLIActive})
	}

	const clearAllState = () => setValue(() => {
		setHistory({error: false, data: []});
		return '';
	})


	const onEnter = (event) => {
		const value = event.target.value.replace("kishan's-portfolio: ", "").trim();
		setValue((prevValue) => `kishan's-portfolio: ${value}`);
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
				setValue('');
				setHistory({...history, error: true, data: [...history.data, errorValue]});
			}

		}
	};


	return (
		<Parent>
			<Header>
				<span>{displayMode[toggleLabel]} - Kishan's Portfolio</span>
				<div>
					<span>Toggle {toggleLabel} Mode</span>
					<Button colorScheme='teal' size='md' onClick={onToggle}>
						{toggleLabel}
					</Button>
				</div>
			</Header>
			{appContext.appStore.isCLIActive && <Terminal value={value} onEnter={onEnter} ref={terminalRef} data={history} keywords={validKeywords}/>}
			{!appContext.appStore.isCLIActive && <GUIPortfolio data={portfolioData} /> }
		</Parent>
	);
}


const Parent = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;

`;

const Header = styled.div`
      display: flex;
      padding: 1rem;
      background: lightgray;
      font-family: terminal;
      font-size: 18px;
      justify-content: space-between;
	div {
		display: flex;
		gap: 8px;
		align-items: center;
	}
	span {
		font-size: 20px;
	}
`;