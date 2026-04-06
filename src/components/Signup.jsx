import React, { useRef, useState } from "react";
import supabase from "../config/supabaseClient";
import { AlertColors } from "./ui/AlertColors";
import { AlertBasic } from "./ui/AlertBasic";
import { useNavigate } from "react-router-dom";
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
						<SignWithEmail
							child={
								<div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
									{!showForm ? (
										<form onSubmit={handleSubmit} className="space-y-4">
											<div>
												<label className="block mb-2 text-sm font-medium dark:text-gray-200">
													Email
												</label>
												<input
													ref={emailRef}
													type="email"
													required
													placeholder="name@example.com"
													className="w-full p-3 rounded-lg border bg-white dark:bg-gray-800 text-foreground"
												/>
											</div>
											<div>
												<label className="block mb-2 text-sm font-medium dark:text-gray-200">
													Password
												</label>
												<input
													ref={passwordRef}
													type="password"
													required
													className="w-full p-3 rounded-lg border bg-white dark:bg-gray-800 text-foreground"
												/>
												<p className="text-[10px] mt-2 text-gray-500 italic">
													Min. 6 chars with symbols.
												</p>
											</div>
											<button
												type="submit"
												className="w-full md:w-auto px-8 py-3 bg-slate-900 dark:bg-blue-600 text-white rounded-lg font-bold hover:opacity-90 transition-all">
												Continue
											</button>
										</form>
									) : (
										<form onSubmit={handleUserData} className="space-y-4">
											<div>
												<label className="block mb-2 text-sm font-medium dark:text-gray-200">
													Full Name
												</label>
												<input
													ref={nameRef}
													type="text"
													required
													className="w-full p-3 rounded-lg border bg-white dark:bg-gray-800 text-foreground"
												/>
											</div>
											<div>
												<label className="block mb-2 text-sm font-medium dark:text-gray-200">
													Username
												</label>
												<input
													ref={usernameRef}
													type="text"
													required
													className="w-full p-3 rounded-lg border bg-white dark:bg-gray-800 text-foreground"
												/>
											</div>
											<div>
												<label className="block mb-2 text-sm font-medium dark:text-gray-200">
													Date of Birth
												</label>
												<input
													ref={dobRef}
													type="date"
													required
													className="w-full p-3 rounded-lg border bg-white dark:bg-gray-800 text-foreground"
												/>
											</div>
											<button
												type="submit"
												className="w-full md:w-auto px-8 py-3 bg-slate-900 dark:bg-blue-600 text-white rounded-lg font-bold">
												Save Details
											</button>
										</form>
									)}
									<div>
										{errorMsg && (
											<div className="mt-4">
												<AlertColors errorMsg={errorMsg} />
											</div>
										)}
										{success && (
											<div className="mt-4">
												<AlertBasic
													title="Success!"
													desc="Moving to next step..."
												/>
											</div>
										)}
									</div>
								</div>
							}
						/>

						<GoogleComp />

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
