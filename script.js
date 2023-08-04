document.addEventListener("DOMContentLoaded", function() {
    const addButton = document.getElementById("add-button");
    const searchInput = document.getElementById("search-input");
    const listContainer = document.getElementById("list-container");
  
    addButton.addEventListener("click", function() {
      const text = searchInput.value.trim();
      if (text !== "") {
        const listItem = document.createElement("li");
        listItem.classList.add("list-item");
  
        const itemText = document.createElement("span");
        itemText.textContent = text;
  
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "&#10006;"; // Cross symbol
  
        listItem.appendChild(itemText);
        listItem.appendChild(deleteButton);
        listContainer.appendChild(listItem);
  
        // Add event listener to delete button
        deleteButton.addEventListener("click", function() {
          listItem.remove();
        });
  
        searchInput.value = "";
      }
    });
  
    searchInput.addEventListener("keyup", function(event) {
      if (event.key === "Enter") {
        addButton.click();
      }
    });
    
  });
 