import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import githubBlack from "/GitHubBlack.svg";

import githubWhite from "/GitHubWhite.svg";

import { themeContext } from "../context/Context";

function ProfileFooter() {
	const [theme] = useContext(themeContext);
	console.log(theme);

	return (
		<div className=" text-sm border-t w-full pt-2 flex justify-end items-center">
			{/* The button only shows if the PWA is actually ready to be installed */}

			<div className="text-sm w-full text-gray-400 gap-1 p-1 m-1 flex items-center rounded-md  px-2 mr-2">
				
				<span className="font-semibold  text-lg">&#169;</span>
				<div>All right reserved.  2026</div>
				<span className="font-bold">&#183;</span>
				<a
					className="flex"
					href="https://github.com/ankitkumar910/Pennat"
					target="_self"
					rel="noreferrer">
					<img
						className="dark:bg-black/70 object-cover rounded-full mr-1"
						width="20"
						height="20"
						src={theme == "dark" ? githubWhite : githubBlack}
						alt="github"
					/>
					GitHub
				</a>
				
			</div>
		</div>
	);
}

export default ProfileFooter;
