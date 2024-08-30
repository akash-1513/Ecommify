import { Card, Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import Loading from "./Loading";
 
const TABLE_HEAD = ["Order ID", "Order Date", "Order Status", "Order Price"];

const TABLE_ROWS = [
  {
    id: 1,
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
    price: 8990
  },
  {
    id: 2,
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
    price: 8990
  },
  {
    id: 3,
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
    price: 8990
  },
  {
    id: 4,
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
    price: 8990
  },
  {
    id: 5,
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
    price: 8990
  },
];
 
export default function Order() {
  const {orders} = useSelector(state => state.order)
  console.log("OO: ", orders)
  return (
    <Card className="h-full w-full overflow-scroll mb-3">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders ? orders.map((row) => (
            <tr key={row._id} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography variant="small" color="black" className="font-normal">
                  {row._id}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="black" className="font-normal">
                  {new Date().toLocaleDateString()}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="black" className="font-medium">
                  {row.orderStatus === "Processing" && <span className="bg-orange-500 p-2 rounded-md">{row.orderStatus}</span>}
                  {row.orderStatus === "Delivered" && <span className="bg-green-500 p-2 rounded-md">{row.orderStatus}</span>}
                  {row.orderStatus === "Shipped" && <span className="bg-blue-500 p-2 rounded-md">{row.orderStatus}</span>}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="black" className="font-normal">
                ₹ {row.totalAmount}
                </Typography>
              </td>
            </tr>
          )) : <Loading />}
        </tbody>
      </table>
    </Card>
  );
}