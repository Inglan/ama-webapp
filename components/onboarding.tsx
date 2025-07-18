"use client";

import { api } from "@/convex/_generated/api";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { useMutation, useQuery } from "convex/react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function Onboarding() {
  const userInfo = useQuery(api.userInfo.get);
  const completeOnboarding = useMutation(api.userInfo.completeOnboarding);
  const [nameInput, setNameInput] = useState("");
  useEffect(() => {
    if (userInfo?.name) {
      setNameInput(userInfo.name);
    }
  }, [userInfo]);

  return (
    <AlertDialog open={userInfo?.doneOnboarding === false}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Welcome!</AlertDialogTitle>
          <AlertDialogDescription>
            Let's set up your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid w-full items-center gap-3">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
        </div>
        <AlertDialogFooter>
          <Button
            onClick={() => {
              completeOnboarding({ name: nameInput });
            }}
          >
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
