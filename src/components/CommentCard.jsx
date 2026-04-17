import { Eclipse, EclipseIcon, Ellipsis } from "lucide-react";
import React, { useState } from "react";
import { userDp } from "../../public/avtar";
import { TimeFormate } from "./utils/TimeFormater";
import { NavLink } from "react-router-dom";

function CommentCard({ comment, deleteComment, user_id }) {
	const { UserTable: commenter } = comment;
	const { created_at } = comment;
	let date = Date.parse(created_at);

	const [menuOpen, setMenuOpen] = useState();
	function handleDelete(e) {
		e.stopPropagation();
		deleteComment(comment.id, comment);
	}

	return (
		<div className="py-1  rounded-xl   last:pb-12 last:border-b-0  ">
			<div className="flex justify-between ">
				<div className="flex items-center mt-1  w-full">
					<img
						src={commenter?.profile_img ?? userDp}
						className="h-9 -mt-7 ring ring-gray-300 dark:ring-gray-800 rounded-full"
					/>

					<div className="ml-1 w-full sm:w-3/4 ">
						<span className="text-sm items-center  flex   text-gray-500">
							<NavLink
								to={`/profile/${commenter?.username}`}
								className="text-center  text-sm font-semibold text-gray-600   dark:text-gray-400">
								{"@" + commenter?.username}
							</NavLink>
							<span className="text-xs pl-1 text-center">
								{" "}
								&#183; {TimeFormate(created_at)}
							</span>
						</span>

						<div className=" dark:border-gray-900 border-gray-200 border text-foreground mt-1 ml-1 pb-6  rounded-tl-0 rounded-r-md rounded-bl-md pl-2 pt-1 text-sm dark:bg-[#0d0d0e] bg-[#dbdbdb] w-full ">
							{comment.comment}
						</div>
					</div>
				</div>
				<div>
					{user_id == comment.user_id && (
						<div
							className="relative
                ">
							<Ellipsis
								className={`collapse cursor-pointer rounded-4xl rotate-90 mt-2 active:bg-gray-300`}
								size={20}
								onClick={() => {
									setMenuOpen((p) => !p);
								}}
							/>
							<div className="absolute    right-4 top-2 p-1">
								<ul>
									<li className={`${menuOpen ? "" : "hidden"} transition `}>
										<button
											className="text-red-600 bg-red-100 dark:bg-red-500 dark:text-black  border rounded-md  px-3 py-1 border-red-800 dark:border-red-800"
											onClick={handleDelete}>
											Delete
										</button>
									</li>
								</ul>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default CommentCard;
