"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import AttestionData from "./attestion-table/attestion-data"
import ResolveData from "./resolve-table/resolve-data"

export default function AttestionDetails() {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="attest">Attest</TabsTrigger>
        <TabsTrigger value="view">View Attestions</TabsTrigger>
        <TabsTrigger value="revoke">Revoke</TabsTrigger>
      </TabsList>
      <TabsContent value="attest">
        <Card>
          <CardHeader>
            <CardTitle>Create Attestion</CardTitle>
            <CardDescription>
              Attestion bond: 1.0 ETH
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="tags">Tags</Label>
              <Input id="tags" defaultValue="@peduarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="cid">Cid</Label>
              <Input id="cid" defaultValue="cidvalue" />
            </div>

          </CardContent>
          <CardFooter>
            <Button>Attest</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="view">
        <AttestionData />
      </TabsContent>
      <TabsContent value="revoke">
        <ResolveData />
      </TabsContent>
    </Tabs>
  )
}
