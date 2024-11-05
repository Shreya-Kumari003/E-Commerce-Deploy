import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";

function ShoppingOrderDetailsView({ orderDetails }) {
    const { user } = useSelector((state) => state.auth);

    return (
        <DialogContent className="sm:max-w-[600px]">
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <div className="flex mt-6 items-center justify-between">
                        <p className="font-medium">Order ID</p>
                        <Label>{orderDetails?._id}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order Date</p>
                        <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order Price</p>
                        <Label>${orderDetails?.totalAmount}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Payment method</p>
                        <Label>{orderDetails?.paymentMethod}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Payment Status</p>
                        <Label>{orderDetails?.paymentStatus}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order Status</p>
                        <Label>
                            <Badge
                                className={`py-1 px-3 ${orderDetails?.orderStatus === "delivered"
                                    ? "bg-yellow-500"
                                    : orderDetails?.orderStatus === "confirmed"
                                        ? "bg-green-500"
                                        : orderDetails?.orderStatus === "rejected"
                                            ? "bg-red-600"
                                            : "bg-black"
                                    }`}
                            >
                                {orderDetails?.orderStatus}
                            </Badge>
                        </Label>
                    </div>
                </div>
                <Separator />
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium"><b>Order Details</b></div>
                        <ScrollArea className="max-h-[100px] overflow-y-scroll">
                            <ul className="grid gap-3">
                                {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                                    ? orderDetails?.cartItems.map((item) => (
                                        <li className="flex items-center justify-between">
                                            <span className="flex-1">Item: {item.title}</span>
                                            <span className="flex-1 text-center">Quantity: {item.quantity}</span>
                                            <span className="flex-1 text-end pr-3">Price: ${item.price}</span>
                                        </li>
                                    ))
                                    : null}
                            </ul>
                        </ScrollArea>
                        <div className="absolute bottom-0 left-0 right-0 h-5 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium">Shipping Info</div>
                        <div className="grid grid-cols-2 gap-2 text-muted-foreground">
                            <span><b>Customer name:</b> {user.userName}</span>
                            <span><b>Full Address:</b> {orderDetails?.addressInfo?.address}</span>
                            <span><b>City:</b> {orderDetails?.addressInfo?.city}</span>
                            <span><b>Pin:</b> {orderDetails?.addressInfo?.pincode}</span>
                            <span><b>Phone:</b> {orderDetails?.addressInfo?.phone}</span>
                            <span><b>Additional:</b> {orderDetails?.addressInfo?.notes}</span>
                        </div>
                    </div>
                </div>
            </div>
        </DialogContent>
    )
}

export default ShoppingOrderDetailsView;