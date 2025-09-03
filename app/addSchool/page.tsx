import AddSchoolForm from "@/components/AddSchoolForm";

export default function AddSchoolPage() {
  return (
    <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-lg md:text-2xl lg:text-4xl font-extrabold mb-8 text-foreground">
          Add a New School
        </h1>
        <AddSchoolForm />
    </div>
  );
}
