import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { themeContext } from "../../context/Context";
import { LogOut } from "lucide-react";

export function AlertDialogBasic({ titleText, handleLogOut }) {
	const [theme] = useContext(themeContext);
	console.log(theme);
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<div className="p-1 justify-start  px-4 whitespace-nowrap flex items-center   transition cursor-pointer  w-full ">
					<LogOut size={14} className="hover:-rotate-12 mx-1 " />{" "}
					<span className="ml-0.5 text-sm font-normal">{titleText ? titleText : "Show Dialog"}</span>
				</div>
			</AlertDialogTrigger>
			<AlertDialogContent className={`${theme} bg-background text-foreground `}>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						You will be log out of your account. Click 'Continue' to log out.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction className="hover:bg-red-600">
						<span onClick={handleLogOut}>Continue</span>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
