import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

const fetchData = async () => {
    const response = await fetch('http://localhost:3001/data');
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return response.json();
};

const deleteData = async (id: number) => {
    const response = await fetch(`http://localhost:3001/data/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete data');
    }
    return id;
};

const postData = async (newData: { title: string; cuisine: string; time: string }) => {
    const response = await fetch('http://localhost:3001/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
    });

    if (!response.ok) {
        throw new Error('Failed to add data');
    }

    return response.json();
};

const Posts = () => {
    const [title, setTitle] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [time, setTime] = useState('');

    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['recipes'],
        queryFn: fetchData,
    });

    const { mutate: deleteRecipeById, isPending } = useMutation({
        mutationFn: deleteData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['recipes'] });
        },
    });

    const { mutate: addRecipe, isPending: isAdding } = useMutation({
        mutationFn: postData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['recipes'] });
            setTitle('');
            setCuisine('');
            setTime('');
        },
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching recipes.</p>;

    return (
        <div>
            <h1>JSON data:</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    addRecipe({ title, cuisine, time });
                }}
            >
                <input
                    data-testid="title-input"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    data-testid="cuisine-input"
                    placeholder="Cuisine"
                    value={cuisine}
                    onChange={(e) => setCuisine(e.target.value)}
                    required
                />
                <input
                    type='number'
                    data-testid="time-input"
                    placeholder="Time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                />
                <button type="submit" disabled={isAdding} data-testid="add-recipe-button">
                    {isAdding ? 'Adding...' : 'Add Recipe'}
                </button>
            </form>
            <ul>
                {data.map((recipe: any) => (
                    <li key={recipe.id}>
                        <strong>{recipe.title}</strong> - {recipe.cuisine} ({recipe.time})
                        <button
                            onClick={() => deleteRecipeById(recipe.id)}
                            disabled={isPending}
                            style={{ marginLeft: '1rem' }}
                        >
                            {isPending ? 'Deleting...' : 'Delete'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Posts;