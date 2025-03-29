const Stories = () => {
  return (
    <div className="flex gap-3 overflow-x-scroll max-w-xl p-4 border-b border-gray-700">
      {[...Array(20)].map((_, i) => (
        <div key={i} className="h-16 w-16 border-2 border-red-500 rounded-full bg-gray-200 flex-shrink-0"></div>
      ))}
    </div>
  );
};
export default Stories;