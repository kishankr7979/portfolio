import { useState, useRef, useEffect } from "preact/hooks";
import { forwardRef } from "preact/compat";
import styled from "styled-components";
import AvailableKeywords from "./AvailableKeywords.jsx";

const Terminal = forwardRef(({ 
	logs = [], 
	keywords = [], 
	onExecuteCommand = () => {} 
}, ref) => {
	const [inputValue, setInputValue] = useState("");
	const [cmdHistory, setCmdHistory] = useState([]);
	const [historyPointer, setHistoryPointer] = useState(-1);
	const [tempInput, setTempInput] = useState("");
	const [suggestion, setSuggestion] = useState("");
	
	const consoleBottomRef = useRef(null);
	const inputRef = useRef(null);

	// Sync local ref with forwarded ref if present
	useEffect(() => {
		if (ref) {
			if (typeof ref === 'function') {
				ref(inputRef.current);
			} else {
				ref.current = inputRef.current;
			}
		}
	}, [ref]);

	// Auto scroll to bottom of console logs on updates
	useEffect(() => {
		if (consoleBottomRef.current) {
			consoleBottomRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [logs]);

	// Update autocomplete suggestion inline
	useEffect(() => {
		const val = inputValue.toLowerCase().trim();
		if (!val) {
			setSuggestion("");
			return;
		}
		
		const match = keywords.find(keyword => keyword.startsWith(val) && keyword !== val);
		if (match) {
			// Show the remaining portion of the word
			setSuggestion(match.slice(val.length));
		} else {
			setSuggestion("");
		}
	}, [inputValue, keywords]);

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			const commandStr = inputValue.trim();
			if (commandStr) {
				onExecuteCommand(commandStr);
				setCmdHistory([...cmdHistory, commandStr]);
				setInputValue("");
				setHistoryPointer(-1);
				setTempInput("");
				setSuggestion("");
			}
		} 
		else if (e.key === "ArrowUp") {
			e.preventDefault();
			if (cmdHistory.length === 0) return;

			let nextPointer = historyPointer + 1;
			if (nextPointer >= cmdHistory.length) return;

			if (historyPointer === -1) {
				setTempInput(inputValue);
			}

			setHistoryPointer(nextPointer);
			setInputValue(cmdHistory[cmdHistory.length - 1 - nextPointer]);
		} 
		else if (e.key === "ArrowDown") {
			e.preventDefault();
			if (historyPointer === -1) return;

			let nextPointer = historyPointer - 1;
			setHistoryPointer(nextPointer);
			
			if (nextPointer === -1) {
				setInputValue(tempInput);
				setTempInput("");
			} else {
				setInputValue(cmdHistory[cmdHistory.length - 1 - nextPointer]);
			}
		} 
		else if (e.key === "Tab") {
			e.preventDefault();
			// Complete the command
			const val = inputValue.toLowerCase().trim();
			if (!val) return;

			const match = keywords.find(keyword => keyword.startsWith(val));
			if (match) {
				setInputValue(match);
				setSuggestion("");
			}
		}
		else if (e.key === "ArrowRight" && suggestion) {
			// Complete via Right Arrow
			const val = inputValue.toLowerCase().trim();
			const match = keywords.find(keyword => keyword.startsWith(val));
			if (match) {
				setInputValue(match);
				setSuggestion("");
			}
		}
	};

	const handleKeywordClick = (keyword) => {
		onExecuteCommand(keyword);
		setCmdHistory([...cmdHistory, keyword]);
		setInputValue("");
		setHistoryPointer(-1);
		setTempInput("");
		setSuggestion("");
		if (inputRef.current) {
			inputRef.current.focus();
		}
	};

	return (
		<Container>
			<TerminalWindow>
				<TitleBar>
					<div className="dots">
						<span className="dot close"></span>
						<span className="dot minimize"></span>
						<span className="dot expand"></span>
					</div>
					<div className="title">kishan@macbook-pro: ~/portfolio</div>
				</TitleBar>
				
				<TerminalBody onClick={() => inputRef.current && inputRef.current.focus()}>
					<LogsContainer className="font-code">
						{logs.map((log, index) => {
							if (log.type === "command") {
								return (
									<div key={index} className="log-line command-line">
										<span className="prompt">kishan-k &gt;</span>
										<span className="command-text">{log.text}</span>
									</div>
								);
							} else if (log.type === "error") {
								return (
									<div key={index} className="log-line error-line">
										{log.content.map((line, i) => (
											<div key={i}>{line}</div>
										))}
									</div>
								);
							} else {
								return (
									<div key={index} className="log-line output-line">
										{log.content.map((line, i) => (
											<div key={i} className="output-row">{line}</div>
										))}
									</div>
								);
							}
						})}
						<div ref={consoleBottomRef} />
					</LogsContainer>

					<InputContainer className="font-code">
						<span className="prompt">kishan-k &gt;</span>
						<div className="input-wrapper">
							<input
								ref={inputRef}
								type="text"
								value={inputValue}
								onInput={(e) => setInputValue(e.target.value)}
								onKeyDown={handleKeyDown}
								autoFocus
								placeholder="Type 'help' for commands..."
								autoComplete="off"
								autoCapitalize="off"
								spellCheck={false}
							/>
							{suggestion && (
								<span className="suggestion-hint">{suggestion}</span>
							)}
						</div>
					</InputContainer>
				</TerminalBody>
			</TerminalWindow>
			
			<InstructionsPanel>
				<div className="helper-header">
					<h4>💡 Tip: Try autocomplete or click a command below:</h4>
				</div>
				<div className="keywords font-code">
					{keywords.map(kw => (
						<button key={kw} className="kw-btn" onClick={() => handleKeywordClick(kw)}>
							{kw}
						</button>
					))}
				</div>
				<p className="instruction-tips">
					Use <kbd>Tab</kbd> or <kbd>→</kbd> to autocomplete. Use <kbd>↑</kbd> <kbd>↓</kbd> for history.
				</p>
			</InstructionsPanel>
		</Container>
	);
});

