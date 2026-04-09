import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EmailComp from "./EmailComp";


export function LoginWithEmail({ child }) {
	return (
		<Dialog>
			<form>
				<DialogTrigger asChild>
					<div>
						<EmailComp />
					</div>
				</DialogTrigger>
				<DialogContent className="sm:max-w-3xl bg-gradient-to-r from-teal-400 to-yellow-200 py-4 pb-12 px-4">
					<DialogHeader>
						<DialogTitle>Login to your account!</DialogTitle>
						<DialogDescription className="text-sm ">
							Please enter your registered email address and password to access
							your account. Ensure your login details are kept confidential.
							
						</DialogDescription>
					</DialogHeader>

                    {child}
					
				</DialogContent>
			</form>
		</Dialog>
	);
}
