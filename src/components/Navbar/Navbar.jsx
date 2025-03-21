import { useState, useEffect, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { FileText, LogOut, Menu, X } from "lucide-react";
import { userContext } from "../../Contexts/UserContext/User.context";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { token, logOut } = useContext(userContext);

    return (
        <nav className="bg-gray-800 text-gray-500 px-6 py-4 md:fixed w-full top-0 left-0 z-50 shadow-lg sm:sticky">
            <div className="flex items-center justify-between">
                <h1 className="text-white text-lg font-semibold">MyApp</h1>

                <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-4">
                    {!token ? (
                        <>
                            <Link to="/login" className="px-4 py-2 border rounded text-teal-400 border-teal-400">Login</Link>
                            <Link to="/register" className="px-4 py-2 border rounded text-teal-400 border-teal-400">Register</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/CreateFile" className="px-4 py-2 border rounded text-teal-400 border-teal-400 flex items-center gap-2">
                                    Created Files 
                            </Link>
                            

                            <Link to="/code" className="px-4 py-2 bg-teal-500 text-white rounded">Code Editor</Link>
                            <button onClick={logOut} className="px-4 py-2 border rounded text-red-400 border-red-400 flex items-center gap-2">
                                <LogOut size={18} /> Logout
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden flex flex-col items-center gap-2 mt-4">
                    {!token ? (
                        <>
                            <Link to="/login" className="w-full px-4 py-2 border rounded text-teal-400 border-teal-400 text-center">Login</Link>
                            <Link to="/register" className="w-full px-4 py-2 border rounded text-teal-400 border-teal-400 text-center">Register</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/CreateFile" className="w-full px-4 py-2 border rounded text-teal-400 border-teal-400 text-center flex items-center justify-center gap-2">
                                    Created Files 
                            </Link>
                            <Link to="/code" className="w-full px-4 py-2 bg-teal-500 text-white rounded text-center">Code Editor</Link>
                            <button onClick={logOut} className="w-full px-4 py-2 border rounded text-red-400 border-red-400 flex items-center justify-center gap-2">
                                <LogOut size={18} /> Logout
                            </button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
