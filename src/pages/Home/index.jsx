import { useState, useRef, useContext, useEffect } from "preact/hooks";
import styled from "styled-components";
import { displayMode, performOperation, portfolioData, validKeywords } from "../../utils/index.js";
import { Button, useColorMode, Badge } from '@chakra-ui/react';
import { GlobalContext } from "../../context/GlobalContext.jsx";
import GUIPortfolio from "../../components/GUI";
import Terminal from "../../components/Terminal.jsx";
import { FiTerminal, FiLayout, FiGitBranch, FiSun, FiMoon } from 'react-icons/fi';

export function Home() {
	const [value, setValue] = useState("");
	const terminalRef = useRef(null);
	
	// Maintain actual scrollable history logs for the terminal (like a real CLI)
	const [logs, setLogs] = useState([
		{ 
			type: "output", 
			content: [
				"============================================================",
				"  KISHAN KUMAR - PORTFOLIO TERMINAL [v1.0.0]",
				"  Type 'help' to list all commands, or switch to GUI mode above.",
				"============================================================"
			] 
		}
	]);

	const appContext = useContext(GlobalContext);
	const isCLIActive = appContext.appStore.isCLIActive;

	const onToggle = () => {
		const { updateStore } = appContext;
		updateStore({ isCLIActive: !isCLIActive });
	};

	// Synchronize isCLIActive with the URL query parameters
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const modeStr = isCLIActive ? "cli" : "gui";
		if (params.get("mode") !== modeStr) {
			params.set("mode", modeStr);
			const newUrl = `${window.location.pathname}?${params.toString()}`;
			window.history.replaceState({ path: newUrl }, "", newUrl);
		}
		localStorage.setItem("userPreference", isCLIActive ? "CLI" : "GUI");
	}, [isCLIActive]);

	const executeCommand = (cmdText) => {
		const command = performOperation(cmdText);
		
		if (cmdText.toLowerCase().trim() === "clear") {
			setLogs([]);
			return;
		}

		const newLogs = [...logs];
		
		// Add command input line
		newLogs.push({
			type: "command",
			text: cmdText
		});

		if (!command.error) {
			if (cmdText.toLowerCase().trim() === "resume") {
				window.open(
					"https://drive.google.com/file/d/1J6kgGD9TO_gjpFbZYm1500N-NhjP9e1y/view",
					"mywindow",
					"menubar=1,resizable=1,width=800,height=800"
				);
			}
			newLogs.push({
				type: "output",
				content: Array.isArray(command.data.message) ? command.data.message : [command.data.message]
			});
		} else {
			newLogs.push({
				type: "error",
				content: [command.data.message]
			});
		}

		setLogs(newLogs);
	};

	const onEnter = (event) => {
		if (event.key === "Enter") {
			const text = event.target.value;
			if (text.trim()) {
				executeCommand(text);
				setValue("");
				if (terminalRef.current) {
					terminalRef.current.value = "";
				}
			}
		}
	};

	const { colorMode, toggleColorMode } = useColorMode();

	useEffect(() => {
		document.body.className = colorMode;
	}, [colorMode]);

	return (
		<Parent className={colorMode}>
			<Header className={colorMode}>
				<div className="header-left">
					<span className="logo">kishankumar</span>
					<Badge colorScheme="emerald" variant="subtle" className="branch-badge">
						<FiGitBranch style={{ marginRight: '4px' }} /> main
					</Badge>
					<span className="dot-indicator pulse"></span>
					<span className="status-text">Active Now</span>
				</div>
				<div className="header-right">
					<div className="toggle-container">
						<button 
							className={`toggle-btn ${!isCLIActive ? 'active' : ''}`}
							onClick={() => isCLIActive && onToggle()}
						>
							<FiLayout size={14} /> GUI
						</button>
						<button 
							className={`toggle-btn ${isCLIActive ? 'active' : ''}`}
							onClick={() => !isCLIActive && onToggle()}
						>
							<FiTerminal size={14} /> CLI
						</button>
					</div>
					<Button 
						onClick={toggleColorMode}
						size="sm"
						variant="ghost"
						borderRadius="full"
						width="36px"
						height="36px"
						p={0}
						className="theme-toggle"
					>
						{colorMode === 'light' ? <FiMoon size={16} /> : <FiSun size={16} />}
					</Button>
				</div>
			</Header>
			<MainContent>
				{isCLIActive ? (
					<Terminal 
						value={value} 
						onEnter={onEnter} 
						logs={logs}
						keywords={validKeywords}
						terminalRef={terminalRef}
						onExecuteCommand={executeCommand}
					/>
				) : (
					<GUIPortfolio data={portfolioData} />
				)}
			</MainContent>
		</Parent>
	);
}

