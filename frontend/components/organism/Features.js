import Image from "next/image";
import { Spacer, Badge } from "../atom";

export default function Features() {
    return (
        <section className="flex flex-col justify-center items-center px-36 py-20 bg-gray-900" id="features">
            <Badge text="FEATURES" />
            <Spacer size={16} />
            <p className="text-4xl text-white font-bold">
                Gain more insight into how people use your
            </p>
            <Spacer size={16} />
            <p className="text-xl text-center font-medium text-gray-500">
                With our integrated CRM, project management, collaboration and invoicing 
                capabilities, you can manage every aspect of your business in one secure platform.
            </p>
            <Spacer size={54} />
            <Image style={{ borderRadius: '24px' }} src="/features-image.png" width={750} height={500}/>
            <Spacer size={73} />
            <div className="flex flex-row">
                <div style={{ width: 359, height: 262 }} className="flex flex-col justify-center items-center">
                    <div className="bg-red-500" style={{ width: 64, height: 64 }}></div>
                    <Spacer size={24} />
                    <p className="text-2xl text-center text-white font-bold">Measure your performance</p>
                    <Spacer size={14} />
                    <p className="text-base text-center text-gray-400 font-medium">Stay connected with your team and make quick decisions wherever you are.</p>
                </div>
                <Spacer size={32} />
                <div style={{ width: 359, height: 262 }} className="flex flex-col justify-center items-center">
                    <div className="bg-red-500" style={{ width: 64, height: 64 }}></div>
                    <Spacer size={24} />
                    <p className="text-2xl text-center text-white font-bold">Measure your performance</p>
                    <Spacer size={14} />
                    <p className="text-base text-center text-gray-400 font-medium">Stay connected with your team and make quick decisions wherever you are.</p>
                </div>
                <Spacer size={32} />
                <div style={{ width: 359, height: 262 }} className="flex flex-col justify-center items-center">
                    <div className="bg-red-500" style={{ width: 64, height: 64 }}></div>
                    <Spacer size={24} />
                    <p className="text-2xl text-center text-white font-bold">Measure your performance</p>
                    <Spacer size={14} />
                    <p className="text-base text-center text-gray-400 font-medium">Stay connected with your team and make quick decisions wherever you are.</p>
                </div>
            </div>
        </section>
    )
}