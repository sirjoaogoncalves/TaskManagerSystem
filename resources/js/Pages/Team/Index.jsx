import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, teams }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-center">
                    <Link href={route('team.create')} className="bg-blue-500 hover:bg-blue-700 flex  text-white font-bold py-2 px-4 rounded">
                        Add Team
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </Link>
                </div>
            }
        >
            <Head title="Teams" />
            <div className="py-12 h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <th className="px-6 py-3">ID</th>
                                            <th className="px-6 py-3">Team Name</th>
                                            <th className="px-6 py-3">Description</th>
                                            <th className="px-6 py-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        {teams.data.map((team) => (
                                            <tr key={team.id} className="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <td className="px-6 py-4">{team.id}</td>
                                                <td className="px-6 py-4">
                                                <Link href={route('team.show', team.id)} className="text-blue-500 hover:underline">
                                                    {team.name}
                                                </Link>
                                                </td>
                                                <td className='px-6 py-4'>{team.description}</td>
                                                <td className="px-6 py-4">
                                                    <Link href={route('team.show', team.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</Link>
                                                    <Link href={route('team.destroy', team.id)} method="delete" as="button" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

