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
            <pre>{JSON.stringify(project)}</pre>
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
                        <div className="p-6 text-black dark:text-black">

                            <div className="grid grid-cols-2 gap-1 mt-2">
                                <div>
                                    <div>
                                        <label className="font-bold text-lg">Project ID</label>
                                        <p className='mt-1'>{project.id}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold">Project Name</label>
                                        <p className='mt-1'>{project.name}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold">Project Status</label>
                                        <p className='mt-1'>
                                            <span className={"px-2 py-1 rounded text-white " + PROJECT_STATUS_COLOR_MAP[project.status]}>
                                                {PROJECT_STATUS_TEXT_MAP[project.status]}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold">Created By</label>
                                        <p className='mt-1'>{project.created_by.name}</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label className="font-bold text-lg">Due Date</label>
                                        <p className='mt-1'>{project.due_date}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold">Creaded At</label>
                                        <p className='mt-1'>{project.created_at}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold">Updated By</label>
                                        <p className='mt-1'>{project.updated_by.name}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="text-lg font-bold">Description</label>
                                <p className='mt-1'>{project.description}</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-black dark:text-black">
                            <TasksTable tasks={tasks} queryParams={queryParams} hideProjectColumn={true} />
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>


    );
}
