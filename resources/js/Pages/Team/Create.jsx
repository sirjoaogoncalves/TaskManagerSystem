import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ users }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        user_ids: [], // Alteramos para user_ids para armazenar vários ids de usuários selecionados
    });

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            // Se o checkbox foi marcado, adicionamos o id do usuário ao array de user_ids
            setData((prevData) => ({ ...prevData, user_ids: [...prevData.user_ids, value] }));
        } else {
            // Se o checkbox foi desmarcado, removemos o id do usuário do array de user_ids
            setData((prevData) => ({ ...prevData, user_ids: prevData.user_ids.filter(id => id !== value) }));
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('team.store'));
        console.log('click');
    };

    return (
        <Authenticated
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Team</h2>}
        >
            <Head title="Create Team" />
            <div className="py-12 h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white dark:bg-gray-800">
                            <form onSubmit={onSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Name</label>
                                    <input type="text" name="name" id="name" className="mt-1 block w-full dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600 dark:focus:border-gray-500 dark:focus:ring-gray-500 dark:focus:ring-opacity-50 shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Description</label>
                                    <textarea name="description" id="description" className="mt-1 block w-full dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600 dark:focus:border-gray-500 dark:focus:ring-gray-500 dark:focus:ring-opacity-50 shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"></textarea>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Users</label>
                                    {users.data.map((user) => (
                                        <div key={user.id} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="user_id"
                                                id={`user-${user.id}`}
                                                value={user.id}
                                                onChange={handleCheckboxChange}
                                                className="mr-2"
                                            />
                                            <label htmlFor={`user-${user.id}`}>{user.name}</label>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                        Create
                                    </button>
                                    <Link
                                        href={route('team.index')}
                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Cancel
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}

