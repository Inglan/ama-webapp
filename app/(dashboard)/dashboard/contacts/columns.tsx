"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { ColumnDef, Row } from "@tanstack/react-table";
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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export type Contact = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  altPhoneNumber?: string;
  relationship: string;
};

const updateFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phoneNumber: z
    .string()
    .min(2)
    .regex(/^[0-9]*$/),
  altPhoneNumber: z
    .string()
    .regex(/^[0-9]*$/)
    .optional()
    .or(z.literal("")),
  relationship: z.string().min(2),
});

const ContactActionsCell = ({ row }: { row: Row<Contact> }) => {
  const remove = useMutation(api.contacts.remove);
  const update = useMutation(api.contacts.update);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const updateForm = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      name: row.original.name,
      email: row.original.email,
      phoneNumber: row.original.phoneNumber,
      altPhoneNumber: row.original.altPhoneNumber,
      relationship: row.original.relationship,
    },
  });

  async function onUpdateFormSubmit(values: z.infer<typeof updateFormSchema>) {
    try {
      await update({
        id: row.original.id as Id<"contacts">,
        email: values.email,
        name: values.name,
        phoneNumber: values.phoneNumber,
        altPhoneNumber: values.altPhoneNumber,
        relationship: values.relationship,
      });
      setIsEditDialogOpen(false);
      toast.success("Contact updated successfully");
    } catch (error) {
      toast.error("Failed to update contact");
    }
  }

  return (
    <div className="flex flex-row gap-2 justify-end">
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogTrigger
          className={buttonVariants({
            variant: "outline",
            size: "icon",
          })}
        >
          <Edit2 />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Contact</DialogTitle>
            <DialogDescription>
              Update the contact information below.
            </DialogDescription>
          </DialogHeader>

          <Form {...updateForm}>
            <form
              onSubmit={updateForm.handleSubmit(onUpdateFormSubmit)}
              className="space-y-4"
            >
              <FormField
                control={updateForm.control}
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
                control={updateForm.control}
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
                control={updateForm.control}
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
                control={updateForm.control}
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
                control={updateForm.control}
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
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button variant="default" type="submit">
                  Save
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
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
            Are you sure you would like to delete &quot;{row.original.name}&quot;?
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
                onClick={async () => {
                  try {
                    await remove({ id: row.original.id as Id<"contacts"> });
                    toast.success("Contact deleted successfully");
                  } catch (error) {
                    toast.error("Failed to delete contact");
                  }
                }}
              >
                Delete
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
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
    cell: ({ row }) => <ContactActionsCell row={row} />,
  },
];
