
import { Session } from "@/model";
import { Button } from "./ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type MySessionProps = {
  sessions: Session[];
  onEdit: (session: Session) => void;
  onDelete: (session: Session) => void;
};

const MySession = ({ sessions, onEdit, onDelete }: MySessionProps) => {
  return (
    <div className="flex flex-wrap -mx-2">
    {sessions.map((session, index) => (
      <div 
        key={index} 
        className="p-2"
      >
        <Card>
          <CardHeader>
            <CardTitle>{session.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Date: {session.date.toLocaleString()}</p>
            <p>Duration: {session.durationMinutes} minutes</p>
            <p>Price: {session.price} EUR</p>
            <p>Payment: {session.paymentFinalization}</p>
            <p>Discount: {session.discount} EUR</p>
            <p>Payment Method: {session.paymentMethod}</p>
            <p>Location: {session.location}</p>
            <p>Generate Invoice: {session.generateInvoice ? "Yes" : "No"}</p>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <Button
              onClick={() => onEdit(session)}
              variant="myVariant"
            >
              Edit
            </Button>
            <Button
                onClick={() => onDelete(session)}
                variant="destructive"
              >
                Delete
              </Button>
          </CardFooter>
        </Card>
      </div>
    ))}
  </div>
  )
}

export default MySession;
