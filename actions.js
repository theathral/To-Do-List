let crud = new function () {

    // An array of JSON objects with values.
    this.myNotes = [];

    this.priorityList = ['low', 'medium', 'high', 'critical'];

    this.statusList = ['in_progress', 'scheduled', 'waiting', 'finished'];

    this.createTable = function () {

        // Clear the Board
        $('#inProgressList').empty();
        $('#scheduledList').empty();
        $('#waitingList').empty();
        $('#finishedList').empty();

        crud.myNotes.forEach(json => {
            switch (json.status) {
                case "in_progress":
                    $('#inProgressList').append(makeCard(json));
                    break;
                case "scheduled":
                    $('#scheduledList').append(makeCard(json));
                    break;
                case "waiting":
                    $('#waitingList').append(makeCard(json));
                    break;
                case "finished":
                    $('#finishedList').append(makeCard(json));
                    break;
                default:
                    throw Error;
            }
        })
    };

    // Validate Input
    this.inputValidator = function (id) {

        // Create Note Object
        let obj = {};

        // Validate id
        obj.id = (id >= 0) ? id : this.myNotes.length + 1;

        // Validate title
        const val = $('#title').val().trim();
        obj.title = (val !== '') ? val : 'No Name Note';

        // Validate priority
        const priority = $('#priority').val();
        obj.priority = this.priorityList.includes(priority) ? priority : 'medium';

        // Validate status
        const status = $('#status').val();
        obj.status = this.statusList.includes(status) ? status : 'in_progress';

        // Validate date
        obj.date = $('#date').val().trim();

        // Validate details
        obj.details = $('#details').val().trim();

        return obj;
    }

    // Preparation for Create New Modal
    this.createPreparation = function () {
        $('#noteModalLabel').html('Create Note');

        $('#title').val('');
        $('#priority').val('');
        $('#status').val('');
        $('#date').val('');
        $('#details').val('');

        $('#submitBtn').attr('onclick', 'crud.create()');
    };

    // Create Note
    this.create = function () {

        // Create Note Object and Add to the List
        let obj = this.inputValidator(-1);
        this.myNotes.push(obj);

        // Reload Lists
        this.createTable();
        this.success('The Note has been created successfully');
    };

    // Edit Note.
    this.edit = function (id) {
        // Find Object and Populate Fields
        for (let i = 0; i < this.myNotes.length; i++) {
            const cur = this.myNotes[i];
            if (cur.id === id) {
                $('#noteModalLabel').html('Edit Note #' + cur.id);

                $('#title').val(cur.title);
                $('#priority').val(cur.priority);
                $('#status').val(cur.status);
                $('#date').val(cur.date);
                $('#details').val(cur.details);

                $('#submitBtn').attr('onclick', 'crud.update(' + cur.id + ')');

                break;
            }
        }
    };

    // Update Note
    this.update = function (id) {

        // Find and Update Note
        for (let i = 0; i < this.myNotes.length; i++) {
            if (this.myNotes[i].id === id) {
                this.myNotes[i] = this.inputValidator(id);
                break;
            }
        }

        // Reload Lists
        this.createTable();
        this.success('The Note has been updated successfully');
    }

    // Update Note
    this.finish = function (id) {

        // Find and Update Note
        for (let i = 0; i < this.myNotes.length; i++) {
            if (this.myNotes[i].id === id) {
                this.myNotes[i].status = 'finished';
                break;
            }
        }

        // Reload Lists
        this.createTable();
        this.success('The Note has been finished successfully');
    }


    // Delete Note
    this.delete = function (id) {

        // Confirm Deletion
        Swal.fire({
            title: 'Are you sure?',
            text: 'Note #' + id + " is about to be deleted! You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            padding: '2em',
            timer: 5000,
            timerProgressBar: true,
        }).then(function (result) {
            if (result.value) {
                // Find and Delete Note
                for (let i = 0; i < crud.myNotes.length; i++) {
                    if (crud.myNotes[i].id === id) {
                        crud.myNotes.splice(i, 1);
                        break;
                    }
                }

                // Reload Lists
                crud.createTable();
                crud.success('The Note has been deleted successfully');
            }
        })
    };

    // Success Message
    this.success = function (response) {
        Snackbar.show({
            text: response,
            alertScreenReader: true,
            showAction: false,
            duration: 3000,
        });
    }

}

crud.createTable();