function updateStatusBar() {
	let theme = localStorage.getItem("theme");
	const metaTheme = document.querySelector('meta[name="theme-color"]');
	let color = "#0f172b";

	if (theme == null) {
		localStorage.setItem("theme", "light");
	}

	if (theme == "dark") color = "#000";
	else if (theme == "light") color = "#ffffff";

	metaTheme.setAttribute("content", color);
}

export {updateStatusBar}