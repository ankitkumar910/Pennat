import { Eclipse, EclipseIcon, Ellipsis } from "lucide-react";
import React, { useState } from "react";

function CommentCard({ comment, deleteComment }) {
	let user_id = comment.user_id;

	const [menuOpen, setMenuOpen] = useState();
	function handleDelete(e) {
		e.stopPropagation();
		deleteComment(comment.id, comment);
	}

	return (
		<div className="   py-4 px-8">
			<div className="flex justify-end ">
				<div
					className="relative
                ">
					<Ellipsis
						className="cursor-pointer"
						onClick={() => {
							setMenuOpen((p) => !p);
						}}
					/>
					{user_id == comment.user_id && (
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
					)}
				</div>
			</div>
			<div className="border-b border-b-gray-300 py-4">{comment.comment}</div>
		</div>
	);
}

export default CommentCard;
