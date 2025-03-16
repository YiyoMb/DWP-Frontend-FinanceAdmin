import GoalItem from "./GoalItem";

const GoalList = ({ goals }) => {
    return (
        <div className="mt-4 space-y-2">
            {goals.length > 0 ? (
                goals.map((goal, index) => <GoalItem key={index} goal={goal} />)
            ) : (
                <p className="text-gray-500">No hay objetivos financieros guardados.</p>
            )}
        </div>
    );
};

export default GoalList;
