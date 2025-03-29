const SuggestedUsers = () => {
  return (
    <div className="w-72 text-white p-4 fixed right-4 top-16">
      <h2 className="font-semibold">Suggested for you</h2>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex justify-between items-center mt-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
            <span>User {i + 1}</span>
          </div>
          <button className="text-blue-400 text-sm">Follow</button>
        </div>
      ))}
    </div>
  );
};
export default SuggestedUsers;