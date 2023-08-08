"use client";
import { useEffect, useState } from "react";
import { Attestion, AttestionColumns } from "./columns";
import { AttestionDataTable } from "./data-table";


export default function AttestionData() {
  const [data, setData] = useState<Attestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      // Fetch data from your API here.
      setData([
        {
          "id": "1",
          "name": "John Doe",
          "tags": "tag1, tag2, tag3",
          "file": "file001",
          "status": "attested",
          "email": "johndoe@example.com"
        },
        {
          "id": "2",
          "name": "Jane Smith",
          "tags": "tag4, tag5, tag6",
          "file": "file002",
          "status": "revoked",
          "email": "janesmith@example.com"
        },
        {
          "id": "3",
          "name": "Bob Johnson",
          "tags": "tag7, tag8, tag9",
          "file": "file003",
          "status": "finished",
          "email": "bobjohnson@example.com"
        },
        {
          "id": "4",
          "name": "Alice Williams",
          "tags": "tag10, tag11, tag12",
          "file": "file004",
          "status": "attested",
          "email": "alicewilliams@example.com"
        },
        {
          "id": "5",
          "name": "Charlie Brown",
          "tags": "tag13, tag14, tag15",
          "file": "file005",
          "status": "revoked",
          "email": "charliebrown@example.com"
        }
      ]
      );
      
      setLoading(false);
    }

    getData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      {loading ? <div>Loading...</div> :       <AttestionDataTable columns={AttestionColumns} data={data} />
}
    </div>
  );
}
