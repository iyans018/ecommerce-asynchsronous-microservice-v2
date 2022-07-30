import Image from "next/image";
import { Button, Spacer, Input } from "../atom";

export default function Footer() {
    return (
        <footer style={{ height: 401, padding: '88px 80px' }}>
            <div className="flex flex-row justify-between">                
                <div>
                    <Image src="/small-logo.png" width={174} height={32} />
                    <div className="flex flex-row gap-10">
                        <a className="text-gray-500" href="">Home</a>
                        <a className="text-gray-500" href="">Product</a>
                        <a className="text-gray-500" href="">Features</a>
                        <a className="text-gray-500" href="">Contact</a>
                    </div>
                </div>
                <div>
                    <p className="text-lg font-bold text-gray-900">Newsletter</p>
                    <div className="flex flex-row items-center">
                        <Input type="text" placeholder="Enter your email" />
                        <Spacer size={16} />
                        <Button variant="Primary" text="Subscribe" small/>
                    </div>
                </div>
            </div>
            <Spacer size={50} />
            <hr />
            <Spacer size={46} />
            <div className="flex flex-row justify-between">
                <p className="text-md font-medium text-gray-400">© 2022 Oktavian Aji</p>
                <div className="flex flex-row gap-5">
                    <a className="text-md font-medium text-gray-400">Terms</a>
                    <a className="text-md font-medium text-gray-400">Privacy</a>
                    <a className="text-md font-medium text-gray-400">Cookies</a>
                </div>
            </div>
        </footer>
    )
}