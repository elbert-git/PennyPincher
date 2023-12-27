import { ReactNode } from "react";

export default function Card(props:{children:ReactNode}){
  return <div className="card">
    {props.children}
  </div>
}