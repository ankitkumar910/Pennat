import NavbarPage from "./NavbarPage";
import ArticlePage from "./ArticlePage";
import AddArticle from "./AddArticle";


import FieldInput from "./ui/FieldInput";
import ArticleWriter from "./ArticleWriter";
import { useEffect, useState } from "react";

import { FilePenLine } from "lucide-react";

function Home() {
	
	const [write, setWriter] = useState();

	useEffect(() => {
		const callB = (e) => {
			let articleWriter = document.getElementById("article_Writer");
			let articleButton = document.getElementById("article_Button");
			let target = e.target;

			e.stopPropagation();

			if (articleButton?.contains(target)) {
				//console.log("Clciked on Button");
				setWriter(true);
			}
			if (write == true && !articleWriter?.contains(target)) {
				//console.log("Clciked on writer");
				setWriter(false);
			}
		};
		document.addEventListener("click", callB);

		return () => {
			document.removeEventListener("click", callB);
		};
	}, [write]);

	return (
		<div className="w-full  -mt-2 box-border h-fit  min-h-screen dark:bg-[#1F1B24]">
			<NavbarPage />

			<div
				className="
			    mt-15 overflow-auto"
				id="writer">
				{write && <ArticleWriter />}
				<div
					hidden={write}
					className="border-0 bg-black bottom-2 right-2 fixed justify-center sm:mx-auto mx-2 w-fit  text-sm rounded-full my-2 py-1 
					
					mb-4 ">
					<div
						id="article_Button"
						className="h-full w-full px-4 flex justify-between items-center py-3 outline-0"
						placeholder="">
						<FilePenLine color="white" />
						<span className="p-1 text-white">Write Article</span>
					</div>
				</div>
			</div>

			<div className="box-border">
				<ArticlePage />
			</div>


		
		</div>
	);
}

export default Home;
