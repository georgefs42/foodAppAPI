import { useEffect, useState } from "react";
import { Recipe } from "./Types";

const SidesPage = () => {
    const [sides, setSides] = useState<Recipe[]>([]);

    useEffect(() => {
        const fetchSides = async () => {
            try {
                const response = await fetch(
                    "https://sti-java-grupp8-ctcktc.reky.se/categories/side/recipes"
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch recipes");
                }
                const data: Recipe[] = await response.json();
                setSides(data);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        };

        fetchSides();
    }, []);

    return (
        <div>
            <h1>Sides</h1>
            {sides.map((side)=>(
                <div key={side.title}>
                    <h2>{side.title}</h2>
                    <img src={side.imageUrl} alt="sidesImage" />
                    <p>description:{side.description}</p>
                    {side.instructions.map((instruction, index) => (
                    <div key={index}>{instruction}</div>
                  ))}
                </div>
            ))}
        </div>
    );
};

export default SidesPage;
