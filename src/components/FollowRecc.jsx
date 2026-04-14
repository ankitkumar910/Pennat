import React, { useContext, useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import FollowerCard from "./FollowerCard";
import { dataContext, userContext } from "../context/Context";

function FollowRecc() {
	const [followRecc, setFollowRecc] = useState([]);
	const [, , , , myFollowing] = useContext(dataContext);
	const [length, setLength] = useState(0);
	const [userInfo] = useContext(userContext);
	const currentUserId = userInfo?.user_id;

	console.log("My following : ");

	useEffect(() => {
		async function loadFollowRecc() {
			const { data, error } = await supabase.from("UserTable").select("*");

			if (error) {
				console.log("Error while loading reccommandation : ");
				console.log(error);

				return;
			}

			if (data) {
				setFollowRecc(data);
				setLength(Number(data.length - myFollowing.size - 2));
				console.log("Data got for reccommmend.");
			}
		}

		loadFollowRecc();
	}, []);

	return (
		<>
			{Number(followRecc.length - myFollowing.size - 1) > 0 && (
				<div
					className={`

                justify-self-center
				  -mt-8 sm:mt-auto
					 bg-white dark:bg-[#141414]
			 disabled:bg-green-400 w-full    sm:w-[60vw] max-w-2xl   border-[#ebdede] dark:border-[#232225]   
			
		`}>
					{
						<div className="  w-full border-b sm:border     max-w-2xl mx-auto pt-4  px-4   border-[#ebdede] dark:border-[#232225]   sm:rounded-xl transition-all  bg-white dark:bg-[#141414]">
							<div className="dark:text-gray-300 text-gray-900  pb-2 text-sm">
								You may know 	{
										Number(followRecc.length - myFollowing.size - 1) > 1 ? "them" : "him"
									}.{" "}
								<span className="text-xs text-gray-600">
									{" "}
									{Number(followRecc.length - myFollowing.size - 1)}{" "}

									{
										Number(followRecc.length - myFollowing.size - 1) > 1 ? "Suggesstions" : "Suggesstion"
									}
									
								</span>
							</div>

							<div
								className="max-h-[80vh] overflow-y-scroll 
            no-scrollbar
            md:scroll-auto
            
             [&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-track]:bg-background
  [&::-webkit-scrollbar-thumb]:bg-gray-600
  [&::-webkit-scrollbar-thumb]:rounded-full
            
            ">
								{followRecc.map((el) => (
									<span>
										{" "}
										{!myFollowing.has(el.user_id) &&
											el.user_id != currentUserId && (
												<div className=" my-4 rounded-2xl p-4 px-6 w-full">
													<FollowerCard data={el} setLength={setLength} />
												</div>
											)}
									</span>
								))}
							</div>
						</div>
					}
				</div>
			)}
		</>
	);
}

export default FollowRecc;
