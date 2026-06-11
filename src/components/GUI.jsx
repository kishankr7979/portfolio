import { useState } from "preact/hooks";
import styled from "styled-components";
import { 
	FiFileText, FiCode, FiTerminal, FiChevronDown, FiChevronRight, 
	FiFolder, FiCpu, FiExternalLink, FiMail, FiLinkedin, 
	FiGithub, FiPhone, FiCopy, FiCheck 
} from "react-icons/fi";
import { Badge, Box } from "@chakra-ui/react";

const FILE_DATA = {
	"about.md": {
		name: "about.md",
		icon: FiFileText,
		color: "#4fc1ff",
		type: "markdown",
		raw: `# Kishan Kumar

Full-stack product engineer with 4+ years of experience building scalable web platforms, SDKs, and performance-critical systems in fintech and SaaS environments.

* **Email:** kishankr.0210@gmail.com
* **Mobile:** +91-7979060284
* **Location:** Noida / Hyderabad, India
* **Current Role:** Senior Software Engineer @ SaaS Labs`,
		preview: (data) => (
			<MarkdownPreview>
				<h2>Kishan Kumar</h2>
				<h3>Senior Software Engineer</h3>
				<hr />
				<p className="summary">{data.intro.summary}</p>
				<div className="meta-grid">
					<div className="meta-item">
						<strong>Email:</strong> <a href={`mailto:${data.intro.email}`}>{data.intro.email}</a>
					</div>
					<div className="meta-item">
						<strong>Mobile:</strong> <a href={`tel:${data.intro.mobile}`}>{data.intro.mobile}</a>
					</div>
					<div className="meta-item">
						<strong>GitHub:</strong> <a href={`https://${data.intro.github}`} target="_blank" rel="noopener noreferrer">{data.intro.github}</a>
					</div>
					<div className="meta-item">
						<strong>LinkedIn:</strong> <a href={`https://${data.intro.linkedin}`} target="_blank" rel="noopener noreferrer">{data.intro.linkedin}</a>
					</div>
				</div>
			</MarkdownPreview>
		)
	},
	"experience.json": {
		name: "experience.json",
		icon: FiCode,
		color: "#f5a623",
		type: "json",
		raw: `[
  {
    "role": "Senior Software Engineer",
    "company": "SaaS Labs — JustCall",
    "location": "Noida, India",
    "duration": "May 2025 – Present",
    "highlights": [
      "Led Remix SPA architectural migration, reducing load times by 40%.",
      "Built iframe-sync state sync SDKs (URL, navigation, session) between PHP and Remix.",
      "Optimized rendering paths, caching, and hydration, reducing TTI by 1.2s."
    ]
  },
  {
    "role": "Software Engineer 2",
    "company": "BukuWarung",
    "location": "Hyderabad, India",
    "duration": "Apr 2023 – Apr 2025",
    "highlights": [
      "Architected EDC sales order system, cart, and payment orchestration.",
      "Designed AI-driven drag-and-drop workflow builder used internally.",
      "Architected WebView-Android bridge interface for cross-platform apps.",
      "Designed/published session-based encrypted Secure Transfer SDK."
    ]
  },
  {
    "role": "Software Engineer 1",
    "company": "BukuWarung",
    "location": "Remote / Bengaluru",
    "duration": "Jan 2022 – Mar 2023",
    "highlights": [
      "Refactored WebView architecture, boosting speed by 30%.",
      "Built reusable UI modules across React, Vue, and Next.js.",
      "Developed web application from scratch with payments & products."
    ]
  }
]`,
		preview: (data) => (
			<TimelineContainer>
				<h2>Professional Experience</h2>
				<div className="timeline">
					{data.experience.map((item, index) => (
						<div className="timeline-item" key={index}>
							<div className="timeline-marker"></div>
							<div className="timeline-content">
								<div className="timeline-header">
									<div>
										<h3 className="role">{item.role}</h3>
										<h4 className="company">{item.company}</h4>
									</div>
									<span className="duration">{item.duration}</span>
								</div>
								<p className="location">📍 {item.location}</p>
								<ul className="highlights">
									{item.highlights.map((h, i) => (
										<li key={i}>{h}</li>
									))}
								</ul>
							</div>
						</div>
					))}
				</div>
			</TimelineContainer>
		)
	},
	"skills.ts": {
		name: "skills.ts",
		icon: FiCode,
		color: "#3178c6",
		type: "typescript",
		raw: `export interface SkillSet {
  languages: string[];
  frontend: string[];
  backend: string[];
  architecture: string[];
  security: string[];
  cloudDevops: string[];
}

export const skills: SkillSet = {
  languages: ["TypeScript", "JavaScript"],
  frontend: ["React", "Remix", "Next.js", "Vue", "React Native"],
  backend: ["Node.js", "Express", "Fastify"],
  architecture: ["SDK design", "WebView bridge", "Performance", "Caching"],
  security: ["Cryptographic key exchange", "Secure session transport"],
  cloudDevops: ["AWS", "Docker", "CI/CD", "Vercel", "Git"]
};`,
		preview: (data) => (
			<SkillsContainer>
				<h2>Skills & Expertise</h2>
				<div className="skills-grid">
					{Object.entries(data.skills).map(([category, items]) => {
						const titleMap = {
							languages: "Languages",
							frontend: "Frontend Frameworks",
							backend: "Backend & Servers",
							architecture: "Architecture & Optimization",
							security: "Security & Encryption",
							cloudDevops: "Cloud & DevOps"
						};
						return (
							<div className="skill-card" key={category}>
								<h3>{titleMap[category] || category}</h3>
								<div className="tags">
									{items.map((item, i) => (
										<Badge 
											key={i} 
											colorScheme="teal" 
											variant="solid" 
											className="skill-tag"
										>
											{item}
										</Badge>
									))}
								</div>
							</div>
						);
					})}
				</div>
			</SkillsContainer>
		)
	},
	"projects.json": {
		name: "projects.json",
		icon: FiCode,
		color: "#f5a623",
		type: "json",
		raw: `[
  {
    "name": "LastGood",
    "homepage": "https://www.lastgood.space",
    "description": "Production incident time-travel timeline and MTTR reduction tool for engineering and SRE teams.",
    "stack": ["React", "Node.js", "Express", "Supabase", "SRE Tools"]
  },
  {
    "name": "Game1N",
    "description": "Social media network platform for gamers to connect and track e-sports.",
    "stack": ["React", "Node.js", "MongoDB", "WebSockets"]
  },
  {
    "name": "t8 CMS",
    "description": "Configurable open-source headless CMS with Supabase integration.",
    "stack": ["Next.js", "Supabase", "TailwindCSS"]
  }
]`,
		preview: (data) => (
			<ProjectsContainer>
				<h2>Projects & Creations</h2>
				<div className="projects-grid">
					{data.projects.map((proj, idx) => (
						<div key={idx} className={proj.name === "LastGood" ? "project-card featured" : "project-card"}>
							{proj.name === "LastGood" && <span className="featured-badge">Featured Site</span>}
							<div className="project-header">
								<h3>{proj.name}</h3>
								{proj.url && (
									<a href={proj.url} target="_blank" rel="noopener noreferrer" className="project-link">
										Visit Site <FiExternalLink size={14} style={{ marginLeft: "4px" }} />
									</a>
								)}
							</div>
							<p className="description">{proj.description}</p>
							<div className="tech-stack">
								{proj.technologies.map((tech, i) => (
									<span key={i} className="tech-badge">{tech}</span>
								))}
							</div>
						</div>
					))}
				</div>
			</ProjectsContainer>
		)
	},
	"contact.sh": {
		name: "contact.sh",
		icon: FiTerminal,
		color: "#00e676",
		type: "bash",
		raw: `#!/bin/bash

# Contact Details for Kishan Kumar
EMAIL="kishankr.0210@gmail.com"
PHONE="+91-7979060284"
LINKEDIN="linkedin.com/in/kishan-k-12052a168"
GITHUB="github.com/kishankr7979"

echo "📧 Email:   $EMAIL"
echo "📱 Phone:   $PHONE"
echo "🔗 LinkedIn: $LINKEDIN"
echo "🐙 GitHub:   $GITHUB"
`,
		preview: (data) => (
			<ContactContainer>
				<h2>Get in Touch</h2>
				<p className="subtitle">Let's discuss SDK design, system architecture, frontends, or opportunities!</p>
				<div className="contact-grid">
					<a href={`mailto:${data.intro.email}`} className="contact-btn email">
						<FiMail className="btn-icon" />
						<div className="btn-content">
							<span className="label">Email Me</span>
							<span className="value">{data.intro.email}</span>
						</div>
					</a>
					<a href={`https://${data.intro.linkedin}`} target="_blank" rel="noopener noreferrer" className="contact-btn linkedin">
						<FiLinkedin className="btn-icon" />
						<div className="btn-content">
							<span className="label">LinkedIn</span>
							<span className="value">kishan-k-12052a168</span>
						</div>
					</a>
					<a href={`https://${data.intro.github}`} target="_blank" rel="noopener noreferrer" className="contact-btn github">
						<FiGithub className="btn-icon" />
						<div className="btn-content">
							<span className="label">GitHub</span>
							<span className="value">kishankr7979</span>
						</div>
					</a>
					<a href={`tel:${data.intro.mobile}`} className="contact-btn phone">
						<FiPhone className="btn-icon" />
						<div className="btn-content">
							<span className="label">Call Me</span>
							<span className="value">{data.intro.mobile}</span>
						</div>
					</a>
				</div>
			</ContactContainer>
		)
	}
};

