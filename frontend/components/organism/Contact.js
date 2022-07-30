import Image from "next/image";

import { Spacer, Badge, Button } from "../atom";
import { InputLabel } from "../molecule";


export default function Contact() {
    return (
        <section className="flex flex-col px-36 py-28" id="contact">
            <Badge text="CONTACT" />
            <Spacer size={16} />
            <p className="text-4xl font-bold text-gray-900">
                Let's stay connected
            </p>
            <Spacer size={16} />
            <div style={{ width: 689 }}>
                <p className="text-xl font-medium text-gray-500">
                    It's never been easier to get in touch with Flex. Call us, 
                    use our live chat widget or email and we'll get back to you 
                    as soon as possible!
                </p>
            </div>
            <Spacer size={70}/>
            <div className="flex flex-row items-center">
                <div
                    className="grid grid-cols-2 gap-6"
                >
                    <div style={{ width: 261 }}>
                        <div className="w-12 h-12 bg-red-500 rounded-full"></div>
                        <Spacer size={24}/>
                        <p className="text-3xl text-gray-900 font-bold">Email</p>
                        <Spacer size={16}/>
                        <p className="text-xl text-gray-500 font-medium">oktavian.aji18@gmail.com</p>
                    </div>
                    <div style={{ width: 261 }}>
                        <div className="w-12 h-12 bg-red-500 rounded-full"></div>
                        <Spacer size={24}/>
                        <p className="text-3xl text-gray-900 font-bold">Phone</p>
                        <Spacer size={16}/>
                        <p className="text-xl text-gray-500 font-medium">+62-896-4337-1072</p>
                    </div>
                    <div style={{ width: 261 }}>
                        <div className="w-12 h-12 bg-red-500 rounded-full"></div>
                        <Spacer size={24}/>
                        <p className="text-3xl text-gray-900 font-bold">Office</p>
                        <Spacer size={16}/>
                        <p className="text-xl text-gray-500 font-medium">11480, Jl.Sulaiman No.7</p>
                        <p className="text-xl text-gray-500 font-medium">Kemanggisan, Jakarta Barat</p>
                    </div>
                    <div style={{ width: 261 }}>
                        <div className="w-12 h-12 bg-red-500 rounded-full"></div>
                        <Spacer size={24}/>
                        <p className="text-3xl text-gray-900 font-bold">Socials</p>
                        <Spacer size={35}/>
                        <div className="flex flex-row gap-9">
                            <p className="w-6 h-6 text-center bg-red-500">IG</p>
                            <p className="w-6 h-6 text-center bg-red-500">TW</p>
                            <p className="w-6 h-6 text-center bg-red-500">FB</p>
                            <p className="w-6 h-6 text-center bg-red-500">LI</p>
                        </div>
                    </div>
                </div>
                <Spacer size={32}/>
                <form
                    style={{ 
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '24px',
                        width: 554,
                        height: 510,
                        padding: 40,
                        background: '#F7F8F9',
                        boxShadow: '0px 1px 2px rgba(85, 105, 135, 0.1)',
                        borderRadius: '6px'
                    }}
                    action=""
                >
                    <InputLabel label="Email" type="text" placeholder="example@email.com" />
                    <InputLabel label="Message" type="textarea" placeholder="Your message..." />
                    <Button variant="primary" text="Send" small/>
                </form>
            </div>
        </section>
    )
}