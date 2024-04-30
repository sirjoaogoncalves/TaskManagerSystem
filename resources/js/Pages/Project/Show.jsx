import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PROJECT_STATUS_TEXT_MAP, PROJECT_STATUS_COLOR_MAP } from '@/constants';
import TasksTable from '../Task/TasksTable';

export default function Show({ auth, project, tasks, queryParams }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight text-white">{`Project: "${project.name}"`}</h2>}>

            <Head title={`Project: "${project.name}"`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            <img
                                src={project.img_path}
                                alt={project.name}
                                className='w-full h-64 object-cover'
                            />
                        </div>
                        <div className="p-6 text-white dark:text-black dark:bg-gray-800">

                            <div className="grid grid-cols-2 gap-1 mt-2">
                                <div>
                                    <div>
                                        <label className="font-bold text-lg text-white">Project ID</label>
                                        <p className='mt-1 text-white'>{project.id}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold text-white">Project Name</label>
                                        <p className='mt-1 text-white'>{project.name}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold text-white">Project Status</label>
                                        <p className='mt-1 text-white'>
                                            <span className={"px-2 py-1 rounded text-white " + PROJECT_STATUS_COLOR_MAP[project.status]}>
                                                {PROJECT_STATUS_TEXT_MAP[project.status]}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold text-white">Created By</label>
                                        <p className='mt-1 text-white'>{project.created_by.name}</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label className="font-bold text-lg text-white">Due Date</label>
                                        <p className='mt-1 text-white'>{project.due_date}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold text-white">Creaded At</label>
                                        <p className='mt-1 text-white'>{project.created_at}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold text-white">Updated By</label>
                                        <p className='mt-1 text-white'>{project.updated_by.name}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="text-lg font-bold text-white">Description</label>
                                <p className='mt-1 text-white'>{project.description}</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-100">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-black dark:text-black">
                            <TasksTable tasks={tasks} queryParams={queryParams} hideProjectColumn={true} />
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
