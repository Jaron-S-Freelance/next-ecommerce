import React, { useState } from "react";

interface TagsProps {
  tags: string[];
  onSelectionChange: (selectedTags: string[]) => void; // Callback to pass selected tags to parent
}

const Tags: React.FC<TagsProps> = ({ tags, onSelectionChange }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagClick = (tag: string) => {
    setSelectedTags((prevSelectedTags) => {
      const newSelectedTags = prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag) // Deselect if already selected
        : [...prevSelectedTags, tag]; // Select if not already selected

      onSelectionChange(newSelectedTags); // Pass the new selection to the parent component
      return newSelectedTags;
    });
  };

  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={`filter-${tag}`}>
          <button
            className={`btn btn-outline btn-sm capitalize text-nowrap ${
              selectedTags.includes(tag) && "btn-active"
            }`} // Change class based on selection
            onClick={() => handleTagClick(tag)}
          >
            {tag.replaceAll("_", " ")}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Tags;
