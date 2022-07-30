import Image from "next/image";
import { Badge, Spacer, Button } from "../atom";

export default function Header() {
    return (
        <section className="flex flex-row px-36 py-28" id="header">
            <div
                id="content"
                style={{ width: '513px', height: '456px' }}
                className="flex flex-col"
            >
                <Badge text="HOME" />
                <Spacer size={16}/>
                <p className="text-6xl font-bold text-gray-900">
                    A small business is only as good as its tools.
                </p>
                <Spacer size={24}/>
                <p className="text-xl text-gray-500 font-medium">
                    We’re different. Flex is the only saas business 
                    platform that lets you run your business on one platform, 
                    seamlessly across all digital channels.
                </p>
                <Spacer size={32}/>
                <div className="flex flex-row">
                    <Button variant="primary" text="Request a Demo" />
                    <Spacer size={16} />
                    <Button variant="white" text="Sign Up" />
                </div>
            </div>
            <Spacer size={73} />
            <Image style={{ borderRadius: '24px' }} src="/header-image.jpeg" width={554} height={464}/>
        </section>
    )
}