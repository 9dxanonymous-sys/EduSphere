import AssignmentCard from "./AssignmentCard";

function AssignmentList({ assignments, refresh }) {

  if (assignments.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-500">
        No Assignments Found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {assignments.map((assignment) => (

        <AssignmentCard
          key={assignment.id}
          assignment={assignment}
          refresh={refresh}
        />

      ))}

    </div>
  );
}

export default AssignmentList;