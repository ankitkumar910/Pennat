import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import githubBlack from "/GitHubBlack.svg";

import githubWhite from "/GitHubWhite.svg";

import { themeContext } from "../context/Context";

function ProfileFooter() {
	const [theme] = useContext(themeContext);
	console.log(theme);

	return (
		<div className="mt-12 text-sm border-t pt-4 flex justify-end items-center">
			{/* The button only shows if the PWA is actually ready to be installed */}

			<div className="text-sm text-gray-400 border w-fit p-1 m-1 flex rounded-md dark:bg-black px-2 mr-4">
				<a
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
				</a>
			</div>
		</div>
	);
}

export default ProfileFooter;
