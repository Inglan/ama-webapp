import { Button } from "@/components/ui/button";
import { columns, Contact } from "./columns";
import { DataTable } from "./data-table";
import { Plus } from "lucide-react";

export default function ContactsPage() {
  const data: Contact[] = [
    {
      name: "John Doe",
      email: "john@example.com",
      phoneNumber: "123-456-7890",
      relationship: "Father",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      phoneNumber: "987-654-3210",
      relationship: "Mother",
    },
    {
      name: "Bob Johnson",
      email: "bob@example.com",
      phoneNumber: "555-555-5555",
      relationship: "Brother",
    },
  ];

  return (
    <div className="max-w-2xl w-full mx-auto p-3 gap-3 flex flex-col">
      <h1 className="text-3xl">Emergency Contacts</h1>
      <div className="flex flex-row justify-end">
        <Button>
          <Plus /> Add Contact
        </Button>
      </div>
      <DataTable data={data} columns={columns} />
    </div>
  );
}
