import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./../Navbar/Navbar";

export default function Layout() {
    return (
        <>
            <div className='flex flex-col min-h-screen'>
                <Navbar />
                <div className="container  flex-grow ">
                    <Outlet className="flex-grow"></Outlet>
                </div>
            </div>
        </>
    );
}
