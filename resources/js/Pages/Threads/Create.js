import App from '@/Layouts/App'
import React from 'react'
import { useForm } from '@inertiajs/inertia-react';
import Input from '@/Components/Input';
import Button from '@/Components/Button';

export default function Create(props) {
    const { categories } = props;
    console.log(categories)
    const { data, setData, post, reset } = useForm({
        title: '',
        body: '',
        category_id: ''
    })

    const handleChange = (e) => {
        setData(e.target.name, e.target.value)
    }
    const storeHandler = (e) => {
        e.preventDefault();
        post(route('threads.store'));
    }
    return (
        <div>
            <form onSubmit={storeHandler}>
                <div className="mb-5">
                    <Input type="text" name="title" value={data.title} handleChange={handleChange} />
                </div>
                <div className="mb-5">
                    <textarea type="text" name="body" value={data.body} onChange={handleChange} />
                </div>
                <div className="mb-5">
                    <select name="category_id" value={data.category_id} onChange={handleChange}>
                        <option>Choose Category</option>
                        {categories.map(category =>
                            <option key={category.id} value={category.id}>{category.name}</option>
                        )}
                    </select>
                </div>
                <Button>
                    Create
                </Button>
            </form>
        </div>
    )
}

Create.layout = page => <App children={page} title="New Thread" />
