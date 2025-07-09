"use client";

import { ColumnDef } from "@tanstack/react-table";

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
];
