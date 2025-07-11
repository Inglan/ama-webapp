"use client";

import { Button } from "@/components/ui/button";
import { columns, Student } from "./columns";
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
import { Textarea } from "@/components/ui/textarea";

const addFormSchema = z.object({
  name: z.string().min(2, "Please enter a name"),
  studentId: z.string().min(1, "Please enter a student ID"),
  dobDay: z.number().min(1).max(31),
  dobMonth: z.number().min(1).max(12),
  dobYear: z.number().min(1900).max(2030),
  notes: z.string(),
});

export default function StudentsPage() {
  const data = useQuery(api.students.get);
  const add = useMutation(api.students.add);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const addForm = useForm<z.infer<typeof addFormSchema>>({
    resolver: zodResolver(addFormSchema),
    defaultValues: {
      name: "",
      studentId: "",
      dobDay: 1,
      dobMonth: 1,
      dobYear: 2010,
      notes: "",
    },
  });

  async function onAddFormSubmit(values: z.infer<typeof addFormSchema>) {
    try {
      await add({
        name: values.name,
        studentId: values.studentId,
        dob: {
          day: values.dobDay,
          month: values.dobMonth,
          year: values.dobYear,
        },
        notes: values.notes,
      });
      setIsAddDialogOpen(false);
      addForm.reset();
      toast.success("Student added successfully");
    } catch (error) {
      toast.error("Failed to add student");
    }
  }

  return (
    <div className="max-w-4xl w-full mx-auto p-3 gap-3 flex flex-col">
      <h1 className="text-3xl">Students</h1>
      <div className="flex flex-row justify-end">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus /> Add Student
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>
                Add a new student to your list.
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

                <div className="space-y-2">
                  <FormLabel>Date of Birth</FormLabel>
                  <div className="grid grid-cols-3 gap-2">
                    <FormField
                      control={addForm.control}
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
                      control={addForm.control}
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
                      control={addForm.control}
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
                </div>

                <FormField
                  control={addForm.control}
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
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Add Student</Button>
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
