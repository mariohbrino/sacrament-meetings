import MeetingCreateForm from "@/components/meeting-create-form";

export default function NewMeetingPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl grow flex-col items-center p-6">
      <h1 className="mb-2 text-3xl font-bold">Create Meeting</h1>
      <p className="mb-6 opacity-80">Fill out the form below to create a new sacrament meeting.</p>
      <MeetingCreateForm />
    </div>
  );
}
