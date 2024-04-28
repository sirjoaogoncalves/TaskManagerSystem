import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Link, useForm } from '@inertiajs/react';
import TextAreaInput from '@/Components/TextAreaInput';
import SelectInput from '@/Components/SelectInput';

export default function Edit({ auth, user }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        image: user.img_path,
        name: user.name,
        status: user.status,
        description: user.description,
        due_date: user.due_date,
        _method: 'put'
    })

    const onSubmit = (e) => {
        e.preventDefault()
        post(route('user.update', project.id))
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit User
                </h2>
            }>

            <Head title="Edit User" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-black dark">
                            <form
                                onSubmit={onSubmit}
                                className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                            >
                                <div>
                                    <InputLabel
                                        htmlFor="user_image_path"
                                        value="User Image"
                                    />
                                    <TextInput
                                        id="user_image_path"
                                        type="file"
                                        name="image"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData("image", e.target.files[0])}
                                    />
                                    <InputError message={errors.image} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="user_name" value="User Name" />

                                    <TextInput
                                        id="user_name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData("name", e.target.value)}
                                    />

                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="user_description"
                                        value="User Description"
                                    />

                                    <TextAreaInput
                                        id="user_description"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData("description", e.target.value)}
                                    />

                                    <InputError message={errors.description} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="user_due_date"
                                        value="User Deadline"
                                    />

                                    <TextInput
                                        id="user_due_date"
                                        type="date"
                                        name="due_date"
                                        value={data.due_date}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData("due_date", e.target.value)}
                                    />

                                    <InputError message={errors.due_date} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="user_status" value="User Status" />

                                    <SelectInput
                                        name="status"
                                        id="user_status"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData("status", e.target.value)}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </SelectInput>

                                    <InputError message={errors.user_status} className="mt-2" />
                                </div>
                                <div className="mt-4 text-right">
                                    <Link
                                        href={route("user.index")}
                                        className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                                    >
                                        Cancel
                                    </Link>
                                    <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
