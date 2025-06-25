'use client'

import Link from 'next/link'
//import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import React from 'react'


export default function Header(){
    const [isDropDown, setIsDropDown] = useState(false)
   // const pathname = usePathname()
    const dropdownRef = useRef<HTMLDivElement>(null)

    const sortingLinks = [
        { href: '/', label: 'Quick Sort'},
        { href: '/gnomesort', label: 'Gnome Sort'}
    ]

    useEffect(() => {
        function handleClickOutisde(event: MouseEvent){
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropDown(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutisde)
        return () => {
            document.addEventListener("mousedown", handleClickOutisde)
        }
    },[dropdownRef])

    return(
        <div className="shadow-lg mb-4">
            <div className="bg-background flex flex-row items-center p-2 gap-12">
                <span className="font-bold p-1">Animated Algorithms:</span>

                <nav className="flex items-center">
                    <div ref={dropdownRef}>
                        <span className={`cursor-pointer font-bold p-1 text-rosered decoration-2 ${isDropDown ? 'underline' : 'hover:underline'}`} onClick={() => setIsDropDown(prev => !prev)}>
                            Sort
                        </span>
                            {isDropDown && (
                                <div className="p-2 absolute border border-gray-200 z-20 mt-2 bg-background rounded-sm shadow-lg flex flex-col">
                                    {sortingLinks.map((link, index) => (
                                        <React.Fragment key={link.href}>
                                            <Link
                                                
                                                href={link.href}
                                                onClick={() => setIsDropDown(false)}
                                                className="text-rosered hover:underline"
                                            >
                                                {link.label}
                                            </Link>
                                            {index < sortingLinks.length -1 && (
                                                <hr className="border-t border-gray-200 w-5/6 mx-auto my-1" />
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            )}
                    </div>
                </nav>
                
                <Link href='/' className="cursor-pointer font-bold p-1 text-rosered hover:underline decoration-2">Search</Link>
            </div>

            <div className="bg-rosered h-1"></div>
            <div className="bg-mustard h-1"></div>
            <div className="bg-steelblue h-1"></div>
        </div>
    )
}

