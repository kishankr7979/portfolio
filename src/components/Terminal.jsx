import { useState, useRef, useEffect } from "preact/hooks";
import { forwardRef } from "preact/compat";

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
			consoleBottomRef.current.scrollIntoView({ block: "nearest" });
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
		<div className="term-wrap">
			<div className="term-window">
				<div className="term-bar">
					<span className="dots" aria-hidden="true"><i /><i /><i /></span>
					<span className="term-title">kishan@noida: ~</span>
				</div>
				<div className="term-body" onClick={() => inputRef.current && inputRef.current.focus()}>
					<div className="term-logs" role="log" aria-live="polite">
						{logs.map((log, index) => {
							if (log.type === "command") {
								return (
									<div key={index} className="log-line command-line">
										<span className="prompt">$</span>
										<span className="command-text">{log.text}</span>
									</div>
								);
							}
							return (
								<div key={index} className={`log-line ${log.type === "error" ? "error-line" : "output-line"}`}>
									{log.content.map((line, i) => (
										<div key={i} className="output-row">{line || "\u00a0"}</div>
									))}
								</div>
							);
						})}
						<div ref={consoleBottomRef} />
					</div>
					<div className="term-input">
						<span className="prompt">$</span>
						<div className="input-wrapper">
							<input
								ref={inputRef}
								type="text"
								aria-label="Terminal command"
								value={inputValue}
								onInput={(e) => setInputValue(e.target.value)}
								onKeyDown={handleKeyDown}
								placeholder="type a command, e.g. projects"
								autoComplete="off"
								autoCapitalize="off"
								spellCheck={false}
							/>
							{suggestion && <span className="suggestion-hint">{inputValue + suggestion}</span>}
						</div>
					</div>
				</div>
			</div>
			<div className="term-help">
				<div className="keywords">
					{keywords.map((kw) => (
						<button key={kw} className="kw-btn" onClick={() => handleKeywordClick(kw)}>{kw}</button>
					))}
				</div>
				<p>Tab or → completes. ↑ ↓ for history.</p>
			</div>
		</div>
	);
});

export default Terminal;

