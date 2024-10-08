import Header from "./components/Header";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TrainerScreen from "./screens/TrainerScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import TrainerListScreen from "./screens/TrainerListScreen";
import TrainerEditScreen from "./screens/TrainerEditScreen";
import OrdersListScreen from "./screens/OrdersListScreen";
import ProgramScreen from "./screens/ProgramScreen";
import TrainerProgramsListScreen from "./screens/TrainerProgramsListScreen";
import ProgramEditScreen from "./screens/ProgramEditScreen";
import ContactScreen from "./screens/ContactScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/orders/:id" element={<OrderScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/search/:keyword" element={<HomeScreen />} />
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/page/:pageNumber" element={<HomeScreen />} exact />
            <Route
              path="/search/:keyword/page/:pageNumber"
              element={<HomeScreen />}
              exact
            />

            <Route path="/contact" element={<ContactScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/trainers/:id" element={<TrainerScreen />} />
            <Route
              path="/trainers/:trainerId/programs/:programId"
              element={<ProgramScreen />}
            />
            <Route path="/cart/:trainerId?/:id?" element={<CartScreen />} />
            <Route path="/admin/userlist" element={<UserListScreen />} />
            <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
            <Route path="/admin/trainerList" element={<TrainerListScreen />} />
            <Route
              path="/admin/trainerList/:pageNumber"
              element={<TrainerListScreen />}
            />
            <Route
              path="/admin/trainer/:id/edit"
              element={<TrainerEditScreen />}
            />
            <Route
              path="/admin/:id/programlist"
              element={<TrainerProgramsListScreen />}
            />
            <Route
              path="/admin/:trainerId?/program/:programId?/edit"
              element={<ProgramEditScreen />}
            />

            <Route path="/admin/orderlist" element={<OrdersListScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
