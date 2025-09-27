"use client";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Loader2, AlertCircle, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

// --- Redux Imports ---
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { fetchAllOrders, cancelOrderAsAdmin, cancelOrder  } from "@/lib/redux/slices/orderSlice";

// Helper to format date and time
const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
};

// Helper to assign colors to status badges
const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" | "destructive-outline" => {
    switch (status) {
        case 'Delivered': return 'default';
        case 'Shipped': return 'default';
        case 'Processing': return 'secondary';
        case 'Paid': return 'secondary';
        case 'Cancelled': return 'destructive-outline'; // This ensures "Cancelled" is red
        default: return 'outline';
    }
}

export default function AdminOrdersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading, error, pagination } = useSelector((state: RootState) => state.order);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCancelling, setIsCancelling] = useState<string | null>(null); 

  useEffect(() => {
    // Fetch orders for the current page. The limit is hardcoded to 10 here.
    dispatch(fetchAllOrders({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

  const handleCancelOrder = async (orderId: string) => {
    setIsCancelling(orderId); // Set loading state for this specific button
    try {
      // Dispatch the new generic `cancelOrder` thunk
      await dispatch(cancelOrder({ orderId })).unwrap();
      toast.success("Order has been successfully cancelled.");
    } catch (err: any) {
      // `unwrap()` will throw the error from `rejectWithValue`
      toast.error(err || "Failed to cancel the order.");
    } finally {
      setIsCancelling(null); // Reset loading state
    }
  };
  
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading && orders.length === 0) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-red-600">
        <AlertCircle className="h-8 w-8 mb-2" />
        <p className="font-semibold">Failed to load orders</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md p-5">
      <h1 className="text-3xl font-bold mb-8">All Customer Orders</h1>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">S.No</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length > 0 ? (
                orders.map((order, index) => (
                <TableRow key={order._id}>
                  <TableCell>{(currentPage - 1) * 10 + index + 1}</TableCell>
                  <TableCell className="font-mono text-xs">{order._id}</TableCell>
                  <TableCell>{order.user?.fullName || 'N/A'}</TableCell>
                  <TableCell>{formatDateTime(order.createdAt)}</TableCell>
                  <TableCell>₹{order.totalPrice.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(order.orderStatus)}>
                      {order.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm" asChild>
                        <Link href={`/account/admin/orders/${order._id}`}>
                            <Eye className="mr-2 h-4 w-4" /> View
                        </Link>
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          disabled={['Cancelled', 'Delivered', 'Shipped'].includes(order.orderStatus)|| isCancelling === order._id}
                        >
                          {isCancelling === order._id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            'Cancel'
                          )}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will cancel order #{order._id}. If paid, a refund will be initiated. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>No, Keep It</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleCancelOrder(order._id)}>
                            Yes, Cancel Order
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
                ))
            ) : (
                <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                        No orders found.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <span className="text-sm text-muted-foreground">
            Page {pagination.currentPage} of {pagination.totalPages}
        </span>
        <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
        >
            <ChevronLeft className="h-4 w-4" />
            Previous
        </Button>
        <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= pagination.totalPages}
        >
            Next
            <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}