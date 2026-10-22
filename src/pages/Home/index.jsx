import { useState, useEffect, useContext } from "preact/hooks";
import { FiTerminal, FiLayout, FiSun, FiMoon } from "react-icons/fi";
import { performOperation, portfolioData, validKeywords } from "../../utils/index.js";
import { GlobalContext } from "../../context/GlobalContext.jsx";
import GUI from "../../components/GUI.jsx";
import Terminal from "../../components/Terminal.jsx";

const introLogs = () => [
	{ type: "output", content: ["Kishan Kumar's portfolio. Type 'help' for commands, or click one below."] },
	{ type: "command", text: "intro" },
	{ type: "output", content: performOperation("intro").data.message }
];

const getInitialTheme = () => {
	try {
		const saved = localStorage.getItem("theme");
		if (saved === "light" || saved === "dark") return saved;
	} catch (e) {}
	return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
};

export function Home() {
	const { appStore, updateStore } = useContext(GlobalContext);
	const isCLI = appStore.isCLIActive;
	const [theme, setTheme] = useState(getInitialTheme);
	const [logs, setLogs] = useState(introLogs);

	useEffect(() => {
		document.documentElement.dataset.theme = theme;
		try { localStorage.setItem("theme", theme); } catch (e) {}
	}, [theme]);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const mode = isCLI ? "cli" : "gui";
		if (params.get("mode") !== mode) {
			params.set("mode", mode);
			window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
		}
		try { localStorage.setItem("userPreference", isCLI ? "CLI" : "GUI"); } catch (e) {}
	}, [isCLI]);

	const executeCommand = (text) => {
		const cmd = text.toLowerCase().trim();
		if (cmd === "clear") return setLogs([]);
		const res = performOperation(text);
		const next = [...logs, { type: "command", text }];
		if (res.error) {
			next.push({ type: "error", content: [res.data.message] });
		} else {
			const msg = res.data.message;
			next.push({ type: "output", content: Array.isArray(msg) ? msg : [msg] });
			if (cmd === "resume") window.open(portfolioData.intro.resumeUrl, "_blank", "noopener");
		}
		setLogs(next);
	};

	return (
		<div className={`app ${isCLI ? "is-cli" : "is-gui"}`}>
			<header className="topbar">
				<a className="brand" href="?mode=gui" onClick={(e) => { e.preventDefault(); updateStore({ isCLIActive: false }); }}>kk<span>_</span></a>
				<div className="controls">
					<div className="seg" role="group" aria-label="View mode">
						<button aria-pressed={!isCLI} onClick={() => updateStore({ isCLIActive: false })}><FiLayout aria-hidden="true" /> GUI</button>
						<button aria-pressed={isCLI} onClick={() => updateStore({ isCLIActive: true })}><FiTerminal aria-hidden="true" /> CLI</button>
					</div>
					<button
						className="icon-btn"
						aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
						onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
					>
						{theme === "dark" ? <FiSun /> : <FiMoon />}
					</button>
				</div>
			</header>
			<main>
				{isCLI ? (
					<Terminal logs={logs} keywords={validKeywords} onExecuteCommand={executeCommand} />
				) : (
					<GUI data={portfolioData} />
				)}
			</main>
		</div>
	);
}
