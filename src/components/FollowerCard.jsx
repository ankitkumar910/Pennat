import React, { useContext} from "react";

import { userDp } from "../../public/avtar";
import { NavLink } from "react-router-dom";
import { dataContext, userContext } from "../context/Context";
import supabase from "../config/supabaseClient";
import { toast } from "sonner";

function FollowerCard({ data }) {
	//start
	// 1. Context and Params
	const [currentUser] = useContext(userContext);
	const [, , , , myFollowing, setMyFollowing] = useContext(dataContext);

	// 2. Local State

	//const [loading, setLoading] = useState(true);
	//const [failed, setFailed] = useState(false);

	// UI States (Synced with profileData)

	//end

	async function handleClick() {
		//check if prev followed
		try {
			let prevStatus = myFollowing?.has(data?.user_id);

			if (prevStatus) {
				setMyFollowing((prev) => {
					let temp = new Set();

					prev.forEach((el) => {
						temp.add(el);
					});

					temp.delete(data?.user_id);
					return temp;
				});

				const { error: unfollowError } = await supabase
					.from("FollowTable")
					.delete()
					.eq("follower_id", currentUser?.user_id)
					.eq("following_id", data?.user_id);

				if (unfollowError) {
					toast("Something went wrong.");
					console.log(unfollowError);

					setMyFollowing((prev) => {
						let temp = new Set();

						prev.forEach((el) => {
							temp.add(el);
						});
						temp.add(data?.user_id);
						return temp;
					});

					return;
				}
			} else {
				//setMyFollowing(temp);

				setMyFollowing((prev) => {
					let temp = new Set();

					prev.forEach((el) => {
						temp.add(el);
					});
					temp.add(data?.user_id);
					return temp;
				});

				const { error: followError } = await supabase
					.from("FollowTable")
					.insert({
						follower_id: currentUser?.user_id,
						following_id: data?.user_id,
					});

				if (followError) {
					toast("Something went wrong.");
					console.log(followError);

					setMyFollowing((prev) => {
						let temp = new Set();

						prev.forEach((el) => {
							temp.add(el);
						});

						temp.delete(data?.user_id);
						return temp;
					});

					return;
				}
			}
		} catch (error) {
			console.log(error);
		}
	}


	return (
		<div className="flex  w-full justify-between pr-4 items-center">
			<div className="flex">
				{" "}
				<div className="self-center">
					<img
						src={data?.profile_img ?? userDp}
						width={40}
						className="rounded-full mr-2"
						alt=""
					/>
				</div>
				<div>
					<div className="flex flex-col">
						<NavLink
							to={`/profile/${data?.username ?? ""}`}
							className="text-sm  text-gray-500  hover:underline">
							@{data?.username}
						</NavLink>

						<p className="text-md font-bold">{data?.name}</p>
					</div>

					<p>{data?.about ?? ""}</p>
				</div>
			</div>

			<div>
				<button
					onClick={handleClick}
					className={`${
						!myFollowing?.has(data?.user_id)
							? "bg-foreground text-background"
							: "text-foreground bg-background"
					}  px-4 py-1 rounded-full font-semibold cursor-pointer 
					${currentUser?.user_id == data?.user_id ? "collapse" : ""}
				transition-all
				duration-200
				ease-linear
				hover:scale-101
				hover:shadow-xs
				shadow-background
				`}>
					{!myFollowing?.has(data?.user_id) ? "Follow" : "Following"}
				</button>
			</div>
		</div>
	);
}

export default FollowerCard;
