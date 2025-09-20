interface SortProps {
  onSort: (value: string[]) => void;
}

export default function Sort({ onSort }: SortProps) {
  return (
    <label>
      Sort by:
      <select onChange={(event) => onSort(event.target.value.split(" "))}>
        <option value="likes desc">Likes high-low</option>
        <option value="likes asc">Likes low-high</option>
      </select>
    </label>
  );
}
