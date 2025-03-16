const GoalItem = ({ goal }) => {
    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Meta: ${goal.amount}</h3>
            <p>Plazo: {goal.duration} meses</p>
        </div>
    );
};

export default GoalItem;
