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
    .min(2)
    .regex(/^[0-9]*$/)
    .optional(),
  relationship: z.string().min(2),
});

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

      function onUpdateFormSubmit(values: z.infer<typeof updateFormSchema>) {
        update({
          id: row.original.id as Id<"contacts">,
          email: values.email,
          name: values.name,
          phoneNumber: values.phoneNumber,
          altPhoneNumber: values.altPhoneNumber,
          relationship: values.relationship,
        });
      }

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
            <DialogContent>
              <DialogTitle>Edit</DialogTitle>

              <Form {...updateForm}>
                <form
                  onSubmit={updateForm.handleSubmit(onUpdateFormSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={updateForm.control}
                    name="name"
                    render={() => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={updateForm.control}
                    name="phoneNumber"
                    render={() => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={updateForm.control}
                    name="altPhoneNumber"
                    render={() => (
                      <FormItem>
                        <FormLabel>Alternate Phone</FormLabel>
                        <FormControl>
                          <Input />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={updateForm.control}
                    name="email"
                    render={() => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={updateForm.control}
                    name="relationship"
                    render={() => (
                      <FormItem>
                        <FormLabel>Relationship</FormLabel>
                        <FormControl>
                          <Input placeholder="Relationship" />
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
