import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

const Dashboard = () => {
    const { events } = usePage().props;



    return (
        <AuthenticatedLayout
            user={usePage().props.auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home</h2>}
        >
            <Head title="Dashboard" />

            <div className="container mx-auto mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {events && events.length > 0 ? (
                        events.map(event => (
                            <div className="bg-white shadow-md rounded-lg overflow-hidden" key={event.id}>
                                {/* Event Header Image */}
                                <div className="h-32 bg-gray-200">
                                    <img
                                        src={`/storage/${event.header_image}`} 
                                        alt={event.name} 
                                        className="w-full h-full object-cover" 
                                    />
                                </div>

                                {/* Card Content */}
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-2">{event.name}</h3>
                                    <p className="text-gray-600 mb-4 truncate">{event.description}</p>
                                    <Link 
                                        href={route('events.show', event.id)} 
                                        className="block bg-blue-500 text-white text-center font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
                                    >
                                        View Event
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-6 text-center text-gray-600">No events found.</p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard;
