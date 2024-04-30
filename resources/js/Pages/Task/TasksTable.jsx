import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";
import { Link, router } from "@inertiajs/react";
import { TASK_STATUS_COLOR_MAP, TASK_STATUS_TEXT_MAP } from "@/constants.jsx";

export default function TasksTable({ tasks, queryParams = null, hideProjectColumn = false , success}) {

    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route('task.index'), queryParams, { replace: true, preserveState: true });
    }

    const onKeyPress = (name, e) => {
        if (e.key === 'Enter') return;
        searchFieldChanged(name, e.target.value);
    }

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
        router.get(route('task.index'), queryParams, { replace: true, preserveState: true });
    }

    const deleteTask = (id) => {
        if (confirm('Are you sure you want to delete this task?')) {
            router.delete(route('task.destroy', id), { preserveScroll: true, preserveState: true });
        }
    }


    return (
        <>
        {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            {success}
        </div>}
            <div className="overflow-x-auto">
                <table className="bg-white dark:bg-gray-800 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                            <th className="px-3 py-3">Image</th>
                            {!hideProjectColumn && <th className="px-3 py-3">Project Name</th>}
                            <TableHeading
                                name="name"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Name
                            </TableHeading>

                            <TableHeading
                                name="status"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Status
                            </TableHeading>

                            <TableHeading
                                name="created_at"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Create Date
                            </TableHeading>

                            <TableHeading
                                name="due_date"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Due Date
                            </TableHeading>
                            <th className="px-3 py-3">Created By</th>
                            <th className="px-3 py-3 text-right">Actions</th>
                        </tr>
                    </thead>

                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3"></th>
                            {!hideProjectColumn && <th scope="col" className="px-6 py-3"></th>}
                            <th scope="col" className="px-6 py-3">
                                <TextInput className="w-full" placeholder="Search Task..." defaultValue={queryParams?.name}
                                    onBlur={e => searchFieldChanged('name', e.target.value)}
                                    onKeyPress={e => onKeyPress('name', e)} />
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <SelectInput className="w-full"
                                    onChange={e => searchFieldChanged('status', e.target.value)} defaultValue={queryParams?.status}>
                                    <option value="">Select Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </SelectInput>
                            </th>
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3 text-right"></th>
                        </tr>
                    </thead>

                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {tasks.data.map((task) => (
                            <tr key={task.id} className="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    {task.id}
                                </td>
                                <td className="px-6 py-4">
                                    <img src={task.img_path} style={{ width: 100, height: 100 }} alt={task.name} />
                                </td>
                                {!hideProjectColumn && <td className="px-6 py-4">
                                    {task.project.name}
                                </td>}
                                <td className="px-6 py-4">
                                    <Link href={route('task.show', task.id)} className="font-medium text-white hover:underline">{task.name}</Link>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={"px-2 py-1 rounded text-white " + TASK_STATUS_COLOR_MAP[task.status]}>
                                        {TASK_STATUS_TEXT_MAP[task.status]}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {task.created_at}
                                </td>
                                <td className="px-6 py-4">
                                    {task.due_date}
                                </td>
                                <td className="px-6 py-4">
                                    {task.created_by.name}
                                </td>
                                <td className="px-6 py-4 text-nowrap ">
                                    <Link href={route('task.edit', task.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">Edit</Link>
                                    <button onClick={(e) => deleteTask(task)} className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination links={tasks.meta.links} />
        </>
    )
}
