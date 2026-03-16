import React, { useEffect, useRef, useState } from "react";
import ArticleCard from "./ArticleCard";
import ProfilePostCard from "./ProfilePostCard";
import { BookText } from "lucide-react";

function UserProfilePosts({ ArticleTable }) {
	const [articles, setArticle] = useState(ArticleTable);
	const [openMenuId, setOpenMenuId] = useState(null);
	const wrapperRef = useRef();

	

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
				setOpenMenuId(null);
			}
		};

		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	return (
		<div>
			<p className="  font-semibold  tracking-wider text-gray-400  pt-4 pb-1 pl-1 text-sm  flex items-center dark:border-[#2f3136]">
			 <BookText size={16}/> <span className="pl-1"> Articles </span>
			</p>

			<div
				className="flex flex-wrap flex-col  sm:flex-row  justify-center sm:items-start items-center"
				ref={wrapperRef}>
				{articles?.map((el) => (
					<ProfilePostCard
						article={el}

						isOpen={openMenuId == el.id}
						setOpenMenuId={setOpenMenuId}
						setArticle={setArticle}
						key={el.id}
					/>
				))}
			</div>
		</div>
	);
}

export default UserProfilePosts;
