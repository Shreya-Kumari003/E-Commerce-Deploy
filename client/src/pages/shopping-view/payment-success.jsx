import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <Card className="p-8 shadow-md rounded-lg bg-white border border-gray-300">
      <CardHeader className="p-0">
        <CardTitle className="text-4xl">Payment is successfull!</CardTitle>
        <CardContent className="pl-0.5 pb-2 text-lg text-gray-600">Thank You For Shopping With Us 💕</CardContent>
      </CardHeader>
      <Button className="mt-5 text-white rounded-md px-4 py-2 hover:bg-green-600 transition duration-150 ease-in-out" onClick={() => navigate("/shop/account")}>
        View Orders
      </Button>
    </Card>
  );
}

export default PaymentSuccessPage;
