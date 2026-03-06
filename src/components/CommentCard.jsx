import { Eclipse, EclipseIcon, Ellipsis } from "lucide-react";
import React, { useState } from "react";
import { userDp } from "../../public/avtar";

function CommentCard({ comment, deleteComment, user_id }) {
	const { UserTable: commenter } = comment;
	console.log(commenter);
	const [menuOpen, setMenuOpen] = useState();
	function handleDelete(e) {
		e.stopPropagation();
		deleteComment(comment.id, comment);
	}

	return (
		<div className="  rounded-xs  px-8 pb-4">
			<div className="flex justify-between ">
				<div className="flex items-center mt-2">
					<img src={commenter.profile_img ?? userDp} className="h-10 mx-2 rounded-full" />

					<div>
						<span className="text-sm mt-2 block text-gray-500">
							{'@'+ commenter?.username}
						</span>
						<div className=" border-b-gray-300 mt-2 ">{comment.comment}</div>
					</div>
				</div>
				<div>
					{user_id == comment.user_id && (
						<div
							className="relative
                ">
							<Ellipsis
								className="cursor-pointer"
								onClick={() => {
									setMenuOpen((p) => !p);
								}}
							/>
							<div className="absolute    right-6 top-2 p-1">
								<ul>
									<li className={`${menuOpen ? "" : "hidden"} transition `}>
										<button
											className="text-red-600 bg-red-100  border rounded-md  p-1 border-red-800"
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
