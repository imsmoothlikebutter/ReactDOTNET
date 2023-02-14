import Manufacturer from "./components/Manufacturer/ManufacturerDashboard";
import Home from "./components/Home";
import CustomerRequestDashboard from "./components/Refund_Exchanges/CustomerRequestDashboard";
import RestockRequest from "./components/RestockRequest/RestockRequestDashboard";
import ShippingAgent from "./components/ShippingAgent/ShippingAgentDashboard"

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
      path: '/manufacturer',
      element: <Manufacturer />
    },
    {
        path: '/customerrequests',
        element: <CustomerRequestDashboard/>
    },
    {
        path: '/restock',
        element: <RestockRequest/>
    }
    ,
    {
        path: '/shippingagent',
        element: <ShippingAgent/>
    }
  ];
  
  export default AppRoutes;