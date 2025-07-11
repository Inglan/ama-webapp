"use client";

import { Button } from "@/components/ui/button";
import { columns, Contact } from "./columns";
import { DataTable } from "./data-table";
import { Loader2, Plus } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const addFormSchema = z.object({
  name: z.string().min(2, "Please enter a name"),
  email: z.email(),
  phoneNumber: z
    .string()
    .min(2, "Please enter a phone number")
    .regex(/^[0-9]*$/, "Please enter a valid phone number"),
  altPhoneNumber: z
    .string()
    .min(2, "Please enter a phone number")
    .regex(/^[0-9]*$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  relationship: z.string().min(2, "Please enter a relationship"),
});

export default function ContactsPage() {
  const data = useQuery(api.contacts.get);
  const add = useMutation(api.contacts.add);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const addForm = useForm<z.infer<typeof addFormSchema>>({
    resolver: zodResolver(addFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      altPhoneNumber: "",
      relationship: "",
    },
  });

  async function onAddFormSubmit(values: z.infer<typeof addFormSchema>) {
    try {
      await add({
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        altPhoneNumber: values.altPhoneNumber || "",
        relationship: values.relationship,
      });
      setIsAddDialogOpen(false);
      addForm.reset();
      toast.success("Contact added successfully");
    } catch (error) {
      toast.error("Failed to add contact");
    }
  }

  return (
    <div className="max-w-2xl w-full mx-auto p-3 gap-3 flex flex-col">
      <h1 className="text-3xl">Emergency Contacts</h1>
      <div className="flex flex-row justify-end">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus /> Add Contact
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Contact</DialogTitle>
              <DialogDescription>
                Add a new emergency contact to your list.
              </DialogDescription>
            </DialogHeader>

            <Form {...addForm}>
              <form
                onSubmit={addForm.handleSubmit(onAddFormSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={addForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={addForm.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={addForm.control}
                  name="altPhoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alternate Phone</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={addForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={addForm.control}
                  name="relationship"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relationship</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Relationship" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Add Contact</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
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
