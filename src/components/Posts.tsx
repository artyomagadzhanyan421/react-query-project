import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

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

const Posts = () => {
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

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching recipes.</p>;

    return (
        <div>
            <h1>JSON data:</h1>
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