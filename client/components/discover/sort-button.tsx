export default function Sort({ value, onSort }) {
    return (
        <label>
            Sort by:
            <select
                value={value}
                onChange={(event) => onSort(event.target.value)}>
                <option value="created">Created</option>
                <option value="updated">Updated</option>
                <option value="pushed">Pushed</option>
                <option value="full_name">Name</option>
            </select>
        </label>
    )
}