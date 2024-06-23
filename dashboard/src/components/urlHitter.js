const UrlHitter = ({ className }) => {
    return (
        <div className={className}>
            <div className="relative max-w-lg mx-auto">
                <form className="flex">
                    <div className="relative w-full">
                        <input
                            type="search"
                            id="search-dropdown"
                            className="border-l-4 border-blue-500 block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50  border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                            placeholder="Search Mockups, Logos, Design Templates..."
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="relative p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UrlHitter;
