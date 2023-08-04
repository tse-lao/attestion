



export default function ProfileBalance({ loading, balance, token }: { loading: boolean, balance: string, token: string }) {
    return (
      <div className="flex flex-row items-center gap-4 p-4 rounded-lg outline">
        <div className="flex flex-col">
          <span className="text-sm tracking-wider text-green-300 font-bold uppercase">{token}</span>
          <span className={`text-gray-300 font-bold `}>{loading ? "loading" : balance}</span>
        </div>
      </div>
  
    )
  }