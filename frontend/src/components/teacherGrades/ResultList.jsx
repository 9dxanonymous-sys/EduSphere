import ResultCard from "./ResultCard";

function ResultList({
  results,
  onEdit,
  onDelete,
}) {

  if (results.length === 0) {

    return (

      <div className="bg-white rounded-2xl shadow p-8">

        No Results Found

      </div>

    );

  }

  return (

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {
        results.map(result => (

          <ResultCard
            key={result.id}
            result={result}
            onEdit={onEdit}
            onDelete={onDelete}
          />

        ))
      }

    </div>

  );

}

export default ResultList;