"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { ColumnDef } from "@tanstack/react-table";
import { useMutation } from "convex/react";
import { Edit2, X } from "lucide-react";
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

export type Contact = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  altPhoneNumber?: string;
  relationship: string;
};

export const columns: ColumnDef<Contact>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "relationship",
    header: "Relationship",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const remove = useMutation(api.contacts.remove);
      return (
        <div className="flex flex-row gap-2 justify-end">
          <Button size="icon" variant="ghost">
            <Edit2 />
          </Button>
          <Dialog>
            <DialogTrigger
              className={buttonVariants({
                variant: "destructive",
                size: "icon",
              })}
            >
              <X />
            </DialogTrigger>

            <DialogContent>
              <DialogTitle>
                Are you sure you would like to delete "{row.original.name}"?
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone.
              </DialogDescription>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    variant="destructive"
                    onClick={() =>
                      remove({ id: row.original.id as Id<"contacts"> })
                    }
                  >
                    Delete
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
