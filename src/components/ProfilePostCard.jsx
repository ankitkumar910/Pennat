import React, { useState } from "react";
import parse from "html-react-parser";
import {
	DotIcon,
	Ellipsis,
	Hamburger,
	HamburgerIcon,
	Trash,
	Trash2Icon,
} from "lucide-react";
import supabase from "../config/supabaseClient";
import Loader from "./Loader";

function ProfilePostCard({ article, setArticle, isOpen, setOpenMenuId }) {
	const [loader, setLoader] = useState();

	if (!article) return;

	// Function to handle the delete action
	async function handleDelete() {
		console.log(article);
		setLoader(true);

		const res = await supabase
			.from("ArticleTable")
			.delete()
			.eq("id", article.id);

		if (!res.error) {
			console.log("Calling set articles.");
			setArticle((p) => p.filter((x) => x.id != article.id));
			setLoader(false);
		}
	}

	return (
		<div
			onContextMenu={(e) => {
        e.preventDefault()
				setOpenMenuId(isOpen ? null : article.id);
			}}
			className="border box-border px-1 rounded-md m-1 min-h-30 dark:text-gray-400 min-w-40 flex items-center border-gray-300 dark:bg-[#141414] dark:border-[#1F1B24] max-w-[80%] sm:max-w-1/3">
			{loader && <Loader text={"Deleting.."} />}

			{!loader && (
				<div>
					<div className="flex justify-end -top-2 right-1  relative text-gray-600 ">
						<button
							className=" rounded-md hover:cursor-pointer"
							onClick={() => {
								setOpenMenuId(isOpen ? null : article.id);
							}}>
							<Ellipsis size={21} />
						</button>

						<ul
							hidden={!isOpen}
							className="absolute top-4 right-0  w-40 bg-white dark:bg-[#2C2F36] border-2 rounded-md shadow-lg  group-hover:block *:rounded-md ">
							<li
								className="px-3 py-1  cursor-pointer bg-red-400 hover:bg-red-500 dark:hover:bg-[#3A3D47] text-red-800 dark:text-red-950"
								onClick={handleDelete}>
								Delete
							</li>

							{/* <li className="px-3 py-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-[#3A3D47]">
								Edit
							</li> */}
						</ul>
					</div>

					<div className="">
						<p className="font-bold pt-2 px-2">{article.title}</p>
						<div className="text-sm px-2 text-wrap max-h-60 overflow-y-clip">
							{parse(article.body)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default React.memo(ProfilePostCard);
