import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "@/model";
import { clients, products } from "./data/mockData";
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

const FormSchema = z.object({
  clientId: z.string().min(1, "Client must be selected."),
  productId: z.string().min(1, "Product must be selected."),
  date: z.string().min(1, "Date must be selected."),
  paymentFinalization: z.enum(["before", "after"]),
  discount: z.string().min(1, "Discount must be provided."),
  paymentMethod: z.enum(["card", "paypal", "bank-transfer"]),
  location: z.enum(["online", "in-person"]),
  generateInvoice: z.boolean(),
});

type EditSessionModalProps = {
  session: Session;
  updateSession: (session: Session) => void;
  onClose: () => void;
};

const EditSessionModal = ({
  session,
  updateSession,
  onClose,
}: EditSessionModalProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      clientId: session.clientId,
      productId: session.productId,
      date: session.date.toISOString().substring(0, 16),
      paymentFinalization: session.paymentFinalization,
      discount: session.discount,
      paymentMethod: session.paymentMethod,
      location: session.location,
      generateInvoice: session.generateInvoice,
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const client = clients.find((c) => c.id === data.clientId);
    const product = products.find((p) => p.id === data.productId);

    if (client && product) {
      const updatedSession: Session = {
        ...session,
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

      updateSession(updatedSession);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/2">
        <button onClick={onClose} className="absolute top-2 right-2 text-red-600">
          X
        </button>
        <h2 className="text-xl font-semibold mb-4">Edit Session</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            <FormField
              control={form.control}
              name="paymentFinalization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Finalization</FormLabel>
                  <FormControl>
                    <select {...field} className="border p-2 rounded w-full">
                      <option value="before">Before</option>
                      <option value="after">After</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount</FormLabel>
                  <FormControl>
                    <Input placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <FormControl>
                    <select {...field} className="border p-2 rounded w-full">
                      <option value="card">Card</option>
                      <option value="paypal">PayPal</option>
                      <option value="bank-transfer">Bank transfer</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <select {...field} className="border p-2 rounded w-full">
                      <option value="online">Online</option>
                      <option value="in-person">In Person</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="generateInvoice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Generate Invoice</FormLabel>
                  <FormControl>
                    {/* <input  type="checkbox" {...field} className="border ml-2 rounded" /> */}
                    <select
                        {...field}
                        className="border p-2 rounded w-full"
                        onChange={(e) => field.onChange(e.target.value === "true")}
                        value={field.value ? "true" : "false"}
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between">
              <Button type="submit">Update Session</Button>
              <Button onClick={() => onClose()}>Cancel</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditSessionModal;
