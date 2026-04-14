import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import githubBlack from "/GitHubBlack.svg";

import githubWhite from "/GitHubWhite.svg";

import { themeContext } from "../context/Context";

function ProfileFooter() {
	const [theme] = useContext(themeContext);
	console.log(theme);

	return (
		<div className="mt-12 text-sm border-t w-full  pt-4 flex justify-end items-center">
			{/* The button only shows if the PWA is actually ready to be installed */}

			<div className="text-sm w-full text-gray-400 gap-2 p-1 m-1 flex rounded-md dark:bg-black px-2 mr-4">
				<div>All right reserved.  2026</div>
				<div
					className="flex"
					href="https://github.com/kumarr-ankit/Pennat"
					target="_self"
					rel="noreferrer">
					<img
						className="dark:bg-black/70"
						width="20"
						height="20"
						src={theme == "dark" ? githubWhite : githubBlack}
						alt="github"
					/>
					GitHub
				</div>
				
			</div>
		</div>
	);
}

export default ProfileFooter;
