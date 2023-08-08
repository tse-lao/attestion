"use client"
import Loading from "@/components/core/loading/loading";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import AttestionItem from "./attestion-item";



export default  function Attestions() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([])
  useEffect(() => {
    getData();
  }, [])
  
  async function getData() {
    setLoading(true)
    
    // Fetch data from your API here.
    const APIURL = "https://api.studio.thegraph.com/query/49385/attestations/version/latest";
  
    const tokensQuery = `
    query {
      schemaRegistereds(first: 5) {
        id
        name
        description
        schemaUID
        attestResolutionDays
        isMintable
        mintPrice
        attestReward
      }
    }
  `;
  
    const client = new ApolloClient({
      uri: APIURL,
      cache: new InMemoryCache(),
    });
  
    client
      .query({
        query: gql(tokensQuery),
      })
      .then((data) =>{ 
        console.log("Subgraph data: ", data)
        setData(data.data.schemaRegistereds)
      })
      .catch((err) => {
        console.log("Error fetching data: ", err);
      });
      
      setLoading(false)
  }

  if(loading) return <Loading />

  return (
    <main className="m-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start justify-center">
        {data?.map((item, index) => (
          <AttestionItem key={index} schema={item} />
        ))}
      </div>
    </main>
  );
}
