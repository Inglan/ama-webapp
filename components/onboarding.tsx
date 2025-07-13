import { api } from "@/convex/_generated/api";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { useQuery } from "convex/react";

export default function Onboarding() {
  const userInfo = useQuery(api.userInfo.get);

  return (
    <AlertDialog open={userInfo?.doneOnboarding === false}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Welcome!</AlertDialogTitle>
          <AlertDialogDescription>
            Let's set up your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
