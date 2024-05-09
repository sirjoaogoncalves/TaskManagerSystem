import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import * as XLSX from 'xlsx';

export default function Index({ auth, users, queryParams = null, success, error }) {

    queryParams = queryParams || {};

    //Esta função é invocada quando há uma mudança no campo de pesquisa. Atualiza os parametros de consulta com o novo valor do campo de pesquisa e realiza uma nova requisição GET para atualizar a lista de projetos.
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route('user.index'), queryParams, { replace: true, preserveState: true });
    }

    // Esta função é invocada quando uma tecla é pressionada no campo de pesquisa. Se a tecla pressionada não for 'Enter', chama a função searchFieldChanged para alterar o campo de pesquisa.
    const onKeyPress = (name, e) => {
        if (e.key === 'Enter') return;
        searchFieldChanged(name, e.target.value);
    }
    // Esta função é invocada quando há uma mudança na ordenação. Inverte a direção da ordenação se o campo de ordenação permanecer o mesmo ou define um novo campo de ordenação com direção ascendente. Em seguida, realiza uma nova requisição GET para atualizar a lista de projetos.
    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === 'asc') {
                queryParams.sort_direction = 'desc';
            } else {
                queryParams.sort_direction = 'asc';
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';
        }
        router.get(route('user.index'), queryParams, { replace: true, preserveState: true });
    }
    // Esta função é invocada para excluir um user. Exibe um prompt de confirmação e, se confirmado, realiza uma requisição DELETE para excluir o user.
    const deleteUser = (user) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        router.delete(route('user.destroy', user.id));
    }

    const exportToExcel = () => {
        const data = users.data.map(user => {
            return [
                user.id,
                user.name,
                user.email,
                user.created_at,
            ];
        });

        const ws = XLSX.utils.aoa_to_sheet([
            ['ID', 'Name', 'Email', 'Created At'],
            ...data
        ]);

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Users');

        XLSX.writeFile(wb, 'users.xlsx');
    }


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-center ">
                    <Link href={route('user.create')} className="bg-blue-500 flex hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add User
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </Link>
                    <button onClick={exportToExcel} className="bg-green-500 flex hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2">
                        <span className="mr-1">Export to Excel</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="white" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" >
                            <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V288H216c-13.3 0-24 10.7-24 24s10.7 24 24 24H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM384 336V288H494.1l-39-39c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l80 80c9.4 9.4 9.4 24.6 0 33.9l-80 80c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l39-39H384zm0-208H256V0L384 128z" />
                        </svg>
                    </button>
                </div>
            }
        >

            <Head title="Users" />


            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        {success && (
                            <div className="bg-emerald-500 text-white p-4 mb-4 text-center overflow-hidden shadow-sm sm:rounded-lg">
                                {success}
                            </div>
                        )}
                        {error && (
                            <div className="bg-red-500 text-white p-4 mb-4 text-center overflow-hidden shadow-sm sm:rounded-lg">
                                {error}
                            </div>
                        )}
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <TableHeading
                                                name="id"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                ID
                                            </TableHeading>

                                            <TableHeading
                                                name="name"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Name
                                            </TableHeading>

                                            <TableHeading
                                                name="team"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                                >
                                                Team
                                            </TableHeading>

                                            <TableHeading
                                                name="email"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Email
                                            </TableHeading>

                                            <TableHeading
                                                name="created_at"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Created Date
                                            </TableHeading>


                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3">Actions</th>
                                        </tr>
                                    </thead>

                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

                                            <th scope="col" className="px-6 py-3"></th>
                                            <th scope="col" className="px-6 py-3">
                                                <TextInput className="w-full" placeholder="Search User..." defaultValue={queryParams?.name}
                                                    onBlur={e => searchFieldChanged('name', e.target.value)}
                                                    onKeyPress={e => onKeyPress('name', e)} />
                                            </th>
                                            <th scope="col" className="px-6 py-3"></th>
                                            <th scope="col" className="px-6 py-3">
                                                <TextInput className="w-full" placeholder="User Email.." defaultValue={queryParams?.email}
                                                    onBlur={e => searchFieldChanged('email', e.target.value)}
                                                    onKeyPress={e => onKeyPress('email', e)} />
                                            </th>
                                            <th scope="col" className="px-6 py-3"></th>
                                            <th scope="col" className="px-6 py-3"></th>

                                            <th scope="col" className="px-6 py-3 text-right"></th>
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        {users.data.map((user) => (
                                            <tr key={users.id} className="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                                    {user.id}
                                                </td>
                                                <th className="px-6 py-4 text-white">
                                                    {user.name}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {user.team?.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {user.email}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {user.created_at}
                                                </td>
                                                <td className="px-6 py-4 text-nowrap">
                                                </td>

                                                <td className="px-6 py-4 flex text-nowrap">
                                                    <Link href={route('user.edit', user.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">Edit
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                        </svg>
                                                    </Link>
                                                    <button onClick={(e) => deleteUser(user)} className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">Delete
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={users.meta.links} />
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}
