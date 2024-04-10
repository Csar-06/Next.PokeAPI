"use client"
import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


const NavBar = ({onSearchChange}) => {

    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');


    const handleInputChange = (event) => {
        // console.log(event.target.value);
        setSearchTerm(event.target.value);
        onSearchChange(event.target.value);
    };
    return (
        <>        <nav className="bg-red-500 border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a className="flex items-center space-x-3 rtl:space-x-reverse" onClick={()=>{
                    router.push('/')
                }}>
                    <Image
                        src={`/International_Pokémon_logo.svg.png`}
                        width={200}
                        height={200}
                        // objectFit="cover"
                        alt={'Pokémon Logo'}
                    />
                </a>
                <div className="flex md:order-2">

                    <div className="relative hidden md:block">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search icon</span>
                        </div>
                        <input type="text" id="search-navbar" value={searchTerm} onChange={handleInputChange} className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-emerald-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
                    </div>

                </div>

            </div>
        </nav>


        </>


    );
}

export default NavBar;
