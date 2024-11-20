import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { paymentFormSchema } from "@/lib/schemas";
import { PaymentForm } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { HiOutlineCreditCard } from "react-icons/hi2";
import { z } from "zod";

type Props = {
  handleBack: () => void;
  handleStep3: (values: PaymentForm) => void;
};

export default function PaymentInfo({ handleBack, handleStep3 }: Props) {
  const form = useForm<z.infer<typeof paymentFormSchema>>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      jobPkg: "pkg-1",
      paymentCurrency: "usd",
    },
  });

  const { control, handleSubmit } = form;

  function onSubmit(values: z.infer<typeof paymentFormSchema>) {
    console.log(values);
    handleStep3(values);
  }

  return (
    <Card className="py-4">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="flex gap-2 items-center">
              <HiOutlineCreditCard className="w-6 h-6" />
              <p>Payment Information</p>
            </CardTitle>
            <CardDescription>
              Please fill up the fields with your relevant job details
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <FormField
              control={control}
              name="jobPkg"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Select your package</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col gap-2"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="pkg-1" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Basic - $200
                        </FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="pkg-2" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Featured - $300
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="paymentCurrency"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Select your payment currency</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col gap-2"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="usd" />
                        </FormControl>
                        <FormLabel className="font-normal">USD</FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="eur" />
                        </FormControl>
                        <FormLabel className="font-normal">EUR</FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="gbp" />
                        </FormControl>
                        <FormLabel className="font-normal">GBP</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="mt-2 flex justify-between">
            <Button type="button" variant="outline" onClick={handleBack}>
              &larr; Go back
            </Button>
            <Button type="submit">Proceed &rarr;</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
