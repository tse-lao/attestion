import AttestionItem from "./attestion-item";

export default function Attestions() {
    
  return (
    <main className="m-12">
        <div className="grid grid-cols-3 gap-8 items-center justify-center">
            <AttestionItem />
            <AttestionItem />
            <AttestionItem />
            <AttestionItem />
            <AttestionItem />
        </div>
    </main>
  )
}
