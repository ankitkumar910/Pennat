import React, { useRef, useState } from "react";
import supabase from "../config/supabaseClient";
import { AlertColors } from "./ui/AlertColors";
import { AlertBasic } from "./ui/AlertBasic";
import { NavLink, useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { toast } from "sonner";
import GoogleComp from "./GoogleComp";
import LoginDivider from "./LoginDivider";
import EmailComp from "./EmailComp";
import { SignWithEmail } from "./SignWithEmail";
import illustration from "../assets/illu2.svg";

function Signup() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const nameRef = useRef();
	const dobRef = useRef();
	const usernameRef = useRef();

	const [errorMsg, setErrorMsg] = useState(null);
	const [userData, setUserData] = useState(null);
	const [showForm, setShowForm] = useState(false);
	const [success, setSuccess] = useState(false);
	const navi = useNavigate();

	const clearStatus = () => {
		setErrorMsg(null);
		setSuccess(false);
	};

	async function handleSubmit(event) {
		event.preventDefault();
		clearStatus();
		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		const { error, data } = await supabase.auth.signUp({
			email,
			password,
		});

		if (error) {
			setErrorMsg(error.message || error);
			setUserData(null);
			return;
		}

		if (data?.user) {
			setUserData(data.user);
			setSuccess(true);
			toast.success("💡 Account created! Note your password.");

			setTimeout(() => {
				setShowForm(true);
				setSuccess(false);
			}, 1500);
		}
	}

	async function handleUserData(event) {
		event.preventDefault();
		clearStatus();

		const { data, error } = await supabase
			.from("UserTable")
			.insert([
				{
					username: usernameRef.current.value,
					name: nameRef.current.value,
					email: userData.email,
					gender: "1",
				},
			])
			.select();

		if (error) {
			setErrorMsg(error.message || error);
			toast.error(error.message || "An error occurred");
			return;
		}

		if (data) {
			setSuccess(true);
			toast.success("Profile updated successfully!");

			setTimeout(() => {
				setSuccess(false);
				navi("/auth");
			}, 1500);
		}
	}

	return (
		<div className="min-h-screen bg-white dark:bg-background overflow-x-hidden">
			{/* Logo */}
			<div className="bg-transparent backdrop-blur-3xl">
				<h1
					onClick={() => navi("/")}
					className="fixed top-6 left-6 md:left-12 z-50 text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-600 cursor-pointer">
					Pennat
				</h1>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 min-h-screen w-full items-center">
				<div className="flex flex-col justify-center px-6 py-20 md:px-16 lg:px-24">
					<header className="mb-10">
						<p className="text-5xl md:text-7xl font-extrabold text-gray-800 dark:text-foreground leading-tight">
							Give your <br />
							<span className="text-blue-600 dark:text-blue-500">
								stories
							</span>{" "}
							a home.
						</p>
						<p className="mt-6 text-lg md:text-xl border-l-4 border-blue-600 pl-4 text-gray-600 dark:text-gray-400 max-w-md">
							Join a community of modern thinkers. Get started now.
						</p>
					</header>

					<div className="space-y-6 w-full">
						<GoogleComp />
						<SignWithEmail
							child={
								<div className="w-full">
									{!showForm ? (
										/* LOGIN / INITIAL SIGNUP FORM STYLE */
										<div>
											<form onSubmit={handleSubmit}>
												<div className="mx-12 flex flex-col gap-0">
													<label
														htmlFor="email"
														className="text-sm font-normal text-foreground">
														Enter your email
													</label>
													<input
														onChange={() => setErrorMsg(null)}
														ref={emailRef}
														type="email"
														id="email"
														required
														placeholder="pennat@exmple.com"
														className="p-2 lowercase border rounded-sm bg-slate-300 min-w-1 sm:w-1/2 text-black"
													/>
													<br />
													<label
														htmlFor="password"
														className="text-sm font-normal text-foreground">
														Enter your password
													</label>
													<input
														onChange={() => setErrorMsg(null)}
														ref={passwordRef}
														type="password" /* Changed to password type for security */
														id="password"
														required
														placeholder="••••••"
														minLength={6}
														maxLength={20}
														className="p-2 border rounded-sm bg-slate-300 min-w-1 sm:w-1/2 text-black"
													/>
													<p className="text-xs wrap-anywhere text-slate-800 mt-2">
														Possibly your password had min. length 6, included
														<br className="hidden sm:block" />
														uppercase, lowercase, numbers and special symbols.
													</p>
												</div>

												<div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center">
													<button
														type="submit"
														className="bg-blue-800 border-blue-800 px-[30%] rounded-full sm:px-4 py-2 mx-4 my-4 sm:mr-0 sm:ml-12 border sm:rounded-md active:bg-gray-600 text-white cursor-pointer">
														Continue
													</button>
													<p className="text-sm sm:ml-8 text-slate-900">
														<NavLink to={"/flow"}>Forgot password?</NavLink>
													</p>
												</div>
												{errorMsg && (
													<div className="mx-12 mt-4">
														<AlertColors errorMsg={errorMsg} />
													</div>
												)}
											</form>
										</div>
									) : (
										/* USER DATA DETAILS FORM STYLE */
										<div>
											<form onSubmit={handleUserData}>
												<div className="mx-12 flex flex-col gap-0">
													<label className="text-sm font-normal text-foreground">
														Full Name
													</label>
													<input
														ref={nameRef}
														type="text"
														required
														className="p-2 border rounded-sm bg-slate-300 min-w-1 sm:w-1/2 text-black"
													/>
													<br />
													<label className="text-sm font-normal text-foreground">
														Username
													</label>
													<input
														ref={usernameRef}
														type="text"
														required
														className="p-2 border rounded-sm bg-slate-300 min-w-1 sm:w-1/2 text-black"
													/>
													<br />
													<label className="text-sm font-normal text-foreground">
														Date of Birth
													</label>
													<input
														ref={dobRef}
														type="date"
														required
														className="p-2 border rounded-sm bg-slate-300 min-w-1 sm:w-1/2 text-black"
													/>
												</div>

												<div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center">
													<button
														type="submit"
														className="bg-blue-800 border-blue-800 px-[30%] rounded-full sm:px-4 py-2 mx-4 my-4 sm:mr-0 sm:ml-12 border sm:rounded-md active:bg-gray-600 text-white cursor-pointer">
														Save Details
													</button>
												</div>

												<div className="mx-12 mt-4">
													{errorMsg && <AlertColors errorMsg={errorMsg} />}
													{success && (
														<AlertBasic
															title="Success!"
															desc="Moving to next step..."
														/>
													)}
												</div>
											</form>
										</div>
									)}
								</div>
							}
						/>

						<p className="text-sm text-gray-600 dark:text-gray-400">
							Already have an account?{" "}
							<span
								onClick={() => navi("/login")}
								className="text-blue-600 dark:text-blue-400 cursor-pointer underline font-medium">
								Log in <ExternalLink className="inline pb-1" size={14} />
							</span>
						</p>
					</div>
				</div>

				<div className="hidden md:flex items-center justify-center  h-full">
					<img
						src={illustration}
						className="w-4/5 max-w-lg object-contain animate-pulse-slow"
						alt="Pennat Illustration"
					/>
				</div>
			</div>
		</div>
	);
}

export default Signup;
