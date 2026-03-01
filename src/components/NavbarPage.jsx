import { Pen, Pencil, User } from "lucide-react";
import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { themeContext } from "../context/Context";

function NavbarPage() {
	const naviagtors = useNavigate();
	const [isDark, setIsDark] = useContext(themeContext);

	return (
		<nav
			className="flex   w-full justify-between px-4 fixed 
			backdrop-blur-sm
			border-b
		dark:bg-black
		top-0  z-2  py-1">
			<div>
				<h1 className="font-bold text-3xl pl-2">Pennat</h1>
			</div>
			<div>
				<ul
					className="flex
             justify-evenly  
             *:p-2
              *:px-3
          
             *:my-1
              *:rounded-full items-center [&>li:hover]:cursor-pointer">
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

					<li className="">
						<span
							className="flex flex-col sm:flex-row items-center text-xs sm:text-[1rem]"
							onClick={() => {
								setIsDark((p) => (p == "light" ? "dark" : "light"));
								localStorage.setItem("theme", isDark=="dark" ? "light" : "dark");
							}}>
							{" "}
							<Switch checked={isDark == "dark"} className={"p-0 border"} />
							<span className="mx-2 wrap-anywhere">Change Theme</span>
						</span>
					</li>
					<li
						onClick={() => {
							naviagtors("/profile");
						}}>
						<span className="flex flex-col sm:flex-row items-center text-xs sm:text-[1rem]">
							{" "}
							<User height={"16px"} />
							<span className="">Profile</span>
						</span>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default NavbarPage;
