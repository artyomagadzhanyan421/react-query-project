import { useQuery } from '@tanstack/react-query';

const fetchData = async () => {
    const response = await fetch('http://localhost:4000/data');
    if (!response.ok) {
        throw new Error('Failed to fetch recipes');
    }
    return response.json();
};

function Posts() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['recipes'],
        queryFn: fetchData,
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching data...</p>;

    return (
        <div>
            <h1>Recipes</h1>
            <ul>
                {data.map((recipe: any) => (
                    <li key={recipe.id}>
                        <strong>{recipe.title}</strong> - {recipe.cuisine} ({recipe.time})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Posts