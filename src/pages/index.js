import Header from "@/components/header";
import { useRouter } from "next/router";

export default function Page() {

  const router=useRouter();

  return <>
    <Header></Header>
    <h1 className=" text-red-300">Hello, Next.js!</h1>
    <button onClick={()=>router.push('/login')}> login</button>
    </>
};
 