import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { TASK_STATUS_COLOR_MAP, TASK_STATUS_TEXT_MAP, TASK_PRIORITY_COLOR_MAP, TASK_PRIORITY_TEXT_MAP } from '@/constants';


export default function Show({ auth, task }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight text-white">{`Task: "${task.name}"`}</h2>}>

            <Head title={`Task: "${task.name}"`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white  overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            <img
                                src={task.img_path}
                                alt={task.name}
                                className='w-full h-64 object-cover'
                            />
                        </div>
                        <div className="p-6 text-black dark:text-white bg-white dark:bg-gray-800">

                            <div className="grid grid-cols-2 gap-1 mt-2">
                                <div>
                                    <div>
                                        <label className="font-bold text-lg">Task ID</label>
                                        <p className='mt-1'>{task.id}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold">Task Name</label>
                                        <p className='mt-1'>{task.name}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold">Project Name</label>
                                        <p className='mt-1'>                                        <Link href={route('project.show', task.project.id)} className="text-blue-500 hover:text-blue-700">
                                            {task.project.name}
                                        </Link>
                                        </p>

                                    </div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold">Task Status</label>
                                        <p className='mt-1'>
                                            <span className={"px-2 py-1 rounded text-white " + TASK_STATUS_COLOR_MAP[task.status]}>
                                                {TASK_STATUS_TEXT_MAP[task.status]}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold">Created By</label>
                                        <p className='mt-1'>{task.created_by.name}</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label className="font-bold text-lg">Due Date</label>
                                        <p className='mt-1'>{task.due_date}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold">Creaded At</label>
                                        <p className='mt-1'>{task.created_at}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold">Updated By</label>
                                        <p className='mt-1'>{task.updated_by.name}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold">Task Priority</label>
                                        <p className='mt-1'>
                                            <span className={"px-2 py-1 rounded text-white " + TASK_PRIORITY_COLOR_MAP[task.priority]}>
                                                {TASK_PRIORITY_TEXT_MAP[task.priority]}
                                            </span>
                                        </p>
                                    </div>

                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="text-lg font-bold">Description</label>
                                <p className='mt-1'>{task.description}</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </AuthenticatedLayout>


    );
}
