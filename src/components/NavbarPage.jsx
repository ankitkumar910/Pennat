import {
	LogInIcon,
	Moon,
	Pen,
	Pencil,
	Sun,
	User,
	User2Icon,
} from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { themeContext, userContext } from "../context/Context";
import { SearchButton } from "./SearchButton";
import { LogIn } from "lucide-react";
import { cn } from "./utils/cn";
import { SignPop } from "./SignPop";

function NavbarPage({ SetSearchQuery }) {
	const naviagtors = useNavigate();
	//jjjdjjd
	const [isDark, setIsDark] = useContext(themeContext);
	const [showMenu, setShowMenu] = useState(false);
	const [userInfo] = useContext(userContext);

	useEffect(() => {
		console.log("Calling Theme Change");

		console.log(isDark);
	}, [isDark]);

	return (
		<nav
			className="flex
			
			fixed
			
			items-center  w-full justify-between 
			backdrop-blur-sm
			border-b
			 px-4
			 py-2
			
		dark:bg-black
		top-0  z-2  ">
			<NavLink to={"/home"}>
				<h1 className="font-bold text-xl text-black dark:text-gray-500  sm:text-2xl mb-2 sm:pl-2">
					Pennat
				</h1>
			</NavLink>
			<div className="relative right-0 ">
				<div className="flex flex-row items-center ">
					<SignPop
						child={<SearchButton on SetSearchQuery={SetSearchQuery} />}
					/>

					{userInfo && (
						<span
							onClick={() => {
								//e.stopPropagation();
								setShowMenu((prev) => !prev);
							}}
							className={`flex flex-row hover:cursor-pointer items-center px-0.5 py-0.5 rounded-lg border mb-1 ${
								showMenu ? "border-foreground" : "border-transparent"
							}`}>
							{" "}
							<User
								size={28}
								fill="#303033"
								strokeWidth={1}
								strokeOpacity={0}
							/>
							<span className="hidden md:block pr-2 ">You</span>
						</span>
					)}

					{!userInfo && (
						<NavLink
							to={"/login"}
							end
							className={({ isActive }) =>
								cn(
									"flex items-center mb-2 px-4 py-1 rounded-2xl cursor-pointer transition-colors duration-300",

									isActive
										? "bg-gray-300 text-black"
										: "bg-foreground text-background hover:bg-gray-800"
								)
							}>
							{" "}
							<span className="block pb-0.5 ">Login</span>
						</NavLink>
					)}
				</div>

				<ul
					className={`right-0 px-2  py-2 top-10 flex flex-col absolute ${
						isDark == "dark" ? "bg-[#29292b]" : "bg-[#e7eced]"
					}

					shadow-2xs
					rounded-lg
					transition-all
					duration-400
					ease-in-out

					${showMenu ? "block" : "hidden"}

					*:px-2
					*:py-2
					*:w-fit
					*:min-w-full
					*:rounded-lg
					*:bg-transparent
					*:ease-in-out
					*:hover:bg-gray-600
					*:transition-all
					*:duration-500
					*:cursor-pointer
					
					*:text-foreground`}>
					{/* <li>
							<label
							className="flex flex-col sm:flex-row items-center text-xs sm:text-[1rem]"
							
							htmlFor="writer"
							>
								{" "}
								<Pen height={"16px"} />
								<span>Write</span>
							</label>
						</li> */}
					{/* <li>For You</li> */}
					{/* <li>Following</li> */}

					<li
						onClick={() => {
							naviagtors(`/profile/${userInfo?.username}`);
						}}>
						<span className="flex items-center text-sm">
							{" "}
							<User size={16} className="p-0 mx-1" />
							<span>Profile</span>
						</span>
					</li>
					<li>
						<span
							className="flex w-40 items-center"
							onClick={() => {
								setIsDark((prev) => {
									const newTheme = prev === "dark" ? "light" : "dark";
									localStorage.setItem("theme", newTheme);
									return newTheme;
								});
							}}>
							{" "}
							<span className="mt-0.5">
								{" "}
								{isDark != "dark" ? (
									<Moon size={16} className="p-0 mx-1" />
								) : (
									<Sun size={16} className="p-0 mx-1" />
								)}
							</span>
							<span className="text-sm text-center flex ">
								{isDark != "dark"
									? "Switch to dark mode"
									: "Switch to dark mode"}
							</span>
						</span>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default NavbarPage;
