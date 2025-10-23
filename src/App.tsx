import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import ReservationScreen from "./pages/ReservationScreen";
import AddReservationScreen from "./pages/AddReservationScreen";
import ProtectedRoute from "./pages/ProtectedRoute";
import AddRoomScreen from "./pages/AddRoomScreen";

export default function App() {

    return (
        <Routes>
            <Route path={"/"} element={<HomeScreen/>} />
            <Route path={"/login"} element={<LoginScreen/>} />
            <Route path={"/register"} element={<RegisterScreen />} />
            <Route path={"/menu"} element={<ReservationScreen />} />
            <Route path={"/reservations/new"} element={<AddReservationScreen />} />
            <Route path={"/rooms/new"} element={
                <ProtectedRoute>
                    <AddRoomScreen />
                </ProtectedRoute>
            } />
        </Routes>
    );

}