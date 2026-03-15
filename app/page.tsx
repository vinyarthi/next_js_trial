import Link from "next/link";

export default function Home() {
  return (<div className="flex flex-col items-center justify-center min-h-screen">
    <h1 className="m-4 text-2xl font-bold">This is welcome screen of Pet Art Creation App</h1>
    <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href="/create">Create Art</Link>
  </div>
  );
}
