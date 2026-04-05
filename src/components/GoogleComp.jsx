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
			className="select-none cursor-pointer w-full sm:w-1/2  md:w-fit md:ml-12
          justify-self-auto  flex justify-center hover:shadow-2xl  "
			onClick={handleGoogleLogin}>
			<div className="flex gap-2 bg-gray-800 px-12 py-4 rounded-xl border-2  hover:bg-gray-600 active:scale-105">
				<img src={gooleLogo} className="h-6 " />

				<span className="text-white">Continue with Google</span>
			</div>
		</div>
	);
}

export default GoogleComp;
