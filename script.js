document.addEventListener("DOMContentLoaded", function() {
    const containers = document.querySelectorAll(".container");
    const items = document.querySelectorAll(".item");
    const resetButton = document.getElementById("resetButton");

    let draggedItem = null;

    items.forEach(item => {
      item.addEventListener("dragstart", function() {
        draggedItem = item;
        item.classList.add("dragging");
      });

      item.addEventListener("dragend", function() {
        item.classList.remove("dragging");
      });
    });

    containers.forEach(container => {
      container.addEventListener("dragover", function(e) {
        e.preventDefault();
      });

      container.addEventListener("dragenter", function(e) {
        e.preventDefault();
        container.classList.add("dragging-over");
      });

      container.addEventListener("dragleave", function() {
        container.classList.remove("dragging-over");
      });

      container.addEventListener("drop", function() {
        container.appendChild(draggedItem);
        container.classList.remove("dragging-over");
        draggedItem = null;
        displaySuccessMessage();
      });
    });

    resetButton.addEventListener("click", function() {
      containers[0].innerHTML = `
        <h2>Container 1</h2>
        <div class="item" draggable="true">Item 1</div>
        <div class="item" draggable="true">Item 2</div>
        <div class="item" draggable="true">Item 3</div>
      `;
      containers[1].innerHTML = "<h2>Container 2</h2>";
    });

    function displaySuccessMessage() {
      const successMessage = document.createElement("p");
      successMessage.textContent = "Item dropped successfully!";
      successMessage.classList.add("success-message");

      const container2 = document.querySelector(".container:nth-child(2)");
      container2.appendChild(successMessage);

      // Optional: Remove the success message after a certain duration
      setTimeout(function() {
        successMessage.remove();
      }, 3000); // Remove the message after 3 seconds (adjust as needed)
    }
  });