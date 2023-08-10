import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// components/TransactionsList.tsx

interface TransactionsListProps {
  transactions: string[];
}

const BASE_IMG =
  "https://ipfs.io/ipfs/bafkreiakkhglt2w4zcq42jostqesnyaruaqgpt2rv5mk3twq2zsoockbb4";
const OPTIMISM =
  "https://ipfs.io/ipfs/bafkreicl7z5dtm4l27p3nzwfzkkowyg2h4uukmd2hjchjnr4xwkvvrgy6i";

const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions,
}) => {
  

  const actions = [
    {}, {}, {}, {}, 
  ]
  return (
    <div className="space-y-8">
      {actions.map((transaction, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src="https://ipfs.io/ipfs/bafkreicl7z5dtm4l27p3nzwfzkkowyg2h4uukmd2hjchjnr4xwkvvrgy6i"
              alt="Avatar"
            />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Name of the vault</p>
            <p className="text-sm text-muted-foreground">
              transactionhash
            </p>
          </div>
          <div className="ml-auto font-medium">ACCEPT</div>
        </div>
      ))}

      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage
            src="https://ipfs.io/ipfs/bafkreiakkhglt2w4zcq42jostqesnyaruaqgpt2rv5mk3twq2zsoockbb4"
            alt="Avatar"
          />
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Jackson Lee</p>
          <p className="text-sm text-muted-foreground">jackson.lee@email.com</p>
        </div>
        <div className="ml-auto font-medium">REVOKED</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage
            src="https://ipfs.io/ipfs/bafkreicibykq2nsosoy5yhzsvbmebtu2ykopftainymhrt7crxdngglkaa"
            alt="Avatar"
          />
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
          <p className="text-sm text-muted-foreground">
            isabella.nguyen@email.com
          </p>
        </div>
        <div className="ml-auto font-medium">+$299.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>WK</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">William Kim</p>
          <p className="text-sm text-muted-foreground">will@email.com</p>
        </div>
        <div className="ml-auto font-medium">+$99.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Sofia Davis</p>
          <p className="text-sm text-muted-foreground">sofia.davis@email.com</p>
        </div>
        <div className="ml-auto font-medium">+$39.00</div>
      </div>
    </div>
  );
};

export default TransactionsList;
