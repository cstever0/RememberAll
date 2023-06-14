import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function Search() {
    const history = useHistory();
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!query) return;
        else history.push(`/search/${query}`)
    };

    return (
        <form
            className="search-form"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                id="search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search here..."
            />
            <button type="submit" id="search-button">
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
        </form>
    )
};

export default Search;
