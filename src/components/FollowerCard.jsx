import React from "react";

import { userDp } from "../../public/avtar";
import { NavLink } from "react-router-dom";

function FollowerCard({ data }) {
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
					className="bg-foreground text-background px-4 py-1 rounded-full font-semibold cursor-pointer 
					collapse
				transition-all
				duration-200
				ease-linear
				hover:scale-101
				hover:shadow-2xl
				shadow-background
				">
					follow
				</button>
			</div>
		</div>
	);
}

export default FollowerCard;
