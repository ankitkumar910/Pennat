import React from "react";
import gooleLogo from "../assets/google.svg";
import { toast } from "sonner";
import supabase from "../config/supabaseClient";
function GoogleComp() {
	async function handleGoogleLogin() {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				redirectTo: window.location.origin,
			},
		});
		if (error) toast.error("Google login failed: " + error.message);
	}
	return (
		<div
			className="w-full flex justify-center md:justify-start md:pl-12 select-none cursor-pointer"
			onClick={handleGoogleLogin}>
			<div
				className="flex items-center justify-center gap-2 
               w-full max-w-[320px] sm:max-w-[380px] 
               dark:bg-gray-800 bg-gray-200 py-4 rounded-xl border-2 
               hover:bg-gray-700 active:scale-105 hover:shadow-xs 
               transition-all duration-300">
				<img src={gooleLogo} className="h-6" alt="Google logo" />
				<span className="text-foreground font-medium">
					Continue with Google
				</span>
			</div>
		</div>
	);
}

export default GoogleComp;
