import { CheckIcon, XIcon } from "lucide-react"

export default function AccessType({type, access}: {type: string, access: boolean}) {
  return (
    <div className="rounded-md flex justify-between border border-gray-900 ">
        <span className="p-2 text-gray-300 uppercase text-sm pr-8">
            {type}
        </span>
        <div className="bg-gray-500 rounded-lg border-l border-gray-900 flex items-center px-4">
            {access ? <CheckIcon className="text-green-300" /> : <XIcon className="text-red-300" />}
        </div>
    </div>
  )
}
