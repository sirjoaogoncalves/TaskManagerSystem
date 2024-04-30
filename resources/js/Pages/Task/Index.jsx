import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import TasksTable from "./TasksTable.jsx";

export default function Index({ auth, tasks, queryParams = null , success}) {


    return (
       <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-center">
                                        <Link href={route('task.create')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Task</Link>
                </div>
            }
        >

            <Head title="Tasks" />

            <div className="py-12 h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-dark dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        {success && (<div className="bg-emerald-500 text-white p-4 mb-4 text-center overflow-hidden shadow-sm sm:rounded-lg">
                            {success}
                        </div>)}
                        <div className="bg-dark dark:bg-gray-800 p-6 text-gray-900 dark:text-gray-100">
                            <TasksTable tasks={tasks} queryParams={queryParams} />
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}
