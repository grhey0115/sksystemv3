import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        middle_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div className="flex min-h-screen bg-gray-100"style={{ paddingTop: '-40px' }}>
            <div className="hidden lg:block w-1/2 bg-gradient-to-r from-gray-700 to-red-500 text-white p-8">
                <div className="flex flex-col justify-center h-full items-center">
                    <img src="/logo.png" alt="Logo" className="h-32 w-auto mb-6" />
                    <h2 className="text-3xl font-bold text-center">GET THE LATEST NEWS AND EVENTS FOR THE YOUTH</h2>
                    <p className="mt-4 text-lg text-center">"Unveiling the Power of Dalaguete's Youth: Your Ultimate Destination for SK Federation Updates and Engagements!"</p>
                </div>
            </div>
            <div className="flex flex-col justify-center w-full lg:w-1/2 p-8">
                <GuestLayout>
                    <Head title="Create Your Account" />
                    <h2 className="text-2xl font-bold mb-6">CREATE YOUR ACCOUNT</h2>
                    <form onSubmit={submit} className="space-y-4">
                        <div className="mb-4">
                            <InputLabel htmlFor="first_name" value="First Name" />
                            <TextInput
                                id="first_name"
                                type="text"
                                name="first_name"
                                value={data.first_name}
                                className="mt-1 block w-full"
                                onChange={e => setData('first_name', e.target.value)}
                                required
                            />
                            <InputError message={errors.first_name} className="mt-2" />
                        </div>

                        <div className="flex mb-4 -mx-2">
                            <div className="px-2 w-1/2">
                                <InputLabel htmlFor="middle_name" value="Middle Name" />
                                <TextInput
                                    id="middle_name"
                                    type="text"
                                    name="middle_name"
                                    value={data.middle_name}
                                    className="mt-1 block w-full"
                                    onChange={e => setData('middle_name', e.target.value)}
                                />
                                <InputError message={errors.middle_name} className="mt-2" />
                            </div>
                            <div className="px-2 w-1/2">
                                <InputLabel htmlFor="last_name" value="Last Name" />
                                <TextInput
                                    id="last_name"
                                    type="text"
                                    name="last_name"
                                    value={data.last_name}
                                    className="mt-1 block w-full"
                                    onChange={e => setData('last_name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.last_name} className="mt-2" />
                            </div>
                        </div>

                        <div className="mb-4">
                            <InputLabel htmlFor="phone_number" value="Phone Number" />
                            <TextInput
                                id="phone_number"
                                type="tel"
                                name="phone_number"
                                value={data.phone_number}
                                className="mt-1 block w-full"
                                onChange={e => setData('phone_number', e.target.value)}
                                required
                            />
                            <InputError message={errors.phone_number} className="mt-2" />
                        </div>

                        <div className="mb-4">
                            <InputLabel htmlFor="email" value="E-Mail Address" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                onChange={e => setData('email', e.target.value)}
                                required
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mb-4">
                            <InputLabel htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={e => setData('password', e.target.value)}
                                required
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="mb-6">
                            <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={e => setData('password_confirmation', e.target.value)}
                                required
                            />
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <PrimaryButton disabled={processing}>
                                Register
                            </PrimaryButton>
                            <Link
                                href={route('login')}
                                className="underline text-sm text-gray-600 hover:text-gray-900"
                            >
                                Already registered?
                            </Link>
                        </div>
                    </form>
                </GuestLayout>
            </div>
        </div>
    );
}
