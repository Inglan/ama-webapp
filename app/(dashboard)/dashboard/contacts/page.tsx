"use client";

import { Button } from "@/components/ui/button";
import { columns, Contact } from "./columns";
import { DataTable } from "./data-table";
import { Loader2, Plus } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function ContactsPage() {
  const data = useQuery(api.contacts.get);

  return (
    <div className="max-w-2xl w-full mx-auto p-3 gap-3 flex flex-col">
      <h1 className="text-3xl">Emergency Contacts</h1>
      <div className="flex flex-row justify-end">
        <Button>
          <Plus /> Add Contact
        </Button>
      </div>
      {data ? (
        <DataTable data={data} columns={columns} />
      ) : (
        <div className="w-full p-10 border rounded-md flex justify-center items-center">
          <Loader2 className="animate-spin" />
        </div>
      )}
    </div>
  );
}