const GUIPortfolio = ({ data }) => {
	const [activeFile, setActiveFile] = useState("about.md");
	const [openTabs, setOpenTabs] = useState(["about.md", "experience.json", "skills.ts"]);
	const [viewMode, setViewMode] = useState("preview"); // "code" or "preview"
	const [copied, setCopied] = useState(false);
	const [sidebarOpen, setSidebarOpen] = useState(true);

	const selectFile = (fileName) => {
		if (!openTabs.includes(fileName)) {
			setOpenTabs([...openTabs, fileName]);
		}
		setActiveFile(fileName);
	};

	const closeTab = (e, fileName) => {
		e.stopPropagation();
		const remaining = openTabs.filter(t => t !== fileName);
		setOpenTabs(remaining);
		if (activeFile === fileName && remaining.length > 0) {
			setActiveFile(remaining[remaining.length - 1]);
		}
	};

	const copyCode = () => {
		navigator.clipboard.writeText(FILE_DATA[activeFile].raw);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const highlightRawText = (text, type) => {
		// Beautiful syntax highlighter mockup
		const lines = text.split("\n");
		return lines.map((line, idx) => {
			let highlightedLine = line;
			if (type === "json") {
				// Style keys vs values
				highlightedLine = line
					.replace(/(".*?")\s*:/g, '<span class="key">$1</span>:')
					.replace(/:\s*(".*?")/g, ': <span class="string">$1</span>')
					.replace(/:\s*(\d+|true|false|null)/g, ': <span class="number">$1</span>');
			} else if (type === "typescript" || type === "javascript") {
				highlightedLine = line
					.replace(/\b(export|const|export const|interface|string|string\[\])\b/g, '<span class="keyword">$1</span>')
					.replace(/(".*?"|'.*?')/g, '<span class="string">$1</span>')
					.replace(/(\/\/.*)/g, '<span class="comment">$1</span>');
			} else if (type === "bash") {
				highlightedLine = line
					.replace(/^(#.*)/g, '<span class="comment">$1</span>')
					.replace(/\b(echo|export|if|fi)\b/g, '<span class="keyword">$1</span>')
					.replace(/(=.*)/g, '<span class="string">$1</span>');
			} else if (type === "markdown") {
				highlightedLine = line
					.replace(/^(#\s.*)/g, '<span class="md-h1">$1</span>')
					.replace(/^(\*\s.*)/g, '<span class="md-bullet">$1</span>')
					.replace(/(\*\*.*?\*\*)/g, '<span class="md-bold">$1</span>');
			}

			return (
				<div className="line" key={idx}>
					<span className="line-num">{idx + 1}</span>
					<span className="line-content" dangerouslySetInnerHTML={{ __html: highlightedLine || "&nbsp;" }} />
				</div>
			);
		});
	};

	const currentFile = FILE_DATA[activeFile] || FILE_DATA["about.md"];

	return (
		<WorkspaceContainer>
			{/* Explorer Sidebar */}
			<Sidebar className={sidebarOpen ? "open" : "collapsed"}>
				<div className="section-title">
					<FiChevronDown size={14} style={{ marginRight: '6px' }} />
					<span>EXPLORER: PORTFOLIO</span>
				</div>
				
				<div className="folder-tree">
					<div className="tree-node folder">
						<FiChevronDown size={14} style={{ marginRight: '4px', color: '#8f9cae' }} />
						<FiFolder size={14} style={{ marginRight: '6px', color: '#3b82f6' }} />
						<span>src</span>
					</div>
					
					<div className="folder-children">
						{/* Pages Folder */}
						<div className="tree-node folder">
							<FiChevronDown size={14} style={{ marginRight: '4px', color: '#8f9cae' }} />
							<FiFolder size={14} style={{ marginRight: '6px', color: '#3b82f6' }} />
							<span>pages</span>
						</div>
						<div className="folder-children font-code">
							{Object.keys(FILE_DATA).map(key => {
								const FileIcon = FILE_DATA[key].icon;
								return (
									<div 
										key={key} 
										className={`tree-node file ${activeFile === key ? 'active' : ''}`}
										onClick={() => selectFile(key)}
									>
										<FileIcon size={14} style={{ marginRight: '6px', color: FILE_DATA[key].color }} />
										<span>{key}</span>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</Sidebar>

			{/* Main Editor Panel */}
			<EditorPanel>
				{/* Tab Bar */}
				<TabBar>
					<button className="explorer-toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
						{sidebarOpen ? "◀" : "▶"}
					</button>
					<div className="tabs-scroll font-code">
						{openTabs.map(tabKey => {
							const FileIcon = FILE_DATA[tabKey].icon;
							return (
								<Tab 
									key={tabKey} 
									className={activeFile === tabKey ? 'active' : ''}
									onClick={() => setActiveFile(tabKey)}
								>
									<FileIcon size={12} style={{ marginRight: '5px', color: FILE_DATA[tabKey].color }} />
									<span>{tabKey}</span>
									<span className="close-tab" onClick={(e) => closeTab(e, tabKey)}>×</span>
								</Tab>
							);
						})}
					</div>
				</TabBar>

				{/* Editor Header / Breadcrumbs */}
				<Breadcrumbs>
					<div className="left-crumbs font-code">
						<span>src</span>
						<FiChevronRight size={12} />
						<span>pages</span>
						<FiChevronRight size={12} />
						<span className="active-crumb">{activeFile}</span>
					</div>
					
					{/* Mode Switcher: Code vs Preview */}
					<div className="mode-selector">
						<button 
							className={`mode-tab ${viewMode === 'preview' ? 'active' : ''}`}
							onClick={() => setViewMode('preview')}
						>
							Preview
						</button>
						<button 
							className={`mode-tab ${viewMode === 'code' ? 'active' : ''}`}
							onClick={() => setViewMode('code')}
						>
							{"{ }"} Code
						</button>
					</div>
				</Breadcrumbs>

				{/* Editor Viewport */}
				<Viewport className={viewMode}>
					{viewMode === "code" ? (
						<CodeContainer className="font-code">
							<button className="copy-btn" onClick={copyCode} title="Copy Raw Code">
								{copied ? <FiCheck size={14} style={{ color: "#00e676" }} /> : <FiCopy size={14} />}
								<span>{copied ? "Copied!" : "Copy"}</span>
							</button>
							<div className="code-editor-viewport">
								{highlightRawText(currentFile.raw, currentFile.type)}
							</div>
						</CodeContainer>
					) : (
						<PreviewContainer>
							{currentFile.preview(data)}
						</PreviewContainer>
					)}
				</Viewport>
			</EditorPanel>
		</WorkspaceContainer>
	);
};

export default GUIPortfolio;

/* Styled Components */

const WorkspaceContainer = styled.div`
	display: flex;
	height: 100%;
	width: 100%;
	overflow: hidden;
	font-family: 'Outfit', sans-serif;
`;

const Sidebar = styled.aside`
	width: 250px;
	height: 100%;
	flex-shrink: 0;
	border-right: 1px solid;
	display: flex;
	flex-direction: column;
	user-select: none;
	transition: all 0.2s ease-in-out;
	
	.dark & {
		background-color: #0d1222;
		border-color: #1e293b;
		color: #94a3b8;
	}
	
	&.light {
		background-color: #f1f5f9;
		border-color: #e2e8f0;
		color: #475569;
	}

	&.collapsed {
		width: 0;
		overflow: hidden;
		border-right: none;
	}

	.section-title {
		display: flex;
		align-items: center;
		padding: 10px 14px;
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		opacity: 0.8;
		border-bottom: 1px solid rgba(128, 128, 128, 0.08);
	}

	.folder-tree {
		padding: 10px 0;
		display: flex;
		flex-direction: column;
	}

	.tree-node {
		display: flex;
		align-items: center;
		padding: 6px 14px;
		font-size: 0.85rem;
		cursor: pointer;
		transition: background 0.15s;

		&.folder {
			font-weight: 600;
		}

		&.file {
			padding-left: 32px;
			opacity: 0.85;
			
			&:hover {
				background: rgba(128, 128, 128, 0.08);
				opacity: 1;
			}
			
			&.active {
				background: rgba(59, 130, 246, 0.15);
				opacity: 1;
				font-weight: 600;
				border-left: 2px solid #3b82f6;
				
				.dark & {
					color: #3b82f6;
				}
				.light & {
					color: #1d4ed8;
				}
			}
		}
	}

	.folder-children {
		display: flex;
		flex-direction: column;
		.tree-node.folder {
			padding-left: 24px;
		}
	}

	.font-code {
		font-family: 'Fira Code', monospace;
	}
`;

const EditorPanel = styled.div`
	flex: 1;
	height: 100%;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	
	.dark & {
		background-color: #0b0f19;
	}
	.light & {
		background-color: #ffffff;
	}
`;

const TabBar = styled.div`
	display: flex;
	align-items: center;
	height: 38px;
	border-bottom: 1px solid;
	user-select: none;
	
	.dark & {
		background-color: #0d1222;
		border-color: #1e293b;
	}
	.light & {
		background-color: #f1f5f9;
		border-color: #e2e8f0;
	}

	.explorer-toggle-btn {
		width: 38px;
		height: 38px;
		border: none;
		background: transparent;
		cursor: pointer;
		font-size: 0.7rem;
		border-right: 1px solid rgba(128, 128, 128, 0.1);
		color: inherit;
		opacity: 0.6;
		
		&:hover {
			opacity: 1;
		}
	}

	.tabs-scroll {
		display: flex;
		overflow-x: auto;
		flex: 1;
		height: 100%;
		
		&::-webkit-scrollbar {
			height: 3px;
		}
		&::-webkit-scrollbar-thumb {
			background: rgba(128, 128, 128, 0.2);
			border-radius: 3px;
		}
	}
`;

const Tab = styled.div`
	display: flex;
	align-items: center;
	padding: 0 16px;
	height: 100%;
	font-size: 0.8rem;
	border-right: 1px solid;
	cursor: pointer;
	position: relative;
	transition: all 0.15s;
	opacity: 0.7;

	.dark & {
		border-color: #1e293b;
		color: #94a3b8;
	}
	
	.light & {
		border-color: #e2e8f0;
		color: #475569;
	}

	&:hover {
		opacity: 1;
		
		.dark & {
			background-color: rgba(255, 255, 255, 0.02);
		}
		.light & {
			background-color: rgba(0, 0, 0, 0.02);
		}
	}

	&.active {
		opacity: 1;
		
		.dark & {
			background-color: #0b0f19;
			color: #3b82f6;
			border-top: 2px solid #3b82f6;
		}
		
		.light & {
			background-color: #ffffff;
			color: #1d4ed8;
			border-top: 2px solid #1d4ed8;
		}
	}

	.close-tab {
		margin-left: 8px;
		border-radius: 50%;
		width: 14px;
		height: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.75rem;
		transition: background 0.1s;
		
		&:hover {
			background: rgba(128, 128, 128, 0.2);
			color: #ef4444;
		}
	}
`;

const Breadcrumbs = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 6px 16px;
	font-size: 0.75rem;
	border-bottom: 1px solid;
	
	.dark & {
		border-color: #1e293b;
		color: #64748b;
	}
	.light & {
		border-color: #e2e8f0;
		color: #64748b;
	}

	.left-crumbs {
		display: flex;
		align-items: center;
		gap: 6px;
		
		.active-crumb {
			.dark & {
				color: #e2e8f8;
			}
			.light & {
				color: #0f172a;
			}
			font-weight: 500;
		}
	}

	.mode-selector {
		display: flex;
		border: 1px solid rgba(128, 128, 128, 0.2);
		border-radius: 4px;
		padding: 2px;
		
		.mode-tab {
			border: none;
			padding: 2px 10px;
			font-size: 0.7rem;
			font-weight: 600;
			cursor: pointer;
			border-radius: 3px;
			background: transparent;
			color: inherit;
			
			&.active {
				.dark & {
					background-color: #3b82f6;
					color: #ffffff;
				}
				.light & {
					background-color: #1d4ed8;
					color: #ffffff;
				}
			}
		}
	}
`;

const Viewport = styled.div`
	flex: 1;
	overflow: auto;
	position: relative;
	
	&::-webkit-scrollbar {
		width: 8px;
		height: 8px;
	}
	&::-webkit-scrollbar-thumb {
		background: rgba(128, 128, 128, 0.2);
		border-radius: 4px;
	}
`;

const CodeContainer = styled.div`
	padding: 1.5rem;
	font-size: 0.85rem;
	line-height: 1.6;
	background-color: #080c14;
	color: #a9b2c3;
	height: 100%;
	position: relative;
	overflow: auto;
	
	.copy-btn {
		position: absolute;
		top: 1rem;
		right: 1.5rem;
		display: flex;
		align-items: center;
		gap: 6px;
		border: 1px solid #1e293b;
		background: #0d1222;
		color: #94a3b8;
		padding: 4px 10px;
		font-size: 0.75rem;
		border-radius: 4px;
		cursor: pointer;
		transition: all 0.2s;
		z-index: 10;
		
		&:hover {
			background: #1e293b;
			color: #f1f5f9;
		}
	}

	.code-editor-viewport {
		display: flex;
		flex-direction: column;
	}

	.line {
		display: flex;
	}

	.line-num {
		width: 30px;
		text-align: right;
		margin-right: 1.5rem;
		opacity: 0.3;
		user-select: none;
	}

	.line-content {
		flex: 1;
		white-space: pre;
		
		.key { color: #f25f5c; }
		.string { color: #ffe066; }
		.number { color: #3b82f6; }
		.keyword { color: #bb86fc; font-weight: bold; }
		.comment { color: #64748b; font-style: italic; }
		.md-h1 { color: #3b82f6; font-weight: bold; }
		.md-bullet { color: #00e676; }
		.md-bold { color: #ffffff; font-weight: bold; }
	}
`;

const PreviewContainer = styled.div`
	padding: 2.5rem;
	max-width: 800px;
	margin: 0 auto;
	
	@media (max-width: 768px) {
		padding: 1.5rem;
	}
	
	h2 {
		font-size: 1.8rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
		letter-spacing: -0.5px;
	}
`;

/* Section Specific Previews */

const MarkdownPreview = styled.div`
	h3 {
		font-size: 1.15rem;
		font-weight: 500;
		opacity: 0.8;
		margin-bottom: 1.5rem;
	}
	
	hr {
		border: none;
		border-top: 1px solid rgba(128, 128, 128, 0.15);
		margin: 1.5rem 0;
	}

	.summary {
		font-size: 1.1rem;
		line-height: 1.6;
		margin-bottom: 2rem;
		opacity: 0.95;
	}

	.meta-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1rem;
		
		.meta-item {
			padding: 12px 16px;
			border-radius: 8px;
			border: 1px solid;
			font-size: 0.95rem;
			
			.dark & {
				background-color: #0d1222;
				border-color: #1e293b;
			}
			.light & {
				background-color: #f8fafc;
				border-color: #e2e8f0;
			}
			
			strong {
				display: block;
				font-size: 0.75rem;
				text-transform: uppercase;
				opacity: 0.6;
				margin-bottom: 4px;
			}
			
			a {
				color: #3b82f6;
				font-weight: 500;
				&:hover {
					text-decoration: underline;
				}
			}
		}
	}
`;

const TimelineContainer = styled.div`
	.timeline {
		position: relative;
		margin-top: 2rem;
		padding-left: 20px;
		border-left: 2px solid;
		
		.dark & { border-color: #1e293b; }
		.light & { border-color: #e2e8f0; }
	}

	.timeline-item {
		position: relative;
		margin-bottom: 2.5rem;
		
		&:last-child {
			margin-bottom: 0;
		}
	}

	.timeline-marker {
		position: absolute;
		left: -27px;
		top: 5px;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		border: 2px solid;
		background: #ffffff;
		
		.dark & {
			border-color: #3b82f6;
			background: #0b0f19;
		}
		.light & {
			border-color: #1d4ed8;
			background: #ffffff;
		}
	}

	.timeline-content {
		padding: 16px;
		border-radius: 8px;
		border: 1px solid;
		transition: all 0.2s;
		
		.dark & {
			background-color: #0d1222;
			border-color: #1e293b;
			&:hover {
				border-color: #3b82f6;
			}
		}
		
		.light & {
			background-color: #f8fafc;
			border-color: #e2e8f0;
			&:hover {
				border-color: #1d4ed8;
			}
		}
	}

	.timeline-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 6px;
		
		@media (max-width: 600px) {
			flex-direction: column;
			gap: 4px;
		}
		
		.role {
			font-size: 1.05rem;
			font-weight: 700;
			margin: 0;
		}
		
		.company {
			font-size: 0.95rem;
			font-weight: 500;
			color: #3b82f6;
			margin: 2px 0 0 0;
		}
		
		.duration {
			font-size: 0.8rem;
			font-weight: 600;
			opacity: 0.7;
		}
	}

	.location {
		font-size: 0.8rem;
		opacity: 0.6;
		margin-bottom: 12px;
	}

	.highlights {
		margin: 0;
		padding-left: 16px;
		font-size: 0.9rem;
		line-height: 1.5;
		display: flex;
		flex-direction: column;
		gap: 6px;
		opacity: 0.9;
	}
`;

const SkillsContainer = styled.div`
	.skills-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.5rem;
		margin-top: 1.5rem;
	}

	.skill-card {
		padding: 20px;
		border-radius: 10px;
		border: 1px solid;
		
		.dark & {
			background-color: #0d1222;
			border-color: #1e293b;
		}
		.light & {
			background-color: #f8fafc;
			border-color: #e2e8f0;
		}
		
		h3 {
			font-size: 0.95rem;
			font-weight: 700;
			text-transform: uppercase;
			letter-spacing: 0.5px;
			opacity: 0.7;
			margin-bottom: 12px;
		}
		
		.tags {
			display: flex;
			flex-wrap: wrap;
			gap: 8px;
		}
		
		.skill-tag {
			font-family: 'Fira Code', monospace;
			font-size: 0.75rem;
			padding: 4px 10px;
			border-radius: 6px;
		}
	}
`;

const ProjectsContainer = styled.div`
	.projects-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
		margin-top: 1.5rem;
	}

	.project-card {
		padding: 20px;
		border-radius: 10px;
		border: 1px solid;
		position: relative;
		transition: all 0.2s;
		
		.dark & {
			background-color: #0d1222;
			border-color: #1e293b;
			&:hover { border-color: #3b82f6; }
		}
		.light & {
			background-color: #f8fafc;
			border-color: #e2e8f0;
			&:hover { border-color: #1d4ed8; }
		}
		
		&.featured {
			border: 2px solid;
			.dark & { border-color: #3b82f6; }
			.light & { border-color: #1d4ed8; }
		}
	}

	.featured-badge {
		position: absolute;
		top: -10px;
		right: 20px;
		font-size: 0.65rem;
		font-weight: 700;
		text-transform: uppercase;
		background: #3b82f6;
		color: #ffffff;
		padding: 2px 8px;
		border-radius: 99px;
	}

	.project-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
		
		h3 {
			font-size: 1.25rem;
			font-weight: 700;
			margin: 0;
		}
		
		.project-link {
			display: flex;
			align-items: center;
			font-size: 0.85rem;
			font-weight: 600;
			color: #3b82f6;
			
			&:hover {
				text-decoration: underline;
			}
		}
	}

	.description {
		font-size: 0.95rem;
		line-height: 1.5;
		margin-bottom: 16px;
		opacity: 0.85;
	}

	.tech-stack {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		
		.tech-badge {
			font-family: 'Fira Code', monospace;
			font-size: 0.7rem;
			padding: 2px 8px;
			border-radius: 4px;
			
			.dark & {
				background-color: #1e293b;
				color: #94a3b8;
			}
			.light & {
				background-color: #e2e8f0;
				color: #475569;
			}
		}
	}
`;

const ContactContainer = styled.div`
	text-align: center;
	padding: 1rem 0;
	
	.subtitle {
		font-size: 1.05rem;
		opacity: 0.7;
		max-width: 500px;
		margin: 0 auto 2.5rem auto;
		line-height: 1.5;
	}

	.contact-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 1.25rem;
		max-width: 600px;
		margin: 0 auto;
	}

	.contact-btn {
		display: flex;
		align-items: center;
		padding: 18px 24px;
		border-radius: 10px;
		border: 1px solid;
		text-decoration: none;
		color: inherit;
		transition: all 0.2s;
		
		.dark & {
			background-color: #0d1222;
			border-color: #1e293b;
			&:hover {
				border-color: #3b82f6;
				transform: translateY(-2px);
				box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
			}
		}
		
		.light & {
			background-color: #f8fafc;
			border-color: #e2e8f0;
			&:hover {
				border-color: #1d4ed8;
				transform: translateY(-2px);
				box-shadow: 0 4px 12px rgba(29, 78, 216, 0.08);
			}
		}
		
		.btn-icon {
			font-size: 1.5rem;
			margin-right: 16px;
			color: #3b82f6;
		}
		
		.btn-content {
			text-align: left;
			
			.label {
				display: block;
				font-size: 0.75rem;
				font-weight: 700;
				text-transform: uppercase;
				opacity: 0.5;
				margin-bottom: 2px;
			}
			
			.value {
				font-weight: 600;
				font-size: 0.95rem;
			}
		}
	}
`;
