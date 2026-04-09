import React, { useContext, useEffect, useRef, useState } from "react";
import supabase from "../config/supabaseClient";
import { AlertBasic } from "./ui/AlertBasic";
import { ExternalLink, LineChart, LoaderCircle } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { AlertColors } from "./ui/AlertColors";
import { userContext } from "../context/Context";
import { toast } from "sonner";
import GoogleComp from "./GoogleComp";
import LoginDivider from "./LoginDivider";
import { LoginWithEmail } from "./LoginWithEmail";
import illustration from "../assets/illu2.svg";

function Login() {
	const [errorMsg, setErrorMsg] = useState(null);
	const [, setSuccess] = useState();
	const emailRef = useRef();
	const passwordRef = useRef();
	const navi = useNavigate();
	const [userInfo, , loadUser] = useContext(userContext);

	useEffect(() => {
		if (userInfo) {
			console.log("Navigatting");
			navi("/", {
				replace: true,
			});
			return;
		}
	}, []);

	async function handleSubmit() {
		event.preventDefault();
		let email = emailRef.current.value;
		let password = passwordRef.current.value;

		try {
			let { data, error } = await supabase.auth.signInWithPassword({
				email: email,
				password: password,
			});

			if (error) {
				console.log("error is.");

				if (!error.code) {
					setErrorMsg({
						code: null,
						message: "Something went wrong.",
					});
					alert(error);
				} else {
					setErrorMsg(error);
				}

				return;
			}
			if (data) {
				console.log("Data is.");
				console.log(data);
				setErrorMsg(null);
				setSuccess(true);
				toast("Success! You logged in.");
				await loadUser();
				setTimeout(() => {
					navi("/auth");
				}, 1000);
			}
		} catch (error) {
			console.log(error);
			setErrorMsg(error);
		}
	}

	return (
		<div className="sm:flex justify-start sm:pl-10 md:pl-2 items-center gap-80 ">
			<div>
				{!userInfo && (
					<div>
						<div className="dark:bg-[#121212] bg-background pb-12  min-h-screen max-w-screen bg-center bg-cover ">
							<h1 className="text-2xl  font-bold px-2 text-clip b inline text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-pink-600  w-full ">
								Pennat
							</h1>

							<div className="mt-16">
								<p className="text-5xl    mt-4 ml-4    font-extrabold font-fontVerdana md:text-7xl sm:text-5xl px-2 text-foreground ">
									Welcome{" "}
									<span className="text-blue-600  ">
										{" "}
										<br />
										back{" "}
										<span className="inline-block -ml-2 mx-0 px-0 rotate-6 hover:rotate-0 transition-transform duration-300 cursor-default">
											!
										</span>
									</span>
								</p>
								<p className="px-2 text-xl border-s-4 border-blue-600 mt-12  ml-12 font-norml font-sans my-4  w-fit   text-gray-600  ">
									Log in to your digital desk.
								</p>

								<GoogleComp />

								

								<br />
								<LoginWithEmail
									child={
										<div>
											<form onSubmit={handleSubmit}>
												<div className="mx-12 flex flex-col gap-0 ">
													<label
														htmlFor="email"
														className="text-sm font-normal  text-foreground">
														Enter your email
													</label>{" "}
													<input
														onChange={() => {
															setErrorMsg(null);
														}}
														ref={emailRef}
														type="email"
														id="email"
														required
														title="Enter your email"
														placeholder="pennat@exmple.com"
														className="p-2 lowercase border rounded-sm  bg-slate-300  min-w-1 sm:w-1/2 text-black"
													/>
													<br />
													<label
														htmlFor="password"
														className="text-sm font-normal   text-foreground">
														Enter your password
													</label>{" "}
													<input
														onChange={() => {
															setErrorMsg(null);
														}}
														ref={passwordRef}
														type="text"
														id="password"
														required
														placeholder="••••••"
														minLength={6}
														maxLength={20}
														title="enter your password"
														className="p-2  border rounded-sm 
                 
               bg-slate-300 
              
               min-w-1 sm:w-1/2   text-black"
													/>{" "}
													<p className="text-xs  wrap-anywhere text-slate-800">
														Possibly your password had min. length 6, included{" "}
														<br className="hidden sm:block" />
														uppercase,lowercase,numbers and special symbols.
													</p>
												</div>

												<div className="flex  flex-col sm:flex-row justify-center sm:justify-start  items-center  ">
													{" "}
													<button
														type="submit"
														className="
										bg-blue-800
										border-blue-800
										 px-[30%]
										 rounded-full
										 sm:px-4 py-2 mx-4 my-4  sm:mr-0 sm:ml-12 border sm:rounded-md active:bg-gray-600  text-white cursor-pointer">
														Continue
													</button>
													<p className="text-sm sm:ml-8 text-slate-900">
														<NavLink to={"/flow"}>Forgot password?</NavLink>
													</p>
												</div>

												{errorMsg && <AlertColors errorMsg={errorMsg} />}
											</form>
										</div>
									}
								/>

								<br />
								<p className="text-sm text-foreground ml-12">
									Don't have an account?{" "}
									<span
										onClick={() => {
											navi("/signup");
										}}
										className="text-blue-800 cursor-pointer underline ">
										Create one
										<ExternalLink className="inline ml-1 mb-1" size={"12px"} />
									</span>
								</p>
							</div>
						</div>
					</div>
				)}

				{userInfo && (
					<div
						className={` min-h-screen flex items-center justify-center bg-background`}>
						<div className="flex items-center gap-2 text-foreground ">
							<LoaderCircle size={24} className="animate-spin" />
							<span>Hold tight...</span>
						</div>
					</div>
				)}
			</div>

			<div className="hidden mr-1/2  md:flex  items-center justify-center  h-full">
				<img
					src={illustration}
					className="w-5/5  max-w-lg  animate-pulse-slow"
					alt="Pennat Illustration"
				/>
			</div>
		</div>
	);
}

export default Login;