const Parent = styled.div`
	min-height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	transition: background-color 0.2s, color 0.2s;
	
	&.light {
		background-color: #f8fafc; /* Slate 50 */
		color: #0f172a; /* Slate 900 */
	}
	
	&.dark {
		background-color: #0b0f19; /* Deep Slate/Navy 950 */
		color: #f1f5f9; /* Slate 100 */
	}
`;

const Header = styled.header`
	display: flex;
	padding: 0.75rem 2rem;
	justify-content: space-between;
	align-items: center;
	position: sticky;
	top: 0;
	z-index: 100;
	border-bottom: 1px solid;
	transition: all 0.2s;
	
	&.light {
		background-color: rgba(255, 255, 255, 0.8);
		backdrop-filter: blur(8px);
		border-color: #e2e8f0; /* Slate 200 */
	}
	
	&.dark {
		background-color: rgba(11, 15, 25, 0.8);
		backdrop-filter: blur(8px);
		border-color: #1e293b; /* Slate 800 */
	}

	.header-left {
		display: flex;
		gap: 12px;
		align-items: center;
		
		.logo {
			font-weight: 700;
			font-size: 1.1rem;
			font-family: 'Outfit', sans-serif;
			letter-spacing: -0.5px;
		}

		.branch-badge {
			display: flex;
			align-items: center;
			font-family: 'Fira Code', monospace;
			font-size: 0.75rem;
			padding: 2px 8px;
			border-radius: 4px;
		}

		.dot-indicator {
			width: 8px;
			height: 8px;
			border-radius: 55%;
			background-color: #10b981; /* Emerald 500 */
			
			&.pulse {
				box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
				animation: pulse-ring 1.5s cubic-bezier(0.215, 0.610, 0.355, 1) infinite;
			}
		}

		.status-text {
			font-size: 0.75rem;
			font-weight: 500;
			opacity: 0.7;
			@media (max-width: 600px) {
				display: none;
			}
		}
	}

	.header-right {
		display: flex;
		gap: 12px;
		align-items: center;
		
		.toggle-container {
			display: flex;
			background: rgba(0, 0, 0, 0.05);
			padding: 3px;
			border-radius: 99px;
			border: 1px solid rgba(0, 0, 0, 0.05);
			
			.dark & {
				background: rgba(255, 255, 255, 0.05);
				border-color: rgba(255, 255, 255, 0.05);
			}
			
			.toggle-btn {
				display: flex;
				align-items: center;
				gap: 6px;
				padding: 5px 14px;
				border-radius: 99px;
				font-size: 0.8rem;
				font-weight: 600;
				font-family: 'Outfit', sans-serif;
				border: none;
				background: transparent;
				cursor: pointer;
				transition: all 0.2s;
				color: inherit;
				opacity: 0.7;
				
				&:hover {
					opacity: 1;
				}
				
				&.active {
					background: #ffffff;
					color: #0f172a;
					opacity: 1;
					box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
					
					.dark & {
						background: #1e293b;
						color: #ffffff;
						box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
					}
				}
			}
		}
		
		.theme-toggle {
			color: inherit;
			&:hover {
				background: rgba(0, 0, 0, 0.05);
				.dark & {
					background: rgba(255, 255, 255, 0.05);
				}
			}
		}
	}

	@keyframes pulse-ring {
		0% {
			transform: scale(0.95);
			box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
		}
		70% {
			transform: scale(1);
			box-shadow: 0 0 0 6px rgba(16, 185, 129, 0);
		}
		100% {
			transform: scale(0.95);
			box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
		}
	}
`;

const MainContent = styled.main`
	flex: 1;
	width: 100%;
	height: calc(100vh - 57px); /* Subtract header height */
	overflow: hidden;
	display: flex;
	flex-direction: column;
`;