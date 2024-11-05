import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import './product-Image.css';
import ZoomDialog from "./zoom-dialog";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";


function ProductDetailsDialog({ open, setOpen, productDetails }) {
    const [reviewMsg, setReviewMsg] = useState("");
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.shopCart);
    const { reviews } = useSelector((state) => state.shopReview);
    const [rating, setRating] = useState(0);
    const { toast } = useToast();


    const [showZoom, setShowZoom] = useState(false);
    const [backgroundPosition, setBackgroundPosition] = useState('center');
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);

    const handleMouseEnter = () => setShowZoom(true);
    const handleMouseLeave = () => {
        setShowZoom(false);
        setMouseX(0);
        setMouseY(0);
    };

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setBackgroundPosition(`${x}% ${y}%`);
        setMouseX(e.clientX - left);
        setMouseY(e.clientY - top);
    };

    function handleRatingChange(getRating) {
        setRating(getRating);
    }


    function handleAddToCart(getCurrentProductId, productTitle, productBrand, getTotalStock) {
        let getCartItems = cartItems.items || [];

        if (getCartItems.length) {
            const indexOfCurrentItem = getCartItems.findIndex(
                (item) => item.productId === getCurrentProductId
            );
            if (indexOfCurrentItem > -1) {
                const getQuantity = getCartItems[indexOfCurrentItem].quantity;
                if (getQuantity + 1 > getTotalStock) {
                    toast({
                        title: `Only ${getQuantity} quantity can be added for this item`,
                        variant: "destructive",
                    });

                    return;
                }
            }
        }
        dispatch(
            addToCart({
                userId: user?.id,
                productId: getCurrentProductId,
                quantity: 1,
            })
        ).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchCartItems(user?.id));
                toast({
                    title: "Added to cart",
                    variant: "success",
                    description: `${productTitle} by ${productBrand} added to your cart!`,
                });
            }
        });
    }

    function handleDialogClose() {
        setOpen(false);
        dispatch(setProductDetails());
        setRating(0);
        setReviewMsg("");
    }


    function handleAddReview() {
        dispatch(
            addReview({
                productId: productDetails?._id,
                userId: user?.id,
                userName: user?.userName,
                reviewMessage: reviewMsg,
                reviewValue: rating,
            })
        ).then((data) => {
            if (data?.payload?.success) {
                console.log("Review added successfully.");
                setRating(0);
                setReviewMsg("");
                dispatch(getReviews(productDetails?._id));
                toast({
                    title: "Review Added Successfully!",
                    variant: "success"
                });
            } else {
                const errorMessage = "Failed to add reiview!";
                toast({
                    title: errorMessage,
                    variant: "destructive",
                    status: "error",
                });
            }
        })
    }




    useEffect(() => {
        if (productDetails !== null) dispatch(getReviews(productDetails?._id));
    }, [productDetails]);

    const averageReview =
        reviews && reviews.length > 0
            ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
            reviews.length
            : 0;

    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogContent className="flex flex-col sm:flex-row gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[80vw] max-h-[95vh] overflow-auto">
                <div className="relative overflow-hidden rounded-lg sm:w-1/2 min-h-[300px] min-w-[300px]">
                    {open && (
                        <>
                            <div
                                className="image-container"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onMouseMove={handleMouseMove}
                            >
                                <img
                                    src={productDetails?.image}
                                    alt={productDetails?.title}
                                    width={600}
                                    height={600}
                                    className="aspect-square w-full object-cover"
                                />
                            </div>

                            <ZoomDialog
                                backgroundImage={productDetails?.image}
                                backgroundPosition={backgroundPosition}
                                show={showZoom}
                                mouseX={mouseX}
                                mouseY={mouseY}
                                dialogScrollTop={document.querySelector('.dialog-content-selector')?.scrollTop || 0} // Get the scroll position of the dialog
                            />
                        </>
                    )}
                </div>
                <div className="sm:w-1/2 flex flex-col">
                    <div>
                        <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
                        <p className="text-muted-foreground text-2xl mb-5 mt-4">
                            {productDetails?.description}
                        </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p
                            className={`text-3xl font-bold text-primary ${productDetails?.salePrice > 0 ? "line-through" : ""
                                }`}
                        >
                            ${productDetails?.price}
                        </p>
                        {productDetails?.salePrice > 0 ? (
                            <p className="text-2xl font-bold text-muted-foreground">
                                ${productDetails?.salePrice}
                            </p>
                        ) : null}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-0.5">
                            <StarRatingComponent rating={averageReview} />
                        </div>
                        <span className="text-muted-foreground">
                            ({averageReview.toFixed(2)})
                        </span>
                    </div>

                        <div className="mt-5 mb-5">
                            {productDetails?.totalStock === 0 ? (
                                <Button className="w-full opacity-60 cursor-not-allowed">
                                    Out of Stock
                                </Button>
                            ) : (
                                <Button
                                    className="w-full"
                                    onClick={() =>
                                        handleAddToCart(
                                            productDetails?._id, productDetails?.title, productDetails?.brand, productDetails?.totalStock
                                        )
                                    }
                                >
                                    Add to Cart
                                </Button>
                            )}
                        </div>
                        <Separator />
                        <div className="max-h-[300px] overflow-auto">
                            <h2 className="text-xl font-bold mb-4">Reviews</h2>
                            <div className="grid mb-6 gap-6">
                                {reviews && reviews.length > 0 ? (
                                    reviews.map((reviewItem) => (
                                        <div className="flex gap-4">
                                            <Avatar className="w-10 h-10 border">
                                                <AvatarFallback>
                                                    {reviewItem?.userName[0].toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="grid gap-1">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-bold">{reviewItem?.userName}</h3>
                                                </div>
                                                <div className="flex items-center gap-0.5">
                                                    <StarRatingComponent rating={reviewItem?.reviewValue} />
                                                </div>
                                                <p className="text-muted-foreground">
                                                    {reviewItem.reviewMessage}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <h1>No Reviews</h1>
                                )}
                            </div>
                            <div className="mt-10 flex-col flex gap-2">
                                <Label>Write a review</Label>
                                <div className="flex gap-1">
                                    <StarRatingComponent
                                        rating={rating}
                                        handleRatingChange={handleRatingChange} />
                                </div>
                                <Input name="reviewMsg" value={reviewMsg}
                                    onChange={(event) => setReviewMsg(event.target.value)}
                                    placeholder="Write a review..." />
                                <Button onClick={handleAddReview} disabled={reviewMsg.trim() === ""}>Submit</Button>
                            </div>
                        </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ProductDetailsDialog;