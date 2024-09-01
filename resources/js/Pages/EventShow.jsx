import React, { useState, useEffect } from 'react';
import { usePage, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EventShow = () => {
    const { event, auth, qrCodeSvg, hasJoined } = usePage().props;
    const [userId, setUserId] = useState(null);
    const [joined, setJoined] = useState(hasJoined);

    const { post } = useForm(); // Ensure useForm is initialized

    useEffect(() => {
        if (auth && auth.id) {
            setUserId(auth.id);
        }
    }, [auth]);

    // Debugging logs
    console.log('User ID:', userId);
    console.log('Auth:', auth);
    console.log('Has Joined:', hasJoined);
    console.log('Joined State:', joined);

    if (!userId) {
        return <div>Loading...</div>; // or any loading indicator
    }

    const handleJoin = () => {
        post(route('events.join', event.id), {
            onSuccess: () => {
                setJoined(true);
                toast.success('You have successfully joined the event!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            },
            onError: () => {
                toast.error('Failed to join the event.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        });
    };

    const handleCancel = () => {
        post(route('events.cancel', event.id), {
            onSuccess: () => {
                setJoined(false);
                toast.info('You have successfully canceled your participation.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            },
            onError: () => {
                toast.error('Failed to cancel your participation.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Event Details</h2>}
        >
            <Head title={event.name} />

            <div className="container mx-auto p-4">
                {/* Event Banner */}
                <div className="relative mb-6">
                    <img
                        src={`/storage/${event.header_image}`}
                        alt="Event Banner"
                        className="w-full h-64 object-cover"
                    />
                </div>

                {/* Event Details */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Event Information */}
                        <div className="col-span-2">
                            <h1 className="text-2xl font-bold mb-2">{event.name}</h1>
                            <div className="flex items-center text-gray-600 mb-4">
                                <p className="mr-4"><strong>Date:</strong> {new Date(event.start_time).toLocaleDateString()}</p>
                                <p className="mr-4"><strong>Time:</strong> {new Date(event.start_time).toLocaleTimeString()} - {new Date(event.end_time).toLocaleTimeString()}</p>
                                <p><strong>Points:</strong> {event.youth_points} Youth Points</p>
                            </div>
                            <div className="mb-4">
                                <p><strong>Location:</strong> {event.location}</p>
                                <p>Follow our socials to keep updated regarding this event: Facebook, Messenger, Email</p>
                            </div>
                        </div>

                        {/* QR Code and Register/Cancel Button */}
                        <div className="flex flex-col items-center justify-center">
                            <div
                                className="w-40 h-40 mb-4 flex items-center justify-center bg-gray"
                                style={{ maxWidth: '250px', maxHeight: '250px' }}
                                dangerouslySetInnerHTML={{ __html: qrCodeSvg }}
                            />
                            {userId !== null && (
                                joined ? (
                                    <button
                                        onClick={handleCancel}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded mt-4"
                                    >
                                        Cancel
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleJoin}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded mt-4"
                                    >
                                        Register
                                    </button>
                                )
                            )}
                        </div>
                    </div>

                    {/* Event Overview */}
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold mb-2">Event Overview</h2>
                        <p className="text-gray-600 mb-4">{event.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Left Info */}
                            <div>
                                <p className="mb-2"><strong>1 km</strong> - 1 point</p>
                                <p className="mb-2"><strong>2 km</strong> - 2 points</p>
                                <p className="mb-2"><strong>3 km</strong> - 3 points</p>
                                <p>Points will be given to the top finishers in each category, as well as special awards for the best-dressed participants.</p>
                            </div>

                            {/* Right Map */}
                            <div>
                                <img src={`/storage/${event.map_image}`} alt="Event Location Map" className="w-full h-48 object-cover rounded-md" />
                                <p className="text-gray-600 mt-2">{event.location}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast Notification Container */}
            <ToastContainer />
        </AuthenticatedLayout>
    );
};

export default EventShow;
