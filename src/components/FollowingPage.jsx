import React, { useEffect, useState } from "react";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import FollowerCard from "./FollowerCard";
import supabase from "../config/supabaseClient";
import { ChevronLeft } from "lucide-react";

function FollowingPage() {
	const [followerList, setFollowerList] = useState([]);

	const params = useParams();
	const { username } = params;
	const [searchParam] = useSearchParams();
	const user_id = searchParam.get("id") ?? "";

	useEffect(() => {
		if (!username) console.log("My profile");
		console.log("username");
		console.log(username);
		async function loadFollowers() {
			console.log("Calling supabase to load followers");

			const { data: followData, error: followError } = await supabase
				.from("FollowTable")
				.select(
					"*, UserTable!FollowTable_follower_id_fkey(username, user_id,name,profile_img)"
				)
				.eq("follower_id", user_id);

			if (followError) {
				console.log(followError);
				return;
			}

			if (followData) {
				console.log(followData);
				setFollowerList(followData);
			}
		}
		loadFollowers();
	}, []);

	return (
		<div className=" min-h-screen">
			<div>
				<div className="flex items-center bg-transparent backdrop-blur-3xl transition-all duration-500 border-b ease-in  pb-4 sticky  top-0">
					<NavLink
						onClick={() => {
							history.back();
						}}
						className="ml-2">
						<button className="pt-2 rounded-full   hover:scale-105 transition cursor-pointer  ">
							<ChevronLeft />
						</button>
					</NavLink>
					<h14 className="ml-2">
						<NavLink
							to={`/profile/${username}`}
							className=" text-sm font-semibold inline rounded-3xl px-2 pb-0.5 bg-gray-300 dark:bg-gray-800">
							@{username}
						</NavLink>{" "}
						/ followings
					</h14>
				</div>

				<br />

				<div className=" md:w-1/2 md:mx-auto">
					<ul
						className="-mt-4 *:p-4 
               border-gray-100 *:m-0.5 *:rounded-sm
              
          ">
						{followerList.length > 0 &&
							followerList.map((el) => (
								<li key={el.id}>
									<FollowerCard data={el.UserTable} />
								</li>
							))}

						{followerList.length <= 0 && <div className="text-center">
							{username ? '@' + username : "This user"} does not follow anyone.
							</div>}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default FollowingPage;
