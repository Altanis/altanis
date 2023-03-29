import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Tag from "../../../components/Tag";
import FolderHierarchy from "../../../components/FolderHierarchy";

import { borders, colors, hoverBorders, hoverBackgrounds } from "../../../utils/Colors";
import FolderDefinitions from "../../../utils/Folders";
import { AnimatePresence, motion } from "framer-motion";

export default function Games() {
	const projects = [
        {
			name: "WebSocket Implementation",
			year: "March 2023",
			desc: "A simple and robust implementation of a WebSocket server in TypeScript.",
			tags: ["nodejs", "websocket", "typescript"],
            type: "file",
            link: "https://github.com/Altanis/websocket-implementation"
		},
		{
			name: "Spatial Hashgrid",
			year: "March 2023",
			desc: "A simple implementation of a spatial hashgrid in C++, Rust, and TypeScript.",
			tags: ["c++", "rust", "typescript", "physics"],
            type: "file",
            link: "https://github.com/Altanis/spatial-hashgrid"
		},
		{
			name: "JSDatabase",
			year: "January 2023",
			desc: "A simple locally stored database in JavaScript using JSON.",
			tags: ["nodejs", "json", "database"],
            type: "file",
            link: "https://github.com/Altanis/jsdatabase.json"
		}
	];

	const [theme, setTheme] = useState("text-orange-400");
	const [borderTheme, setBorderTheme] = useState("border-orange-400");
    const [hoverTheme, setHoverTheme] = useState("hover:bg-orange-400");
    const [hoverBackgroundTheme, setHoverBackgroundTheme] = useState("bg-black-400");
	useEffect(() => {
		const idx = Math.floor(Math.random() * colors.length);
		setTheme(colors[idx]);
		setBorderTheme(borders[idx]);
        setHoverTheme(hoverBorders[idx]);
        setHoverBackgroundTheme(hoverBackgrounds[idx]);
    }, []);
    
    const folders = ["Home", "Projects", "OSS"]
        .map(f => FolderDefinitions.find(d => d.name === f));

	const pageVariants = {
		hidden: { opacity: 0, x: -200, y: 0 },
		enter: { opacity: 1, x: 0, y: 0 },
		exit: { opacity: 0, x: 0, y: -100 },
	};

	return (
		<AnimatePresence mode="wait">
		<motion.div
			initial="hidden"
			animate="enter"
			variants={pageVariants}
			transition={{ duration: 0.25 }}
		>
			<div className="h-full py-32 mx-32">
				<div className="p-4">
					<FolderHierarchy folders={folders} theme={{theme, hoverBackgroundTheme}} />
				</div>
				<div className="grid grid-cols-2 gap-16 my-10">
					{projects.map((project, idx) => {
						return (
							<Link to={project.link}>
								<div key={idx} className={`px-6 py-4 duration-200 border border-gray-400 ${hoverTheme} hover:cursor-pointer rounded-3xl md:px-4 md:py-3`}>
									<div className="pb-4 mb-4 border-b-4">
										<h1 className={`py-2 text-4xl ${theme}`}>
											<i className={`px-1 mx-5 ${project.type === "file" ? "fa-solid fa-file" : "fa-solid fa-folder"} text-2xl opacity-50`}></i>
											{project.name}
										</h1>
										<h3 className="mb-4 text-lg">
											{project.year}
										</h3>
										<div className="flex flex-wrap mt-2">
											{project.tags.map((tag, idx) => {
												return <Tag tag={tag} />;
											})}
										</div>
									</div>
									<p className="text-lg">{project.desc}</p>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		</motion.div>
		</AnimatePresence>
	);
};