import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth,  }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        
    };

    return (
        <>
               <Head title="Sangguniang Kabataan" />
            <div style={{ 
                background: 'linear-gradient(to right, rgba(255, 192, 203, 0.3), rgba(173, 216, 230, 3))', 
                height: '100vh', 
                color: 'black', 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                {/* Top Navigation */}
                
                <div style={{
                    width: '100%', 
                    padding: '10px 20px', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    background: 'rgba(255, 255, 255, 0.8)', // semi-transparent white background
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    position: 'fixed', 
                    top: 0, 
                    left: 0, 
                    zIndex: 1000
                }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src="/logo.png" alt="Logo" style={{ height: '50px' }} />
                        <h1 style={{ marginLeft: '10px', fontSize: '24px' }}>Sangguniang Kabataan</h1>
                    </div>
                    <div>
                        {auth.user ? (
                            <Link href={route('dashboard')} className="text-black hover:underline">
                                Home
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="text-black hover:underline" style={{ marginRight: '10px' }}>
                                    Log in
                                </Link>
                                <Link href={route('register')} className="text-black hover:underline">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Content Section */}
                <div style={{ marginTop: '100px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="flex w-full max-w-4xl mx-auto mt-20">
                        {/* Text Section */}
                        <div className="flex-1">
                            <h2 className="text-4xl font-bold">Sangguniang Kabataan</h2>
                            <p className="mt-4">
                                Youth council in the Philippines that serves as a platform for young individuals to participate in local governance and advocate for the needs and interests of the youth in their communities.
                            </p>
                            <Link href="/learn-more" className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mt-4">
                                See More
                            </Link>
                        </div>

                        {/* Image Section */}
                        <div className="flex-1 flex justify-center items-center">
                            <img src="/images/youth.jpg" alt="Community" style={{ width: '300px', height: '300px', borderRadius: '50%' }} />
                        </div>
                    </div>
                </div>
                
                <footer className="py-4 text-center text-black fixed bottom-0 w-full">
                    All Rights Reserved SK 2024
                </footer>
            </div>
        </>
    );
}