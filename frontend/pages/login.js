import Image from 'next/image';
import Link from 'next/link';
import { Button } from "../components/atom";
import { InputLabel } from "../components/molecule";

export default function Login() {
    return (
        <div className="bg-gray-100 flex items-center justify-center">
            <div style={{ width: '554px' }} className="bg-white shadow-md my-24 pl-24 pr-24 py-12 rounded-2xl">
            <Link href="/"><Image className="cursor-pointer" src="/Logo.png" width={349} height={88} /></Link>
                <hr />
                <form className="flex flex-col gap-4 mt-4">
                    <InputLabel label="Email*" type="email" name="email" />
                    <InputLabel label="Password*" type="password" name="password"/>
                    <div className="flex flex-row justify-between">
                        <InputLabel label="Remember me" htmlFor="rememberMe" type="checkbox" name="rememberMe" id="rememberMe"/>
                        <Link href="/forgot-password"><a className="text-red-500 font-bold">Forgot your password?</a></Link>
                    </div>
                    <Button text="Sign In" small/>
                    <p className="text-center text-md text-gray-800 font-medium">Don't have account? <Link href="/register"><a className='text-red-500'>Sign Up</a></Link></p>
                </form>
            </div>
        </div>
    );
}