import { useState } from 'react';
import { useRouter } from 'next/router';
import swal from "sweetalert";
import axios from "axios";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "../components/atom";
import { InputLabel } from "../components/molecule";

export default function Register() {
    const router = useRouter();
    const [userdata, setUserdata] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        gender: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (userdata.confirmPassword === userdata.password ) {
                const { confirmPassword, ...dataRegister } = userdata;
                const response = await axios.post('http://localhost:3001/auth/register', dataRegister);
                const data = response.data;
                if (data.success) {
                    swal(data.message, "Klik OK untuk melanjutkan ke halaman login", "success")
                    .then(() => router.push('/login'));
                }
            } else {
                swal("Password tidak sama!", "Silahkan cek kembali password anda", "error");
            }
        } catch (error) {
            console.log(error);
            if (error.response.status === 400) {
                swal(error.response.data.message, "Silahkan memasukan ulang data anda", "error");
            }
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserdata({ ...userdata, [name]: value });
    }

    return (
        <div className="bg-gray-100 flex items-center justify-center">
            <div style={{ width: '554px' }} className="bg-white shadow-md my-24 pl-24 pr-24 py-12 rounded-2xl">
                <Link href="/"><Image className="cursor-pointer" src="/Logo.png" width={349} height={88} /></Link>
                <hr />
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
                    <div className="flex flex-row gap-4">
                        <InputLabel onChange={e => handleChange(e)} label="First Name*" type="text" name="firstName"/>
                        <InputLabel onChange={e => handleChange(e)} label="Last Name*" type="text" name="lastName"/>
                    </div>
                    <InputLabel onChange={e => handleChange(e)} label="Email*" type="email" name="email" />
                    <InputLabel onChange={e => handleChange(e)} label="Password*" type="password" name="password"/>
                    <InputLabel onChange={e => handleChange(e)} label="Confirm Password*" type="password" name="confirmPassword"/>
                    <InputLabel onChange={e => handleChange(e)} label="Gender*" type="select" name="gender">
                        <option selected>Open this select menu</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </InputLabel>

                    <div className="flex flex-row justify-between">
                        <InputLabel label="Remember me" htmlFor="rememberMe" type="checkbox" name="rememberMe" id="rememberMe"/>
                        <Link href="/forgot-password"><a className="text-red-500 font-bold">Forgot your password?</a></Link>
                    </div>
                    <Button text="Sign Up" small/>
                    <p className="text-center">Already have account? <Link href="/login"><a className='text-red-500'>Sign In</a></Link></p>
                </form>
            </div>
        </div>
    );
}