import { FiArrowUpRight } from "react-icons/fi";

const STAT = [
	{ sign: "−", value: "40%", label: "page load time, after moving a PHP app to Remix" },
	{ sign: "−", value: "1.2s", label: "time to interactive on the same app" },
	{ sign: "+", value: "30%", label: "WebView performance in embedded mobile web apps" },
	{ sign: "+", value: "15%", label: "feature adoption, through third-party integrations" }
];

const SKILL_LABELS = {
	languages: "languages",
	frontend: "frontend",
	backend: "backend",
	architecture: "architecture",
	security: "security",
	cloudDevops: "cloud, devops"
};

const SKETCH = [
	{ t: "14:02", kind: "deploy", what: "api, queue concurrency change" },
	{ t: "14:09", kind: "flag", what: "checkout_v2 turned on", likely: true },
	{ t: "14:11", kind: "alert", what: "error rate rising on api" }
];

const NAV = [
	["work", "work"],
	["experience", "experience"],
	["skills", "skills"],
	["contact", "contact"]
];

export default function GUI({ data }) {
	const { intro } = data;
	const [lead, ...rest] = data.projects;
	return (
		<div className="gui">
			<div className="progress" aria-hidden="true" />
			<aside className="rail">
				<div className="rail-in">
					<p className="rail-name">{intro.name}</p>
					<p className="rail-head">
						<span className="k">HEAD</span> {intro.title}, JustCall
						<span className="cursor" aria-hidden="true" />
					</p>
					<nav aria-label="Sections" className="rail-nav">
						{NAV.map(([id, label]) => (
							<a key={id} href={`#${id}`}>./{label}</a>
						))}
					</nav>
				</div>
			</aside>

			<div className="content">
				<section className="intro" id="top">
					<h1>
						I build web software, and lately a tool for one question: <em>what changed?</em>
					</h1>
					<p>
						Senior software engineer in Noida with 5+ years in fintech and SaaS, mostly React, Node and the places where
						the two meet. At JustCall I led the move from a legacy PHP app to Remix. Before that I spent time at BukuWarung,
						from intern to Software Engineer 2, working on payments and embedded mobile web.
					</p>
					<p>
						On the side I run LastGood, an incident tool I built alone, and I like projects where the details are
						someone's 2&nbsp;a.m.
					</p>
					<p className="stat-label">git diff --stat, selected results</p>
					<dl className="stat">
						{STAT.map((s, i) => (
							<div key={s.label} style={{ "--i": i }}>
								<dt><span className={s.sign === "+" ? "plus" : "minus"}>{s.sign}</span> {s.value}</dt>
								<dd>{s.label}</dd>
							</div>
						))}
					</dl>
				</section>

				<section id="work" aria-labelledby="work-h" className="reveal">
					<h2 id="work-h">work</h2>
					<article className="case">
						<header>
							<h3>{lead.name}</h3>
							<span className="status"><i aria-hidden="true" /> {lead.status}</span>
						</header>
						<p>{lead.description}</p>
						<figure className="sketch" aria-label="Illustrative incident timeline">
							<ol>
								{SKETCH.map((r, i) => (
									<li key={r.t} className={r.likely ? "likely" : ""} style={{ "--i": i }}>
										<time>{r.t}</time>
										<b>{r.kind}</b>
										<span>{r.what}</span>
										{r.likely && <em>first suspect</em>}
									</li>
								))}
							</ol>
							<figcaption>An illustration of the idea, with made-up values.</figcaption>
						</figure>
						<p className="stack">{lead.technologies.join(" / ")}</p>
						<a className="link" href={lead.url} target="_blank" rel="noreferrer">
							lastgood.space <FiArrowUpRight aria-hidden="true" />
						</a>
					</article>

					<h3 className="sub">Other things I've built</h3>
					<ul className="others">
						{rest.map((p) => (
							<li key={p.name}>
								<div className="o-head">
									<b>{p.name}</b>
									<span className="leader" aria-hidden="true" />
									<span className="o-status">{p.status}</span>
								</div>
								<p>{p.description}</p>
								<p className="stack">{p.technologies.join(" / ")}</p>
							</li>
						))}
					</ul>
				</section>

				<section id="experience" aria-labelledby="exp-h" className="reveal">
					<h2 id="exp-h">experience</h2>
					<ol className="log">
						{data.experience.map((e, i) => (
							<li key={e.role + e.duration} className={i === 0 ? "head" : ""}>
								<span className="node" aria-hidden="true" />
								<div className="when">{e.duration}</div>
								<h3>{e.role}, {e.company}</h3>
								{e.location && <p className="where">{e.location}</p>}
								{e.highlights.length > 0 && (
									<ul>
										{e.highlights.map((h) => <li key={h}>{h}</li>)}
									</ul>
								)}
							</li>
						))}
					</ol>
				</section>

				<section id="skills" aria-labelledby="skills-h" className="reveal">
					<h2 id="skills-h">skills</h2>
					<dl className="skills">
						{Object.entries(data.skills).map(([k, list]) => (
							<div key={k}>
								<dt>{SKILL_LABELS[k] || k}</dt>
								<dd>{list.join(", ")}</dd>
							</div>
						))}
					</dl>
					<p className="edu">
						{data.education[0].degree}, {data.education[0].institution}, {data.education[0].duration}.
					</p>
				</section>

				<section id="contact" aria-labelledby="contact-h" className="reveal">
					<h2 id="contact-h">contact</h2>
					<p className="contact-line">
						Hiring for a product team, or building something with a hard 2&nbsp;a.m. problem? Write to me.
					</p>
					<a className="big-mail" href={`mailto:${intro.email}`}>{intro.email}</a>
					<ul className="contact-links">
						<li><a href={`https://${intro.github}`} target="_blank" rel="noreferrer">GitHub</a></li>
						<li><a href={`https://${intro.linkedin}`} target="_blank" rel="noreferrer">LinkedIn</a></li>
						<li><a href={intro.resumeUrl} target="_blank" rel="noreferrer">Resume</a></li>
						<li><a href={`tel:${intro.mobile.replace(/-/g, "")}`}>{intro.mobile}</a></li>
					</ul>
				</section>

				<footer>
					<span>Kishan Kumar, {new Date().getFullYear()}</span>
					<span>Off hours: roads, tents and clear skies.</span>
				</footer>
			</div>
		</div>
	);
}
