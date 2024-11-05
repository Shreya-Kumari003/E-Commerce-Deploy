import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../ui/use-toast";
import { Badge } from "../ui/badge";
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, updateOrderStatus } from "@/store/admin/order-slice";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

const initialFormData = {
    status: "",
};


function AdminOrderDetailsView({ orderDetails }) {
    const [formData, setFormData] = useState(initialFormData);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { toast } = useToast();

    function handleUpdateStatus(event) {
        event.preventDefault();
        console.log(formData);
        const { status } = formData;

        dispatch(
            updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
        ).then((data) => {
            if (data?.payload?.success) {
                dispatch(getOrderDetailsForAdmin(orderDetails?._id));
                dispatch(getAllOrdersForAdmin());
                setFormData(initialFormData);
                toast({
                    title: data?.payload?.message,
                });
            }
            console.log(data, "123");

        });

    }

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
                        <div className="font-medium">Order Details</div>
                        <ul className="grid gap-3">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="border-slate-400">View Details</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-[550px]">
                                    <li className="flex items-center justify-between pb-2">
                                        <span className="flex-1 pl-3"><b>Item</b></span>
                                        <span className="flex-1 text-center"><b>Quantity</b></span>
                                        <span className="flex-1 text-end pr-3"><b>Price</b></span>
                                    </li>
                                    <DropdownMenuSeparator />
                                    {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                                        ? orderDetails?.cartItems.map((item) => (
                                            <li className="flex items-center justify-between pb-2">
                                                <span className="flex-1 pl-3">{item.title}</span>
                                                <span className="flex-1 text-center">{item.quantity}</span>
                                                <span className="flex-1 text-end pr-3">${item.price}</span>
                                            </li>
                                        ))
                                        : null}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </ul>
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
                <div>
                    <CommonForm
                        formControls={[
                            {
                                label: "Order Status",
                                name: "status",
                                componentType: "select",
                                options: [
                                    { id: "pending", label: "Pending" },
                                    { id: "inProcess", label: "In Process" },
                                    { id: "inShipping", label: "In Shipping" },
                                    { id: "delivered", label: "Delivered" },
                                    { id: "rejected", label: "Rejected" },
                                ],
                            },
                        ]}
                        formData={formData}
                        setFormData={setFormData}
                        buttonText={"Update Order Status"}
                        onSubmit={handleUpdateStatus}
                    />
                </div>
            </div>
        </DialogContent>
    );
}

export default AdminOrderDetailsView;
