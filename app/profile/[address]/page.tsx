"use client";
import { ActivityGraph } from "./ActivityGraph";
import ProfitContributions from "./ProfitContributions";
import TransactionsList from "./TransactionList";
import UserDetails from "./UserDetails";

export default function ProfilePage({
  params,
}: {
  params: { address: string };
}) {
  

  return (
    <main className="m-3">
      <div className="grid sm:grid-cols-7 mx-auto gap-4 p-4 items-start">
        <div className="col-span-2 p-4 rounded-md">
          <UserDetails
            username="JohnDoe"
            address={params.address}
            totalTokens={100}
          />
        </div>
        <main className="col-span-5">
          <ProfitContributions
            profit={500}
            totalContributions={20}
            approvedContributions={15}
            profitGrowth={7}
          />
          <div className="grid grid-cols-2 gap-8 m-12">
            <TransactionsList
              transactions={["Transaction 1", "Transaction 2"]}
            />
            <ActivityGraph />
          </div>
        </main>
      </div>
    </main>
  );
}
