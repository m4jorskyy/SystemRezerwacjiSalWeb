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
import ShowRoomsScreen from "./pages/ShowRoomsScreen";
import EditRoomScreen from "./pages/EditRoomScreen";
import EditReservationScreen from "./pages/EditReservationScreen";
import ShowReservationScreen from "./pages/ShowReservationScreen";
import ShowReservationHistoryScreen from "./pages/ShowReservationHistoryScreen";
import GoogleCallbackScreen from "./pages/GoogleCallbackScreen";
import StatsScreen from "./pages/StatsScreen";
import RoomDetails from "./pages/RoomDetails";
import UserDetails from "./pages/UserDetails";

export default function App() {

    return (
        <Routes>
            <Route path={"/"} element={<HomeScreen/>}/>
            <Route path={"/login"} element={<LoginScreen/>}/>
            <Route path={"/register"} element={<RegisterScreen/>}/>
            <Route path={"/menu"} element={<ReservationScreen/>}/>
            <Route path={"/reservations/new"} element={<AddReservationScreen/>}/>
            <Route path={"/rooms/new"} element={
                <ProtectedRoute>
                    <AddRoomScreen/>
                </ProtectedRoute>
            }/>
            <Route path={"/rooms/show"} element={
                <ProtectedRoute>
                    <ShowRoomsScreen/>
                </ProtectedRoute>
            }/>
            <Route path={"/rooms/edit/:id"} element={
                <ProtectedRoute>
                    <EditRoomScreen/>
                </ProtectedRoute>
            }/>
            <Route path={"/reservations/edit/:id"} element={
                <EditReservationScreen/>
            }/>
            <Route path={"reservations/show"} element={
                <ShowReservationScreen/>
            }/>
            <Route path={"/reservations/history"} element={
                <ShowReservationHistoryScreen />
            } />
            <Route path={"/callback"} element={
                <GoogleCallbackScreen />
            } />

            <Route path={"/stats"} element={
                <ProtectedRoute>
                    <StatsScreen />
                </ProtectedRoute>
            } />

            <Route path={"/stats/room/:id"} element={
                <ProtectedRoute>
                    <RoomDetails />
                </ProtectedRoute>
            } />

            <Route path={"/stats/user/:id"} element={
                <ProtectedRoute>
                    <UserDetails />
                </ProtectedRoute>
            } />
        </Routes>
    );

}