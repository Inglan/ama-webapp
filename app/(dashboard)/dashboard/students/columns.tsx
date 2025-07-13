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
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

export type Student = {
  id: string;
  name: string;
  parentId: string;
  dob: {
    day: number;
    month: number;
    year: number;
  };
  studentId: string;
  notes: string;
};

const updateFormSchema = z.object({
  name: z.string().min(2, "Please enter a name"),
  studentId: z.string().min(1, "Please enter a student ID"),
  dobDay: z.number().min(1).max(31),
  dobMonth: z.number().min(1).max(12),
  dobYear: z.number().min(1900).max(2030),
  notes: z.string(),
});

const StudentActionsCell = ({ row }: { row: Row<Student> }) => {
  const remove = useMutation(api.students.remove);
  const update = useMutation(api.students.update);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const updateForm = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      name: row.original.name,
      studentId: row.original.studentId,
      dobDay: row.original.dob.day,
      dobMonth: row.original.dob.month,
      dobYear: row.original.dob.year,
      notes: row.original.notes,
    },
  });

  async function onUpdateFormSubmit(values: z.infer<typeof updateFormSchema>) {
    try {
      await update({
        id: row.original.id as Id<"students">,
        name: values.name,
        studentId: values.studentId,
        dob: {
          day: values.dobDay,
          month: values.dobMonth,
          year: values.dobYear,
        },
        notes: values.notes,
      });
      setIsEditDialogOpen(false);
      toast.success("Student updated successfully");
    } catch (error) {
      toast.error("Failed to update student");
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
            <DialogTitle>Edit Student</DialogTitle>
            <DialogDescription>
              Update the student information below.
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
                name="studentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student ID</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-3 gap-2">
                <FormField
                  control={updateForm.control}
                  name="dobDay"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Day</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          max="31"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={updateForm.control}
                  name="dobMonth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Month</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          max="12"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={updateForm.control}
                  name="dobYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1900"
                          max="2030"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 2000)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={updateForm.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Notes about the student" />
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
            Are you sure you would like to delete &quot;{row.original.name}
            &quot;?
          </DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                variant="destructive"
                onClick={async () => {
                  try {
                    await remove({ id: row.original.id as Id<"students"> });
                    toast.success("Student deleted successfully");
                  } catch (error) {
                    toast.error("Failed to delete student");
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

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "studentId",
    header: "Student ID",
  },
  {
    accessorKey: "dob",
    header: "Date of Birth",
    cell: ({ row }) => {
      const dob = row.original.dob;
      return `${dob.day}/${dob.month}/${dob.year}`;
    },
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => {
      const notes = row.original.notes;
      return notes.length > 50 ? `${notes.substring(0, 50)}...` : notes;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <StudentActionsCell row={row} />,
  },
];