export default Terminal;

/* Styled Components */

const Container = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	padding: 1.5rem;
	overflow: hidden;
	
	@media (max-width: 768px) {
		padding: 0.75rem;
	}
`;

const TerminalWindow = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
	border: 1px solid;
	transition: all 0.2s;
	min-height: 0; /* Important for flex child overflow scrolling */

	.dark & {
		background-color: #050811;
		border-color: #1e293b;
	}
	.light & {
		background-color: #0c111e; /* Keep dark background for CLI even in light mode for classic feel */
		border-color: #334155;
	}
`;

const TitleBar = styled.div`
	display: flex;
	align-items: center;
	height: 36px;
	padding: 0 1rem;
	border-bottom: 1px solid;
	user-select: none;
	background-color: #0b0f19;
	border-color: #1e293b;

	.dots {
		display: flex;
		gap: 8px;
		
		.dot {
			width: 12px;
			height: 12px;
			border-radius: 50%;
			
			&.close { background-color: #ef4444; }
			&.minimize { background-color: #f59e0b; }
			&.expand { background-color: #10b981; }
		}
	}

	.title {
		flex: 1;
		text-align: center;
		font-size: 0.75rem;
		font-family: 'Fira Code', monospace;
		color: #64748b;
	}
`;

const TerminalBody = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	padding: 1.25rem;
	overflow: hidden;
	cursor: text;
`;

const LogsContainer = styled.div`
	flex: 1;
	overflow-y: auto;
	margin-bottom: 1rem;
	display: flex;
	flex-direction: column;
	gap: 10px;
	font-size: 0.9rem;
	line-height: 1.5;
	
	&::-webkit-scrollbar {
		width: 6px;
	}
	&::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 3px;
	}

	.log-line {
		white-space: pre-wrap;
		word-break: break-all;
	}

	.command-line {
		display: flex;
		align-items: center;
		color: #38bdf8; /* sky-400 */
		font-weight: 500;
	}

	.prompt {
		color: #10b981; /* emerald-500 */
		margin-right: 10px;
		font-weight: bold;
		user-select: none;
	}

	.command-text {
		color: #f8fafc;
	}

	.error-line {
		color: #f87171; /* red-400 */
		font-weight: 500;
	}

	.output-line {
		color: #cbd5e1; /* slate-300 */
		
		.output-row {
			margin-bottom: 2px;
		}
	}
`;

const InputContainer = styled.div`
	display: flex;
	align-items: center;
	font-size: 0.9rem;
	border-top: 1px solid rgba(255, 255, 255, 0.05);
	padding-top: 0.75rem;
	
	.prompt {
		color: #10b981;
		margin-right: 10px;
		font-weight: bold;
		user-select: none;
	}

	.input-wrapper {
		flex: 1;
		position: relative;
		display: flex;
		align-items: center;
		
		input {
			flex: 1;
			background: transparent;
			border: none;
			outline: none;
			color: #f8fafc;
			font-family: inherit;
			font-size: inherit;
			padding: 0;
			margin: 0;
			z-index: 2;
			caret-color: #38bdf8;
		}
		
		.suggestion-hint {
			position: absolute;
			left: 0;
			color: #475569; /* Slate 600 */
			pointer-events: none;
			z-index: 1;
		}
	}
`;

const InstructionsPanel = styled.div`
	margin-top: 1rem;
	padding: 1rem;
	border-radius: 8px;
	border: 1px solid;
	transition: all 0.2s;
	
	.dark & {
		background-color: #0d1222;
		border-color: #1e293b;
		color: #94a3b8;
	}
	.light & {
		background-color: #f1f5f9;
		border-color: #e2e8f0;
		color: #475569;
	}

	.helper-header {
		margin-bottom: 0.75rem;
		h4 {
			margin: 0;
			font-size: 0.8rem;
			font-weight: 600;
		}
	}

	.keywords {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-bottom: 0.75rem;
	}

	.kw-btn {
		background: rgba(59, 130, 246, 0.1);
		border: 1px solid rgba(59, 130, 246, 0.2);
		color: #3b82f6;
		padding: 4px 10px;
		font-size: 0.75rem;
		border-radius: 4px;
		cursor: pointer;
		font-weight: 500;
		transition: all 0.15s;
		
		&:hover {
			background: #3b82f6;
			color: #ffffff;
		}
	}

	.instruction-tips {
		margin: 0;
		font-size: 0.7rem;
		opacity: 0.7;
		
		kbd {
			background: rgba(128, 128, 128, 0.15);
			padding: 1px 4px;
			border-radius: 3px;
			font-size: 0.65rem;
			border: 1px solid rgba(128, 128, 128, 0.2);
		}
	}
`;

const fontCode = styled.div`
	font-family: 'Fira Code', monospace;
`;
