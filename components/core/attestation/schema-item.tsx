
export default function SchemaItem({name, type}: {name: string, type: string}) {
  return (
    <div className="flex flex-col text-left">
        <span className="font-medium ">
            {name}
        </span>
        <span className="text-sm font-light">
            {type}
        </span>
    </div>
  )
}
