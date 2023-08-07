import { useEffect, useState } from 'react'
import SchemaItem from '../schema-item'

export type SchemaInput = {
    name: string
    type: string
}
export default function SchemaList({list}: {list?: string}) {
    const [schema, setSchema] = useState<SchemaInput[]>([])
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
    
  return (
    <div className={`grid grid-cols-4 m-2`}>
        {schema.map((item, index) => (
            <SchemaItem key={index} name={item.name} type={item.type} />
        ))}
    </div>
  )
}
