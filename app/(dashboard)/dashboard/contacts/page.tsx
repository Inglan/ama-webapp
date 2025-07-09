import { columns, Payment } from "./columns";
import { DataTable } from "./data-table";

export default function ContactsPage() {
  const data: Payment[] = [
    { id: "728ed52f", amount: 100, status: "pending", email: "m@example.com" },
  ];

  return (
    <div className="max-w-2xl w-full mx-auto p-3 gap-3 flex flex-col">
      <h1 className="text-3xl">Emergency Contacts</h1>
      <DataTable data={data} columns={columns} />
    </div>
  );
}
