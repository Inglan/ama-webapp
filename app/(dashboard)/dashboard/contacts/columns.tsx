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
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

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
      const update = useMutation(api.contacts.update);

      return (
        <div className="flex flex-row gap-2 justify-end">
          <Dialog>
            <DialogTrigger
              className={buttonVariants({
                variant: "outline",
                size: "icon",
              })}
            >
              <Edit2 />
            </DialogTrigger>
            <form
              onSubmit={() => {
                alert();
              }}
            >
              <DialogContent>
                <DialogTitle>Edit</DialogTitle>
                <div className="grid w-full items-center gap-3">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Name"
                    type="text"
                    defaultValue={row.original.name}
                  />
                </div>

                <div className="grid w-full items-center gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Email"
                    type="email"
                    defaultValue={row.original.email}
                  />
                </div>

                <div className="grid w-full items-center gap-3">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    placeholder="Phone Number"
                    type="tel"
                    defaultValue={row.original.phoneNumber}
                  />
                </div>

                <div className="grid w-full items-center gap-3">
                  <Label htmlFor="altPhoneNumber">Alternate Phone Number</Label>
                  <Input
                    id="altPhoneNumber"
                    placeholder="Alternate Phone Number"
                    type="tel"
                    defaultValue={row.original.altPhoneNumber}
                  />
                </div>
                <div className="grid w-full items-center gap-3">
                  <Label htmlFor="relationship">Relationship</Label>
                  <Input
                    id="relationship"
                    placeholder="Relationship"
                    type="text"
                    defaultValue={row.original.relationship}
                  />
                </div>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button variant="default" type="submit">
                      Save
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
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
