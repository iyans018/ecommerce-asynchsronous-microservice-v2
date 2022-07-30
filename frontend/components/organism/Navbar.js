import { useState } from "react";
import { useRouter } from 'next/router';
import Image from "next/image";
import Link from "next/link";
import { Button, VerticalLine } from "../atom";

export default function Navbar() {
    const router = useRouter();
    const [toggleSearch, setToggleSearch] = useState(false);

    return (
        <nav className="px-20 py-6 bg-white shadow-md">
            <div className="flex flex-row justify-between items-center">
                <Link href="/"><Image className="cursor-pointer" src="/small-logo.png" width={174} height={32} /></Link>
                <div className="flex flex-row gap-12">
                    <a className="text-gray-900" href="">Home</a>
                    <a className="text-gray-500" href="">Product</a>
                    <a className="text-gray-500" href="">Features</a>
                    <a className="text-gray-500" href="">Contact</a>
                </div>
                <div className="flex flex-row gap-4 justify-center items-center">
                    <Image className="cursor-pointer" src="/icon-cart.png" width={18} height={20} />
                    <input
                        className={`${toggleSearch ? "block" : "hidden"} border border-solid border-gray-300 rounded px-3 text-base font-normal text-gray-700 bg-white bg-clip-padding transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-500 focus:outline-none`}
                        type="text"
                        name="search"
                        placeholder="Search for products in here"
                    />
                    <Image className="cursor-pointer" src="/icon-search.png" width={20} height={20} onClick={() => setToggleSearch(!toggleSearch)} />
                    <VerticalLine lineHeight={36} lineWidth={1} lineColor="#556987" />
                    <Link href="/login"><a>Log In</a></Link>
                    <Button onClick={() => router.push("/register")} variant="primary" text="Sign Up" small/>
                    {/* <div className="flex flex-row items-center gap-2">
                        <Image className="cursor-pointer" src="/Avatar.png" width={36} height={36} />
                        <p className="font-medium text-sm">John Doe</p>
                    </div> */}
                </div>
            </div>
        </nav>
    );
}