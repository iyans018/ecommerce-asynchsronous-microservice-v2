import Image from 'next/image';
import Link from 'next/link';
import { Button } from "../components/atom";
import { InputLabel } from "../components/molecule";

export default function Register() {
    return (
        <div className="bg-gray-100 flex items-center justify-center">
            <div style={{ width: '554px' }} className="bg-white shadow-md my-24 pl-24 pr-24 py-12 rounded-2xl">
                <Link href="/"><Image className="cursor-pointer" src="/Logo.png" width={349} height={88} /></Link>
                <hr />
                <form className="flex flex-col gap-4 mt-4">
                    <p className="font-style: italic text-gray-700">
                        Please enter your email address below. you will receive a link to reset your password.
                    </p>
                    <InputLabel label="Email*" type="email" name="email" />
                    <Button text="Confirm" small/>
                    <p className="text-center">
                        Back to <Link href="/login"><a className='text-red-500'>Sign In</a></Link> or <Link href="/register"><a className='text-red-500'>Sign Up</a></Link>
                    </p>
                </form>
            </div>
        </div>
    );
}