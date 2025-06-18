// src/components/Navbar.jsx
import React, { } from "react";
import {Bell,Search} from 'lucide-react'

const Navbar = () => {
 


  return (
     <nav className="fixed w-full z-50 bg-gradient-to-b from-black px-12 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-12">
                  <h1 className="text-red-600 text-3xl font-bold">NETFLIX</h1>
                  <div className="hidden md:flex gap-6">
                    <a href="#" className="text-white text-sm font-light">Home</a>
                    <a href="#" className="text-gray-300 text-sm font-light">Series</a>
                    <a href="#" className="text-gray-300 text-sm font-light">Films</a>
                    <a href="#" className="text-gray-300 text-sm font-light">New & Popular</a>
                    <a href="#" className="text-gray-300 text-sm font-light">My List</a>
                  </div>
                </div>
                <div className="flex items-center gap-6 relative">
                  {/* {isSearchOpen ? (
                    <div className="absolute right-0 top-full mt-2 w-96 bg-zinc-800 rounded-lg shadow-lg">
                      <div className="flex items-center bg-zinc-700 rounded-t-lg p-2">
                        <Search className="w-5 h-5 text-white mr-2" />
                        <input 
                          type="text" 
                          placeholder="Search Movies, TV Shows" 
                          value={searchQuery}
                          onChange={handleSearchChange}
                          className="bg-transparent text-white w-full focus:outline-none"
                        />
                        <button onClick={handleSearchToggle}>
                          <X className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      {searchResults.length > 0 && (
                        <ul className="max-h-80 overflow-y-auto">
                          {searchResults.map(item => (
                            <li 
                              key={item.id} 
                              onClick={() => handleMovieClick(item)}
                              className="px-4 py-2 hover:bg-zinc-700 cursor-pointer flex justify-between text-white"
                            >
                              <span>{item.title}</span>
                              <span className="text-sm text-gray-400">{item.type}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : null} */}
                  
                  <Search 
                    // onClick={handleSearchToggle} 
                    className="w-5 h-5 text-white cursor-pointer" 
                  />
                  <Bell className="w-5 h-5 text-white" />
                </div>
              </div>
            </nav>
  );
};

export default Navbar;
