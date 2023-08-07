"use client"
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { useEffect, useState } from 'react'

export type SchemaInput = {
    name: string
    type: string
}
export default function SchemaForm({list}: {list?: string}) {
    const [schema, setSchema] = useState<SchemaInput[]>([])
    const [formData, setFormData] = useState<any>({})
    useEffect(() => {
        console.log(list)
        
        if(list){
            list.split(",").map((listItem: string) => {
                listItem.split(",").map((item: string) => {
                    const [name, type] = listItem.split(" ")
                    setSchema((prev) => [...prev, {name, type}])
                })  
            });
        }
    }, [list])
    
    const handleChange = (e: any) => {
        console.log(e.target.value)
        setFormData((prev: any) => ({...prev, [e.target.name]: e.target.value}))
    }
  return (
    <div className={`grid grid-cols-4 m-2`}>
        <form>
            
            
        
        {schema.map((item, index) => 
             item.type === "string" && (
                <div key={index}>
                    <Label>{item.name}</Label>
                    <Input
                    name={item.name}
                    type="text"
                    onChange={handleChange}
                    className="block w-full p-2 border rounded-md"
                    />
                </div>
              ) ||
              item.type === "number" && (
                <div key={index}>
                    <Label>{item.name}</Label>
                    <Input
                    name={item.name}
                    type="number"
                    className="block w-full p-2 border rounded-md"
                    />
                </div>
                )
        )}
        
        </form>
    </div>
  )
}
