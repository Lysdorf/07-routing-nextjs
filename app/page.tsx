import Link from "next/link";

export default function Home() {
  return (
    <section>
      <h1>Welcome to NoteHub</h1>
      <p>Keep all your notes in one place.</p>
      <Link href="/notes/filter/all">View all notes</Link>
    </section>
  );
}
