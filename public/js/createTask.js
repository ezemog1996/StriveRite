$(document).ready(() => {

    $.get("/api/get_children", function(data) {
        for (i = 0; i < data.length; i++) {
            $("#child").append(`<option value="${data[i].id}">${data[i].name}</option>`)
        }
    });

    const titleInput = $("#task-title");
    const descriptionInput = $("#task-description");
    const date = $("#date");
    const time = $("#time");
    const points = $("#points");
    const priority = $("#priority");
    const assignedTo = $("#child");

    document.querySelector("#btnSave").addEventListener("click", event => {
        event.preventDefault();
        const taskData = {
            childId: assignedTo.val(),
            title: titleInput.val().trim(),
            description: descriptionInput.val().trim(),
            due: date.val().trim() + "T" + time.val(),
            points: parseInt(points.val().trim()),
            priority: priority.val(),
        };

        if (!taskData.childId || !taskData.title || !taskData.description || !taskData.due || !taskData.priority) {
            alert("Please fill out all fields");
            return;
        }

        if (!taskData.points) {
            alert("The point value of the task should be a number");
            return;
        }

        saveTask(
            taskData.childId,
            taskData.title,
            taskData.description,
            taskData.due,
            taskData.points,
            taskData.priority,
        );
        titleInput.val("");
        descriptionInput.val("");
        date.val("");
        time.val("Select time");
        points.val("");
        priority.val("Select Priority Level");
        assignedTo.val("");

    });

    function saveTask(childId, title, description, due, points, priority) {
        $.post("/api/create_task", {
            childId,
            title,
            description,
            due,
            points,
            priority
        })
          .then(() => {
              $("#success-div").text("Task added!");
          })
          .catch(handleSaveErr);
    }

    function handleSaveErr(err) {
        console.log("There was an Error!");
    }

  });