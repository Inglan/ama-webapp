"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2, X } from "lucide-react";

export type Contact = {
  name: string;
  phoneNumber: string;
  altPhoneNumber?: string;
  email: string;
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
      return (
        <div className="flex flex-row gap-2">
          <Button size="icon" variant="ghost">
            <Edit2 />
          </Button>
          <Button size="icon" variant="destructive">
            <X />
          </Button>
        </div>
      );
    },
  },
];
