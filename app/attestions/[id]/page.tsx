import { Button } from '@/components/ui/button'
import AttestionDetails from './attestion-details'

export default function AttestionPage() {
  return (
    <main className='flex flex-col justify-center items-center gap-8 m-12'>
        <h1 className="text-xl">Name of the attestison</h1>
        <span className="text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus porro tempore quod
             amet sunt architecto quas sit ratione unde reiciendis quaerat, ipsa vitae nemo earum, nam
              asperiores explicabo temporibus. Asperiores.</span>
        <div className="flex flex-col gap-4 w-full items-center">
            <h3>Schema Attributes</h3>
            
            <div className="grid grid-cols-4 gap-4">
                <span>
                    name 
                </span>
                <span>
                    tags[] 
                </span>
                <span>
                    cid 
                </span>
            </div>
        </div>
        
        <div>
            <Button>
                Mint to view attestions
                1 ETH
            </Button>
        </div>
        
        <AttestionDetails />
    </main>
  )
}
