import Main from "@/app/_components/page/main"

export default function Home({ params }: { params: { id: string } }) {
  return <Main param={params.id}/>
}