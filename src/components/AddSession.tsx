
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { clients, products } from "./data/mockData";
import { Session } from "@/model";
import { useNavigate } from "react-router-dom";


const FormSchema = z.object({
  clientId: z.string().min(1, "Client must be selected."),
  productId: z.string().min(1, "Product must be selected."),
  date: z.string().min(1, "Date must be selected."),
  paymentFinalization: z.enum(["before", "after"]),
  discount: z.string().min(1, "Discount must be provided."),
  paymentMethod: z.enum(["card", "paypal", "bank-transfer"]),
  location: z.enum(["online", "in-person"]),
  generateInvoice: z.boolean(),
})

type AddSessionProps = {
    addNewSession: (session: Session) => void;
  };

const AddSession = ({ addNewSession }: AddSessionProps) => {

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      clientId: "",
      productId: "",
      date: "",
      paymentFinalization: "before",
      discount: "0",
      paymentMethod: "card",
      location: "online",
      generateInvoice: false,
    },
  })

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const client = clients.find((c) => c.id === data.clientId);
    const product = products.find((p)=> p.id === data.productId);

    if (client && product) {
        const newSession: Session = {
            id: uuidv4(),
            clientId: data.clientId,
            productId: data.productId,
            name: `Sedenie s ${client.name}`,
            date: new Date(data.date),
            durationMinutes: product.durationMinutes,
            price: product.price,
            paymentFinalization: data.paymentFinalization,
            discount: data.discount,
            paymentMethod: data.paymentMethod,
            location: data.location,
            generateInvoice: data.generateInvoice,
        };

        addNewSession(newSession);
        navigate("/");
    }
    
  }

return (
  <div className="flex items-start justify-between">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="clientId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client</FormLabel>
              <FormControl>
                <select {...field} className="border p-2 rounded w-full">
                  <option value="">Select a client</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product</FormLabel>
              <FormControl>
                <select {...field} className="border p-2 rounded w-full">
                  <option value="">Select a product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  </div>
  );
}

export default AddSession;
