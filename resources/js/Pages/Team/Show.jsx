import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ team, users }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{team.name}</h2>}
        >
            <Head title={team.name} />
            <div className="py-12 h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white dark:bg-gray-800">
                            <div>
                                <p><strong>Description:</strong> {team.description}</p>
                                <p><strong>Users:</strong></p>
                                <ul>
                                    {team.users.map((user) => (
                                        <li key={user.id}>{user.name}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <Link
                                    href={route('team.index')}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Back
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
