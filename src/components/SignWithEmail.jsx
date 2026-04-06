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

export function SignWithEmail({ child }) {
	return (
		<Dialog>
			<form>
				<DialogTrigger asChild>
					<div>
						<EmailComp />
					</div>
				</DialogTrigger>
				<DialogContent className="sm:max-w-3xl py-4 pb-12 px-4">
					<DialogHeader>
						<DialogTitle>Create Account</DialogTitle>
						<DialogDescription>
							Please ensure your email address is accurate and choose a secure
							password. All provided details must be authentic.
						</DialogDescription>
					</DialogHeader>
					{child}
				</DialogContent>
			</form>
		</Dialog>
	);
}
